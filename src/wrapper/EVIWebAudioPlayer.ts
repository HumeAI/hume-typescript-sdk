import { convertBase64ToBlob } from "./convertBase64ToBlob";
import type { AudioOutput } from "api/resources/empathicVoice";
import { convertLinearFrequenciesToBark } from './convertFrequencyScale';
import { generateEmptyFft } from './generateEmptyFft';

/**
 * Options for configuring an {@link EVIWebAudioPlayer}.
 *
 * @default `{}` for sensible defaults.
 */
export interface EVIWebAudioPlayerOptions {
    /**
     * Initial master gain, via a `GainNode`, from `0` (_silent_) to `1` (_full volume_).
     * Values outside this range are clamped.
     *
     * @default 1
     */
    volume?: number;
    /**
     * Real-time FFT (frequency-domain) settings **only** for visualization.
     *
     * - **Disable**: omit or `{ enabled: false }` – no `AnalyserNode` is created.
     * - **Defaults**: `{ enabled: true }` → 2048-point FFT at 16 ms (~60 Hz), mapped to 24 Bark bands.
     * - **Custom**: supply {@link EVIWebAudioPlayerFFTOptions} to override `size`, `interval`, or `transform`.
     */
    fft?: EVIWebAudioPlayerFFTOptions;
}

/**
 * FFT (frequency-domain) options for visualization.
 *
 * Pass `{ enabled: true }` for defaults, or omit/disable entirely for zero overhead.
 */
export type EVIWebAudioPlayerFFTOptions = FftEnabled | FftDisabled;

type FftDisabled = {
    /**
     * Turn visualization data OFF—skip analyser creation entirely (zero extra CPU).
     */
    enabled: false;
};

type FftEnabled = {
    /**
     * Turn visualization data ON—create an `AnalyserNode`, poll it, and emit `'fft'` events.
     */
    enabled: true;
    /**
     * FFT size (power-of-two, 32 – 32768).
     * Defaults to 2048 → 1024 bins (~ 23 Hz at 48 kHz).
     * @default 2048
     */
    size?: number;
    /**
     * Polling interval, in **milliseconds**.
     * Default 16 ms (~ 60 Hz) to sync with `requestAnimationFrame()`.
     * @default 16
     */
    interval?: number;
    /**
     * Custom post-processing for raw magnitude data. Omit for built-in 24-band Bark mapping.
     *
     * @param bins PCM byte magnitudes (0 – 255) from `AnalyserNode`.
     * @param sampleRate `AudioContext` sample rate in Hz.
     * @returns Payload emitted with each `'fft'` event.
     */
    transform?: (bins: Uint8Array, sampleRate: number) => number[];
};

type ResolvedFftOptions = {
    readonly size: number;
    readonly interval: number;
    readonly transform: (bins: Uint8Array, sampleRate: number) => number[];
};

type PlayerEventMap = {
    play: CustomEvent<{ id: string }>;
    stop: CustomEvent<{ id: string }>;
    fft: CustomEvent<{ fft: number[] }>;
    error: CustomEvent<{ message: string }>;
};

/**
 * A sequential, glitch-free Web-Audio player for **EVI** audio output.
 *
 * - **Decoding & playback**: base-64 PCM chunks feed an `AudioWorkletNode` and play in order, without gaps.
 * - **One-time init**: await {@link init} in a user-gesture to build audio graph and unlock the browser’s
 *  `AudioContext`; later calls are no-ops.
 * - **Optional FFT**: `{ fft: { enabled: true } }` adds an `AnalyserNode` and emits `'fft'` events; omit to skip.
 * - **Controls**: {@link setVolume}, {@link mute}, {@link unmute}, {@link stop}, {@link dispose}.
 * - **Events**: listen for `'play'`, `'stop'`, `'fft'`, `'error'`.
 */
export class EVIWebAudioPlayer extends EventTarget {
    /** Default URL of the `audio-worklet.js` processor module, fetched from Hume AI’s CDN. */
    static #DEFAULT_WORKLET_URL = "https://storage.googleapis.com/evi-react-sdk-assets/audio-worklet-20250506.js";
    /** Default FFT size (power-of-two). */
    static #DEFAULT_FFT_SIZE = 2048;
    /** Default analyser poll interval (16 ms). */
    static #DEFAULT_FFT_INTERVAL = 16;

    /** `true` while any clip is currently audible. */
    get playing(): boolean {
        return this.#playing;
    }
    /** `true` if gain is set to 0 via {@link mute}. */
    get muted(): boolean {
        return this.#muted;
    }
    /** Current output gain (0‑1). */
    get volume(): number {
        return this.#volume;
    }
    /** Most recent FFT frame (empty when analyser disabled). */
    get fft(): number[] {
        return this.#fft;
    }

    #ctx: AudioContext | null = null;
    #workletNode: AudioWorkletNode | null = null;
    #analyserNode: AnalyserNode | null = null;
    #gainNode: GainNode | null = null;

    #initialized = false;
    #playing = false;
    #muted = false;
    #volume: number;

