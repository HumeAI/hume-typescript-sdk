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
 * Configuration for the optional spectrum analyser.
 */
export interface EVIWebAudioPlayerFFTOptions {
    /** Turn the analyser ON (`true`) or OFF (`false`). */
    enabled: boolean;
    /** FFT size (power‑of‑two). Default = 2048 (1024 frequency bins). */
    size?: number;
    /** Interval between analyser reads in milliseconds. Default = 16 ms (~60 Hz). */
    interval?: number;
    /**
     * Custom post‑processing for raw magnitude data.
     * @param bins       Byte magnitudes (0‑255) from `AnalyserNode`.
     * @param sampleRate Audio‑context sample rate in Hz.
     * @returns          Data structure emitted with the `"fft"` event.
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
 * - Optionally emits `"fft"` events when `fft` options are supplied.
 */
export class EVIWebAudioPlayer extends EventTarget {
    /**
     * Default URL of the `audio-worklet.js` processor module, fetched from Hume AI’s CDN.
     * Override via the {@link EVIWebAudioPlayerOptions.workletUrl} option to self-host or use a custom worklet.
     */
    static #DEFAULT_WORKLET_URL = "https://storage.googleapis.com/evi-react-sdk-assets/audio-worklet.js";
    /** Default FFT size (power-of-two). */
    static #DEFAULT_FFT_SIZE = 2048;
    /** Default analyser poll interval (ms). ~60 FPS. */
    static #DEFAULT_FFT_INTERVAL = 16;
    /** Bark‑scale centre frequencies used by the default transform. */
    static #BARK_CENTRES = [
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
    #gain: GainNode | null = null;
    #analyser: AnalyserNode | null = null;
    #worklet: AudioWorkletNode | null = null;

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

