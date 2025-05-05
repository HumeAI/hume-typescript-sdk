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
    /** Spectrum‑analyser settings; omit to disable. */
    fft?: EVIWebAudioPlayerFFTOptions;
}

/**
 * Configuration for the optional spectrum analyser.
 */
export interface EVIWebAudioPlayerFFTOptions {
    /** Enable the analyser pipeline. */
    enabled: true;
    /** FFT size (power‑of‑two). Default = 2048 (1024 frequency bins). */
    size?: number;
    /** Interval between analyser reads in milliseconds. Default = 5 ms. */
    interval?: number;
    /**
     * Custom post‑processing for raw magnitude data.
     * @param bins       Byte magnitudes (0‑255) from `AnalyserNode`.
     * @param sampleRate Audio‑context sample rate in Hz.
     * @returns          Data structure emitted with the `"fft"` event.
     */
    transform?: (bins: Uint8Array, sampleRate: number) => number[] | Float32Array;
}

type PlayerEventMap = {
    play: CustomEvent<{ id: string }>;
    stop: CustomEvent<{ id: string }>;
    fft: CustomEvent<{ fft: number[] | Float32Array }>;
    error: CustomEvent<{ message: string }>;
};

/**
 * Audio‑first wrapper around Web Audio for playing `AudioOutput`
 * chunks produced by the EVI WebSocket API.
 *
 * • Queue clips with {@link enqueue}.
 * • Call {@link init} once after the first user gesture.
 * • Use {@link stop} to flush the queue or {@link dispose} to release all
 *   resources.
 * • Optional FFT data is published via the `"fft"` event when enabled.
 *
 * The instance can be re‑used: `dispose()` sets the object back to an
 * un‑initialised state, allowing a subsequent `init()` call.
 */
export class EVIWebAudioPlayer extends EventTarget {
    /** Bark‑scale centre frequencies used by the default transform. */
    static #BARK_CENTRES = [
        50, 150, 250, 350, 450, 570, 700, 840, 1000, 1170, 1370, 1600, 1850, 2150, 2500, 2900, 3400, 4000, 4800, 5800,
        7000, 8500, 10500, 13500,
    ] as const;
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
    get fft(): number[] | Float32Array {
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
    #fft: number[] | Float32Array = Array(EVIWebAudioPlayer.#BARK_CENTRES.length).fill(0);

    #fftTimer: number | null = null;

    /**
     * Creates a player; no web‑audio resources are allocated until
     * {@link init} is awaited.
     */
    constructor(private readonly opts: EVIWebAudioPlayerOptions = {}) {
        super();
        this.#volume = opts.volume ?? 1.0;
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
     * Add a typed event listener; returns the instance for chaining.
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
     * Initialize Web Audio internals.
     *
     * **Must be awaited in a user‑gesture callback** (Chrome/Safari autoplay).
     * Safe to call multiple times – subsequent calls are no‑ops.
     */
    async init(): Promise<this> {
        if (this.#initialized) return this;

        try {
            this.#ctx = new AudioContext();
            await this.#ctx.resume().catch(() => void 0);

            this.#gain = this.#ctx.createGain();
            this.#gain.gain.value = this.#volume;
            this.#gain.connect(this.#ctx.destination);

            if (this.opts.fft?.enabled) {
                this.#analyser = this.#ctx.createAnalyser();
                this.#analyser.fftSize = this.opts.fft.size ?? 2048;
                this.#analyser.connect(this.#gain);

                const transform = this.opts.fft.transform ?? EVIWebAudioPlayer.#linearHzToBark;
                const ivl = this.opts.fft.interval ?? 5;

                this.#fftTimer = window.setInterval(() => {
                    const bins = new Uint8Array(this.#analyser!.frequencyBinCount);
                    this.#analyser!.getByteFrequencyData(bins);
                    this.#fft = transform(bins, this.#ctx!.sampleRate);
                    this.dispatchEvent(new CustomEvent("fft", { detail: { fft: this.#fft } }));
                }, ivl);
            }

            const url = this.opts.workletUrl ?? "https://storage.googleapis.com/evi-react-sdk-assets/audio-worklet.js";

            await this.#ctx.audioWorklet.addModule(url);
            this.#worklet = new AudioWorkletNode(this.#ctx, "audio-processor");
            this.#worklet.connect(this.#analyser ?? this.#gain);

            this.#worklet.port.onmessage = (e: MessageEvent) => {
                if ((e.data as { type?: string }).type === "ended") {
                    this.#playing = false;
                    this.dispatchEvent(new CustomEvent("stop", { detail: { id: "stream" } }));
                }
            };

            this.#initialized = true;
        } catch (err) {
            this.#emitError(
                `Failed to initialize audio player${err instanceof Error && err.message ? `: ${err.message}` : ""}`,
            );
        }
        return this;
    }

    /**
     * Queue one `AudioOutput` message for playback.
     */
    async enqueue(message: AudioOutput): Promise<this> {
        if (!this.#initialized || !this.#ctx) {
            this.#emitError("Audio player is not initialized");
            return this;
        }

        try {
            const blob = convertBase64ToBlob(message.data);
            const buf = await blob.arrayBuffer();
            const audio = await this.#ctx.decodeAudioData(buf);

            this.#worklet!.port.postMessage({
                type: "audio",
                data: audio.getChannelData(0),
            });

            if (!this.#playing) {
                this.#playing = true;
                this.dispatchEvent(new CustomEvent("play", { detail: { id: message.id } }));
            }
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Unknown error";
            this.#emitError(`Failed to queue clip: ${msg}`);
        }
        return this;
    }

    /** Flush the queue and output silence. */
    stop(): this {
        this.#worklet?.port.postMessage({ type: "clear" });
        this.#playing = false;
        this.#fft = Array(EVIWebAudioPlayer.#BARK_CENTRES.length).fill(0);
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

    /**
     * Release all Web Audio resources.
     * The object may be re‑initialized with {@link init}.
     */
    dispose(): void {
        if (this.#fftTimer) clearInterval(this.#fftTimer);
        this.#worklet?.port.postMessage({ type: "end" });
        this.#worklet?.port.close();
        this.#worklet?.disconnect();
        this.#analyser?.disconnect();
        this.#gain?.disconnect();
        this.#ctx?.close().catch(() => void 0);

        this.#initialized = false;
        this.#playing = false;
        this.#fft = Array(EVIWebAudioPlayer.#BARK_CENTRES.length).fill(0);
    }

    /** Emit an `error` event with the given message. */
    #emitError(msg: string): void {
        this.dispatchEvent(new CustomEvent("error", { detail: { message: msg } }));
    }
}
