import { convertBase64ToBlob } from "./convertBase64ToBlob";
import type { AudioOutput } from "api/resources/empathicVoice";

/**
 * Constructor options for {@link EVIWebAudioPlayer}.
 */
export interface EVIWebAudioPlayerOptions {
    /** URL for a custom `audio‑worklet.js`. Uses Hume CDN if omitted. */
    workletUrl?: string | URL;
    /** Initial output gain (0‑‑1). Default = 1 (no attenuation). */
    volume?: number;
    /**
     * FFT (Fast Fourier Transform) spectrum‑analyser settings.
     * Omit the entire block —or set `enabled:false`—to disable analysis.
     */
    fft?: EVIWebAudioPlayerFFTOptions;
}

/**
 * Per-frame FFT (Fast Fourier Transform) spectrum‑analyser options. (needed **only** for audio visualization)
 *
 * **Quick start:** if you just want the built-in defaults,
 * pass `{ enabled: true }` and ignore the other fields.
 *
 * If you never visualize the audio waveform, omit this whole block
 * or set `enabled: false` to avoid allocating an `AnalyserNode` and its timer.
 */
export interface EVIWebAudioPlayerFFTOptions {
    /**
     * Turn visualization data ON or OFF.
     *
     * - `true`  – create an `AnalyserNode`, poll it, and emit `"fft"` events.
     * - `false` – skip analyser creation entirely (zero extra CPU).
     */
    enabled: boolean;
    /**
     * **FFT size** – the number of PCM samples processed per frame.
     *
     * Must be a power of two (`32 … 32768`); larger sizes give finer
     * frequency resolution but cost more CPU and add a longer analysis
     * window (latency).
     *
     * - Bins produced  = `size ÷ 2`
     * - Bin width (Hz) = `sampleRate ÷ size`
     *
     * **Default:** `2048` → `1024` bins (~23 Hz resolution at 48 kHz),
     * ideal for 24- or 32-band EQ style displays.
     *
     * @default 2048
     */
    size?: number;
    /**
     * Polling interval in **milliseconds**.
     *
     * Default **16 ms** (~60 Hz) matches screen refresh, keeping updates
     * in sync with `requestAnimationFrame()` while staying lightweight.
     * Use a smaller value (e.g. 8 ms) for ultra-smooth meters, or a larger one to save power.
     *
     * @default 16
     */
    interval?: number;
    /**
     * Custom post‑processing for raw magnitude data. Omit to use the built-in 24-band Bark mapping.
     *
     * @param bins       Byte magnitudes (0‑255) from `AnalyserNode`.
     * @param sampleRate Audio‑context sample rate in Hz.
     * @returns          Payload emitted with each `"fft"` event.
     */
    transform?: (bins: Uint8Array, sampleRate: number) => number[];
}

type PlayerEventMap = {
    play: CustomEvent<{ id: string }>;
    stop: CustomEvent<{ id: string }>;
    fft: CustomEvent<{ fft: number[] }>;
    error: CustomEvent<{ message: string }>;
};

type ResolvedFftOptions = Required<Omit<EVIWebAudioPlayerFFTOptions, "enabled">>;

/**
 * Sequential Web Audio player for EVI `AudioOutput` messages.
 *
 * - Decodes base64 PCM chunks and feeds them—in order—to an AudioWorklet
 *   for glitch-free playback.
 * - Requires a user-gesture–driven `init()` to unlock the AudioContext.
 * - Provides `stop()` to clear the queue or `dispose()` to fully tear down.
 * - Emits `"play"` & `"stop"` events on stream boundaries.
 * - Optionally emits `"fft"` events when `fft` is enabled.
 */