    static emptyFft(): number[] {
        return Array(EVIWebAudioPlayer.#BARK_CENTRES.length).fill(0);
    }

    /** Map linear‑Hz byte magnitudes to 24 Bark‑band floats in [0, 2]. */
    static #linearHzToBark(bins: Uint8Array, sampleRate: number): number[] {
        const hzPerBin = sampleRate / 2 / bins.length;
        return EVIWebAudioPlayer.#BARK_CENTRES.map((hz) => {
            const i = Math.round(hz / hzPerBin);
            const magnitude = bins[i] ?? 0;
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

        // Create & unlock the AudioContext
        this.#ctx = new AudioContext();
        await this.#ctx.resume().catch((err) => console.warn("AudioContext resume failed", err));

        // Fail fast if AudioWorklet isn’t supported
        if (!this.#ctx.audioWorklet) {
            const msg = "AudioWorklet is not supported in this browser";
            this.#emitError(msg);
            throw new Error(msg);
        }

        try {
            // Build GainNode (volume/mute control)
            this.#gain = this.#ctx.createGain();
            this.#gain.gain.value = this.#volume;

            // Optionally create the AnalyserNode
            const { fft } = this.opts;
            const fftEnabled = fft?.enabled === true;

            if (fftEnabled) {
                this.#analyser = this.#ctx.createAnalyser();
                this.#analyser.fftSize = fft.size ?? EVIWebAudioPlayer.#DEFAULT_FFT_SIZE;

                // Cache fully‑resolved FFT options for reuse
                this.#resolvedFftOptions = {
                    size: this.#analyser.fftSize,
                    interval: fft.interval ?? EVIWebAudioPlayer.#DEFAULT_FFT_INTERVAL,
                    transform: fft.transform ?? EVIWebAudioPlayer.#linearHzToBark,
                };
            }

            // Connect Gain → (Analyser?) → Destination
            const destination = this.#analyser ?? this.#ctx.destination;
            this.#gain.connect(destination);

            // If analyser is enabled, hook it up and start polling
            if (fftEnabled) {
                this.#analyser!.connect(this.#ctx.destination);
                this.#startFftTimer();
            }

            // Load & connect the AudioWorklet processor
            const workletUrl = this.opts.workletUrl?.toString() ?? EVIWebAudioPlayer.#DEFAULT_WORKLET_URL;
            await this.#ctx.audioWorklet.addModule(workletUrl);

            this.#worklet = new AudioWorkletNode(this.#ctx, "audio-processor");
            this.#worklet.connect(this.#gain);

            this.#attachDeviceListeners();

            this.#initialized = true;

            this.#worklet.port.onmessage = (e: MessageEvent) => {
                if ((e.data as { type?: string }).type === "ended") {
                    this.#playing = false;
                    this.dispatchEvent(new CustomEvent("stop", { detail: { id: "stream" } }));
                }
            };
        } catch (err) {
            const suffix = err instanceof Error ? `: ${err.message}` : "";
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

            this.#worklet!.port.postMessage({
                type: "audio",
                data: audio.getChannelData(0),
            });

            if (!this.#playing) {
                this.#playing = true;
                this.dispatchEvent(new CustomEvent("play", { detail: { id } }));
            }
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

    /**
     * Subscribe to browser events that signal output‑device changes.
     *
     * - Listens to `navigator.mediaDevices.devicechange` to detect when the set of
     *   available audio sinks mutates (e.g. headphones unplugged, Bluetooth speaker
     *   connected).
     * - On Chrome/Edge (110 +), also hooks the `sinkchange` event on the
     *   `AudioContext` to resume playback the moment the graph is rebound.
     * - Listens to the context’s `statechange` event to recover automatically if
     *   the graph is forced into the `suspended` state by the operating system.
     *
     * Safe to invoke multiple times; called once inside {@link init}.
     */
    #attachDeviceListeners(): void {
        // Device list changed (headphones unplugged, bluetooth toggled, …)
        navigator.mediaDevices?.addEventListener?.("devicechange", () => void this.#handleDeviceChange());

        // Chrome‑only: the context’s sink *actually* changed
        this.#ctx?.addEventListener?.("sinkchange", () => {
            // If the graph was suspended by the OS, resume it.
            if (this.#ctx?.state === "suspended") {
                this.#ctx.resume().catch(() => void 0);
            }
        });

        // Keep an eye on generic state changes too
        this.#ctx?.addEventListener?.("statechange", () => {
            if (this.#ctx?.state === "suspended") {
                this.#ctx.resume().catch(() => void 0);
            }
        });
    }

    /**
     * Handle an audio‑output device change signalled by `devicechange`.
     *
     * 1. Tries the Chrome/Edge “fast path” by calling
     *    `AudioContext.setSinkId("default")` for a gap‑free redirect.
     * 2. If that API is unavailable or fails (Safari, Firefox, permission denied),
     *    disposes the current Web Audio graph and recreates it so the new
     *    `AudioContext` attaches to the system’s new default sink.
     * 3. Restores the player’s previous volume and mute state after a rebuild.
     *
     * @returns A promise that resolves once the player is ready to resume
     *          playback on the new output device.
     */
    async #handleDeviceChange(): Promise<void> {
        if (!this.#ctx) return;

        // Chrome‑style fast path: point the context to the new default sink
        if ("setSinkId" in this.#ctx) {
            try {
                await (this.#ctx as any).setSinkId?.("default");
                return;
            } catch (err) {
                console.warn("setSinkId failed, falling back", err);
                // Fall through to the slow path
            }
        }

        // Slow (but cross‑browser) path — rebuild the entire graph
        const wasMuted = this.#muted;
        const lastVolume = this.#volume;
        this.dispose();
        await this.init();
        this.setVolume(lastVolume);
        if (wasMuted) this.mute();
    }

    /** Abandon all buffered audio in the worklet. */
    #clearWorkletQueue(): void {
        this.#worklet?.port.postMessage({ type: "clear" });
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
    #emitError(msg: string): void {
        this.dispatchEvent(new CustomEvent("error", { detail: { message: msg } }));
    }
}