    #fft: number[] = generateEmptyFft();
    #fftTimer: number | null = null;
    #fftOptions: ResolvedFftOptions | null = null;

    constructor(private readonly opts: EVIWebAudioPlayerOptions = {}) {
        super();
        this.#volume = opts.volume ?? 1.0;

        // Resolve FFT options if enabled
        if (opts.fft?.enabled) {
            const { size, interval, transform } = opts.fft;
            this.#fftOptions = {
                size: size ?? EVIWebAudioPlayer.#DEFAULT_FFT_SIZE,
                interval: interval ?? EVIWebAudioPlayer.#DEFAULT_FFT_INTERVAL,
                transform: transform ?? ((bins, sampleRate) =>
                    convertLinearFrequenciesToBark(bins, sampleRate)),
            };
        }
    }

    /**
     * * Subscribes to a player event and returns `this` for chaining.
     *
     * @param type One of `'play'`, `'stop'`, `'fft'`, or `'error'`.
     * @param fn Handler invoked with the event’s typed `detail` payload.
     * @param opts Optional `AddEventListenerOptions` (e.g. `{ once: true }`).
     *
     * @example
     *  ```ts
     *  const player = new EVIWebAudioPlayer();
     *  player
     *    .on('play', e => console.log('play',  e.detail.id))
     *    .on('stop', e => console.log('stop',  e.detail.id))
     *    .on('fft', e => console.log('stop',  e.detail.fft))
     *    .on('error', e => console.error('error', e.detail.message));
     *  ```
     */
    on<K extends keyof PlayerEventMap>(
        type: K,
        fn: (e: PlayerEventMap[K]) => void,
        opts?: AddEventListenerOptions,
    ): this {
        super.addEventListener(type, fn as EventListener, opts);
        return this;
    }

    /**
     * Set up and start the player’s Web-Audio pipeline.
     *
     * - Creates a **suspended** `AudioContext`, loads the worklet processor, wires `AudioWorkletNode → (AnalyserNode?) → GainNode → destination`, then calls `resume()`.
     * - Must be awaited inside a user-gesture (click/tap/key); later calls are no-ops.
     * - If `fft.enabled` is `false` (or `fft` is omitted), no `AnalyserNode` or polling timer is created.
     *
     * **Safari quirk:** Safari locks an `AudioContext` to the device’s current sample rate at creation.
     * If you open a Bluetooth headset mic afterward, the OS may switch to the 16 kHz HFP profile and down-sample playback, which sounds “telephone-y.”
     * To avoid this, call `getUserMedia()` (or otherwise open audio input) **before** `init()`.
     *
     * @throws {Error} If the browser lacks `AudioWorklet` support, or if `AudioContext.resume()` is rejected (autoplay policy, device error).
     */
    async init(): Promise<void> {
        if (this.#initialized) return;

        // Create the AudioContext
        this.#ctx = new AudioContext();

        // Fail fast if AudioWorklet isn’t supported
        if (!this.#ctx.audioWorklet) {
            const msg = "AudioWorklet is not supported in this browser";
            this.#emitError(msg);
            throw new Error(msg);
        }

        try {
            // Build GainNode
            this.#gainNode = this.#ctx.createGain();
            this.#gainNode.gain.value = this.#volume;

            // Build AnalyserNode (optional)
            if (this.#fftOptions) {
                this.#analyserNode = this.#ctx.createAnalyser();
                this.#analyserNode.fftSize = this.#fftOptions.size;
            }

            // Loads the AudioWorklet processor module.
            await this.#ctx.audioWorklet.addModule(EVIWebAudioPlayer.#DEFAULT_WORKLET_URL);

            // Build AudioWorkletNode
            this.#workletNode = new AudioWorkletNode(this.#ctx, "audio-processor");

            // When the worklet posts { type: "ended" }, mark playback stopped and emit a `'stop'` event.
            this.#workletNode.port.onmessage = (e: MessageEvent) => {
                if ((e.data as { type?: string }).type === "ended") {
                    this.#playing = false;
                    this.dispatchEvent(new CustomEvent("stop", { detail: { id: "stream" } }));
                }
            };

            // Audio graph nodes
            const workletNode = this.#workletNode; // AudioWorkletNode (PCM processor)
            const analyserNode = this.#analyserNode; // Optional AnalyserNode (FFT)
            const gainNode = this.#gainNode; // GainNode (volume control)
            const destination = this.#ctx.destination; // AudioDestinationNode (speakers)

            // Analyser node is filtered out of audio graph if null (FFT disabled)
            const audioGraph = [workletNode, analyserNode, gainNode, destination].filter(Boolean) as AudioNode[];

            // Wire nodes: AudioWorkletNode → (AnalyserNode?) → GainNode → AudioDestinationNode
            audioGraph.reduce((prev, next) => (prev.connect(next), next));

            // If an analyser is configured, begin polling it at the resolved interval and dispatching `'fft'` events for each frame.
            this.#startAnalyserPollingIfEnabled();

            // Resume the AudioContext now that the audio graph is fully wired.
            // Browsers allow `resume()` only inside a user-gesture callback.
            // Any rejection (autoplay policy, hardware issue, etc.) is caught by the outer catch-block below, which emits an 'error' event and re-throws.
            await this.#ctx.resume();

            this.#initialized = true;
        } catch (err) {
            const suffix = err instanceof Error ? `: ${err.message}` : String(err);
            this.#emitError(`Failed to initialize audio player${suffix}`);
            throw err;
        }
    }

    /**
     * Queue one {@link AudioOutput} message for playback.
     *
     * Decodes the base-64 PCM data, sends it to the `AudioWorkletNode` for glitch-free, in-order playback, and emits `'play'` for the first chunk of a new stream.
     *
     * @param message The `AudioOutput` message received from EVI’s WebSocket.
     *
     * @see {@link https://dev.hume.ai/reference/empathic-voice-interface-evi/chat/chat#receive.Audio-Output.type API Reference}
     */
    async enqueue(message: AudioOutput): Promise<void> {
        if (!this.#initialized || !this.#ctx) {
            this.#emitError("Audio player is not initialized");
            return;
        }

        try {
            const { data, id } = message;

            const blob = convertBase64ToBlob(data);
            const buffer = await blob.arrayBuffer();

            const audio = await this.#ctx.decodeAudioData(buffer);
            const pcmData = audio.getChannelData(0);

            this.#workletNode!.port.postMessage({ type: "audio", data: pcmData });

            this.#playing = true;
            this.dispatchEvent(new CustomEvent("play", { detail: { id } }));
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Unknown error";
            this.#emitError(`Failed to queue clip: ${msg}`);
        }
    }

    /**
     * Flush the worklet queue and output silence.
     */
    stop() {
        // Clear buffered audio from the worklet queue
        this.#workletNode?.port.postMessage({ type: "fadeAndClear" });

        // Restart analyser polling so fft events continue after stopping or clearing the queue
        this.#startAnalyserPollingIfEnabled();

        this.#playing = false;
        this.dispatchEvent(new CustomEvent("stop", { detail: { id: "manual" } }));
    }

    /**
     * Set the master gain ({@link volume}) to a value between `0` (_silent_) and `1` (_full volume_).
     *
     * - Clamps out-of-range values.
     * - If called before {@link init}, stores volume for when `AudioContext` is created.
     * - If currently {@link muted}, updates stored volume but keeps output silent until {@link unmute}.
     *
     * @param volume Desired gain; clamped to [0, 1].
     */
    setVolume(volume: number) {
        const clampedVolume = Math.max(0, Math.min(volume, 1));
        this.#volume = clampedVolume;

        if (this.#gainNode && this.#ctx && !this.#muted) {
            this.#gainNode.gain.setValueAtTime(clampedVolume, this.#ctx.currentTime);
        }
    }

    /**
     * Mute output instantly by setting the gain to 0. Retains the last volume internally for later restore.
     */
    mute() {
        if (!this.#gainNode || !this.#ctx) return;
        this.#gainNode.gain.setValueAtTime(0, this.#ctx.currentTime);
        this.#muted = true;
    }

    /**
     * Restore output gain to the last set volume (via setVolume).
     */
    unmute() {
        if (!this.#gainNode || !this.#ctx) return;
        this.#gainNode.gain.setValueAtTime(this.#volume, this.#ctx.currentTime);
        this.#muted = false;
    }

    /**
     * Tear down all Web-Audio resources (worklet, analyser, gain, context) and reset state so {@link init} can be called again.
     */
    dispose() {
        if (this.#fftTimer != null) {
            clearInterval(this.#fftTimer);
            this.#fftTimer = null;
        }

        this.#workletNode?.port.postMessage({ type: "fadeAndClear" });
        this.#workletNode?.port.postMessage({ type: "end" });
        this.#workletNode?.port.close();
        this.#workletNode?.disconnect();

        this.#analyserNode?.disconnect();

        this.#gainNode?.disconnect();
        this.#ctx?.close().catch(() => void 0);

        this.#initialized = false;
        this.#playing = false;
        this.#fft = generateEmptyFft();
    }

    /**
     * Polls the AnalyserNode at the configured interval, applies the FFT transform, and emits `'fft'` events.
     * No-ops if no analyser is present.
     */
    #startAnalyserPollingIfEnabled() {
        if (!this.#fftOptions || !this.#analyserNode) return;
        if (this.#fftTimer) clearInterval(this.#fftTimer);

        const { interval, transform } = this.#fftOptions;

        this.#fftTimer = window.setInterval(() => {
            const bins = new Uint8Array(this.#analyserNode!.frequencyBinCount);
            this.#analyserNode!.getByteFrequencyData(bins);
            this.#fft = transform(bins, this.#ctx!.sampleRate);
            this.dispatchEvent(new CustomEvent("fft", { detail: { fft: this.#fft } }));
        }, interval);
    }

    /**
     * Emit an `error` event with the supplied message.
     */
    #emitError(message: string) {
        this.dispatchEvent(new CustomEvent("error", { detail: { message } }));
    }
}