export class EVIWebAudioPlayer extends EventTarget {
    /**
     * Default URL of the `audio-worklet.js` processor module, fetched from Hume AI’s CDN.
     * Override via the {@link EVIWebAudioPlayerOptions.workletUrl} option to self-host or use a custom worklet.
     */
    static #DEFAULT_WORKLET_URL = "https://storage.googleapis.com/evi-react-sdk-assets/audio-worklet-20250506.js";
    /** Default FFT size (power-of-two). */
    static #DEFAULT_FFT_SIZE = 2048;
    /** Default analyser poll interval (16ms). */
    static #DEFAULT_FFT_INTERVAL = 16;
    /** Bark‑scale center frequencies (hz) used by the default transform. https://en.wikipedia.org/wiki/Bark_scale */
    static #BARK_CENTER_FREQUENCIES = [
        50, 150, 250, 350, 450, 570, 700, 840, 1000, 1170, 1370, 1600, 1850, 2150, 2500, 2900, 3400, 4000, 4800, 5800,
        7000, 8500, 10500, 13500,
    ] as const;
    /** Max byte magnitude (255) returned by `AnalyserNode.getByteFrequencyData`. */
    static #BYTE_MAX = 255;

    /** `true` while any clip is currently audible. */
    get playing(): boolean {
        return this.#playing;
    }
    /** `true` if gain is set to 0 via {@link mute}. */
    get muted(): boolean {
        return this.#muted;
    }
    /** Current output gain (0‑‑1). */
    get volume(): number {
        return this.#volume;
    }
    /** Most recent FFT frame (empty when analyser disabled). */
    get fft(): number[] {
        return this.#fft;
    }

    #ctx: AudioContext | null = null;
    #worklet: AudioWorkletNode | null = null;
    #analyser: AnalyserNode | null = null;
    #gain: GainNode | null = null;

    #initialized = false;
    #playing = false;
    #muted = false;
    #volume: number;

    #fft: number[] = EVIWebAudioPlayer.emptyFft();
    #fftTimer: number | null = null;
    #resolvedFftOptions: ResolvedFftOptions | null = null;

    /**
     * Creates a player; no web‑audio resources are allocated until
     * {@link init} is awaited.
     */
    constructor(private readonly opts: EVIWebAudioPlayerOptions = {}) {
        super();
        this.#volume = opts.volume ?? 1.0;
    }

    /**
     * Generate an empty FFT frame array.
     * Useful as an initial or placeholder FFT dataset before any real analysis.
     *
     * @returns A number[] filled with zeros, length equal to the Bark band count.
     */
    static emptyFft(): number[] {
        return Array(EVIWebAudioPlayer.#BARK_CENTER_FREQUENCIES.length).fill(0);
    }

    /** Map linear‑Hz byte magnitudes to 24 Bark‑band floats in [0, 2]. */
    static #linearHzToBark(linearData: Uint8Array, sampleRate: number): number[] {
        const maxFrequency = sampleRate / 2;
        const frequencyResolution = maxFrequency / linearData.length;

        return EVIWebAudioPlayer.#BARK_CENTER_FREQUENCIES.map((barkFreq) => {
            const linearDataIndex = Math.round(barkFreq / frequencyResolution);
            const magnitude = linearData[linearDataIndex] ?? 0;
            return (magnitude / EVIWebAudioPlayer.#BYTE_MAX) * 2;
        });
    }

    /**
     * * Subscribes to a player event and returns `this` for chaining.
     *
     * @param type
     *   One of `"play"`, `"stop"`, `"fft"`, or `"error"`.
     * @param fn
     *   Handler invoked with the event’s typed `detail` payload.
     * @param opts
     *   Optional `AddEventListenerOptions` (e.g. `{ once: true }`).
     * @returns
     *   The same `EVIWebAudioPlayer` instance, so calls can be chained.
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
     * Initialize Web Audio internals.
     *
     * **Must be awaited in a user-gesture callback** (Chrome/Safari autoplay).
     * Safe to call multiple times – subsequent calls are no-ops.
     *
     * @throws Error if `AudioWorklet` is not supported in this browser.
     */
    async init(): Promise<this> {
        if (this.#initialized) return this;

        // Create the AudioContext
        this.#ctx = new AudioContext();

        // Fail fast if AudioWorklet isn’t supported
        if (!this.#ctx.audioWorklet) {
            const msg = "AudioWorklet is not supported in this browser";
            this.#emitError(msg);
            throw new Error(msg);
        }

        try {
            // Build gain node
            this.#gain = this.#ctx.createGain();
            this.#gain.gain.value = this.#volume;

            const { fft } = this.opts;
            const useFft = fft?.enabled === true;

            if (useFft) {
                // Resolve FFT options
                const size = fft.size ?? EVIWebAudioPlayer.#DEFAULT_FFT_SIZE;
                const interval = fft.interval ?? EVIWebAudioPlayer.#DEFAULT_FFT_INTERVAL;
                const transform = fft.transform ?? EVIWebAudioPlayer.#linearHzToBark;

                // Build analyser node
                this.#analyser = this.#ctx.createAnalyser();
                this.#analyser.fftSize = size;

                // Cache fully‑resolved FFT options for reuse
                this.#resolvedFftOptions = { size, interval, transform };
            }

            // Load the worklet module
            const workletUrl = this.opts.workletUrl?.toString() ?? EVIWebAudioPlayer.#DEFAULT_WORKLET_URL;
            await this.#ctx.audioWorklet.addModule(workletUrl);

            // Build the worklet node
            this.#worklet = new AudioWorkletNode(this.#ctx, "audio-processor");

            // When the worklet posts { type: "ended" }, mark playback stopped and emit a `"stop"` event.
            this.#worklet.port.onmessage = (e: MessageEvent) => {
                if ((e.data as { type?: string }).type === "ended") {
                    this.#playing = false;
                    this.dispatchEvent(new CustomEvent("stop", { detail: { id: "stream" } }));
                }
            };

            // Audio graph nodes
            const worklet = this.#worklet; // audio processor
            const analyser = this.#analyser; // spectrum analysis (visualization)
            const gain = this.#gain; // volume control
            const destination = this.#ctx.destination; // audio output device (speakers)

            // Wire graph: Worklet → Analyser(?) → Gain → Destination
            // Analyser node is filtered out of signal path if null (FFT disabled)
            const signalPath = [worklet, analyser, gain, destination].filter(Boolean) as AudioNode[];
            signalPath.reduce((prev, next) => (prev.connect(next), next));

            // Start FFT timer for analyser polling if enabled
            if (useFft && analyser) this.#startFftTimer();

            // Unlock the audio
            await this.#ctx.resume().catch((err) => console.warn("AudioContext resume failed", err));

            this.#initialized = true;
        } catch (err) {
            const suffix = err instanceof Error ? `: ${err.message}` : String(err);
            this.#emitError(`Failed to initialize audio player${suffix}`);
            throw err;
        }

        return this;
    }

    /**
     * Queue one {@link AudioOutput} message for playback.
     *
     * Decodes the base64-encoded PCM data from the WebSocket message, posts the
     * mono channel (channel 0) to the AudioWorklet for smooth, in-order playback,
     * and dispatches a `"play"` event if this is the first chunk in a new stream.
     *
     * @param message
     *   The {@link AudioOutput} object received from EVI’s WebSocket. Contains
     *   `data` as base64-encoded PCM. **Assumed mono PCM** – only channel 0 is used.
     * @returns
     *   The `EVIWebAudioPlayer` instance, for method chaining.
     *
     * @see {@link https://dev.hume.ai/reference/empathic-voice-interface-evi/chat/chat#receive.Audio-Output.type API Reference - AudioOutput}
     */
    async enqueue(message: AudioOutput): Promise<this> {
        if (!this.#initialized || !this.#ctx) {
            this.#emitError("Audio player is not initialized");
            return this;
        }

        try {
            const { data, id } = message;

            const blob = convertBase64ToBlob(data);
            const buffer = await blob.arrayBuffer();

            const audio = await this.#ctx.decodeAudioData(buffer);
            const pcmData = audio.getChannelData(0);

            this.#worklet!.port.postMessage({ type: "audio", data: pcmData });

            this.#playing = true;
            this.dispatchEvent(new CustomEvent("play", { detail: { id } }));
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Unknown error";
            this.#emitError(`Failed to queue clip: ${msg}`);
        }

        return this;
    }

    /** Flush the queue and output silence. */
    stop(): this {
        // Always clear the worklet queue
        this.#clearWorkletQueue();

        // If spectrum analysis is enabled, restart the polling timer to keep emitting FFT frames
        if (this.#resolvedFftOptions) this.#startFftTimer();

        this.#playing = false;
        this.dispatchEvent(new CustomEvent("stop", { detail: { id: "manual" } }));
        return this;
    }

    /** Set output gain (0‑1). Values are clamped. */
    setVolume(value: number): this {
        const g = Math.max(0, Math.min(value, 1));
        this.#volume = g;
        if (this.#gain && this.#ctx && !this.#muted) {
            this.#gain.gain.setValueAtTime(g, this.#ctx.currentTime);
        }
        return this;
    }

    /** Instantly mute (gain → 0). */
    mute(): this {
        if (this.#gain && this.#ctx) {
            this.#gain.gain.setValueAtTime(0, this.#ctx.currentTime);
            this.#muted = true;
        }
        return this;
    }

    /** Restore gain to the value set via {@link setVolume}. */
    unmute(): this {
        if (this.#gain && this.#ctx) {
            this.#gain.gain.setValueAtTime(this.#volume, this.#ctx.currentTime);
            this.#muted = false;
        }
        return this;
    }

    /** Release all Web Audio resources. The object may be re‑initialized with {@link init}. */
    dispose(): void {
        // Only clear the FFT timer if one was ever started
        if (this.#fftTimer != null) {
            clearInterval(this.#fftTimer);
            this.#fftTimer = null;
        }

        // Tear down the worklet
        this.#worklet?.port.postMessage({ type: "fadeAndClear" });
        this.#worklet?.port.postMessage({ type: "end" });
        this.#worklet?.port.close();
        this.#worklet?.disconnect();

        // Only disconnect the analyser node if it was created
        this.#analyser?.disconnect();

        // Always disconnect gain and close the context
        this.#gain?.disconnect();
        this.#ctx?.close().catch(() => void 0);

        // Reset state
        this.#initialized = false;
        this.#playing = false;
        this.#fft = EVIWebAudioPlayer.emptyFft();
    }

    /** Abandon all buffered audio in the worklet. */
    #clearWorkletQueue(): void {
        this.#worklet?.port.postMessage({ type: "fadeAndClear" });
    }

    /** (Re)start analyser polling using the cached, resolved FFT options. */
    #startFftTimer(): void {
        if (!this.#resolvedFftOptions || !this.#analyser) return;
        if (this.#fftTimer) clearInterval(this.#fftTimer);

        const { interval, transform } = this.#resolvedFftOptions;

        this.#fftTimer = window.setInterval(() => {
            const bins = new Uint8Array(this.#analyser!.frequencyBinCount);
            this.#analyser!.getByteFrequencyData(bins);
            this.#fft = transform(bins, this.#ctx!.sampleRate);
            this.dispatchEvent(new CustomEvent("fft", { detail: { fft: this.#fft } }));
        }, interval);
    }

    /** Emit an `error` event with the given message. */
    #emitError(message: string): void {
        this.dispatchEvent(new CustomEvent("error", { detail: { message } }));
    }
}
