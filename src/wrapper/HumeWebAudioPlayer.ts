import { convertBase64ToBlob } from "./convertBase64ToBlob";
import type { AudioOutput } from "api/resources/empathicVoice";

/** Audio player error codes. */
export type PlayerErrorCode = "INIT_FAILED" | "DECODE_ERROR" | "WORKLET_LOAD_ERROR" | "CONTEXT_SUSPENDED" | "UNKNOWN";

/** Error emitted by HumeWebAudioPlayer. */
export interface PlayerError extends Error {
    code: PlayerErrorCode;
}

/** Configuration options for HumeWebAudioPlayer */
export interface HumeWebAudioPlayerOptions {
    /** URL of the AudioWorklet module (optional) */
    workletModuleUrl?: string;
    /** Factory to create a custom AudioWorkletNode (overrides URL) */
    workletFactory?: (ctx: AudioContext) => AudioWorkletNode;
    /** Emit raw FFT data events */
    enableFft?: boolean;
    /** Interval (ms) between FFT samples, Defaults to `100` */
    fftIntervalMs?: number;
    /** Initial volume level (0.0–1.0) */
    volume?: number;
    /** Enable debug logs */
    debug?: boolean;
    /** Headless mode: emit events only, no playback */
    headless?: boolean;
    /** Factory to create custom AudioBufferSourceNode (fallback) */
    sourceFactory?: (ctx: AudioContext) => AudioBufferSourceNode;
    /**
     * Transform raw FFT bins into another frequency scale (e.g. Bark, Mel, or custom).
     *
     * By default, the player emits the linear FFT output from the AnalyserNode.
     * Pass a function here to convert those Uint8Array bins (and the context’s sampleRate)
     * into a different scale for your visualizations or analysis.
     *
     * @example
     * // Convert to Bark scale:
     * playerOptions.transformFftBins = (bins, sampleRate) => {
     *   return convertLinearToBark(bins, sampleRate);
     * };
     */
    transformFftBins?: (bins: Uint8Array, sampleRate: number) => Uint8Array;
}

/**
 * Possible states of the Web Audio `AudioContext`.
 *
 * - **suspended**: the context is not processing audio (e.g. before a user gesture or after `suspend()`).
 * - **running**: the context is actively processing and playing audio.
 * - **closed**: the context has been closed and cannot be re-used.
 * - **interrupted**: the context was suspended by the system (e.g. due to another app taking audio focus).
 */
export type AudioContextState = "suspended" | "running" | "closed" | "interrupted";

/**
 * Playback modes supported by HumeWebAudioPlayer:
 *  - **worklet**: uses an [AudioWorkletNode](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletNode) for streaming PCM data
 *    with minimal latency.
 *  - **fallback**: uses the standard [AudioBufferSourceNode](https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode)
 *    and [decodeAudioData](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/decodeAudioData) for broad browser compatibility.
 */
export type PlaybackMode = "worklet" | "fallback";

/** Metrics for queue length and mode. */
export interface QueueMetrics {
    queueLength: number;
    mode: PlaybackMode;
}

/** Metrics for decode duration. */
export interface DecodeMetrics {
    id: string;
    durationMs: number;
}

/** Internal queue item. */
interface QueuedAudio {
    id: string;
    audioBuffer: AudioBuffer;
}

/** Internal options with defaults applied */
type InternalOptions = Required<Pick<HumeWebAudioPlayerOptions, "workletModuleUrl" | "enableFft">> & {
    workletFactory?: (ctx: AudioContext) => AudioWorkletNode;
    fftIntervalMs: number;
    volume: number;
    debug: boolean;
    headless: boolean;
    sourceFactory?: (ctx: AudioContext) => AudioBufferSourceNode;
    transformFftBins?: (bins: Uint8Array, sampleRate: number) => Uint8Array;
};

/**
 * **HumeWebAudioPlayer** plays audio responses from the
 * [Empathic Voice Interface (EVI)](https://dev.hume.ai/docs/empathic-voice-interface-evi/overview) using the
 * [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API).
 *
 * Designed specifically to consume `audio_output` messages from the
 * [Hume EVI WebSocket API](https://dev.hume.ai/reference/empathic-voice-interface-evi/chat/chat), this player provides
 * robust handling of streaming audio, interruption, and telemetry for real‑time voice-driven conversations.
 *
 * Events emitted:
 *  - `initialized`: emitted once the audio graph is built and ready.
 *  - `play(id: string)`: emitted when playback of a chunk begins.
 *  - `ended(id: string)`: emitted when playback of a chunk ends.
 *  - `error(err: PlayerError)`: emitted on any internal error.
 *  - `fft(data)`: emitted with frequency-domain data when FFT is enabled.
 *  - `warning(msg: string)`: emitted for non-fatal warnings (e.g., worklet fallback, decode-failure → retry queue).
 *  - `queueMetrics(metrics)`: emitted after enqueue/dequeue to report queue length and mode.
 *  - `decodeMetrics(metrics)`: emitted after decoding each chunk to report latency.
 */
export class HumeWebAudioPlayer extends EventTarget {
    // --- Typed event handlers ---
    public on(event: "initialized", listener: () => void): this;
    public on(event: "play", listener: (id: string) => void): this;
    public on(event: "ended", listener: (id: string) => void): this;
    public on(event: "error", listener: (err: PlayerError) => void): this;
    public on(event: "fft", listener: (data: { timestamp: number; values: Uint8Array }) => void): this;
    public on(event: "warning", listener: (msg: string) => void): this;
    public on(event: "queueMetrics", listener: (m: QueueMetrics) => void): this;
    public on(event: "decodeMetrics", listener: (m: DecodeMetrics) => void): this;
    public on(event: string, listener: (detail?: any) => void): this {
        this.addEventListener(event, (evt: Event) => listener((evt as CustomEvent).detail));
        return this;
    }

    // --- Typed emit overloads ---
    private emit(event: "initialized"): boolean;
    private emit(event: "play", id: string): boolean;
    private emit(event: "ended", id: string): boolean;
    private emit(event: "error", err: PlayerError): boolean;
    private emit(event: "fft", data: { timestamp: number; values: Uint8Array }): boolean;
    private emit(event: "warning", msg: string): boolean;
    private emit(event: "queueMetrics", m: QueueMetrics): boolean;
    private emit(event: "decodeMetrics", m: DecodeMetrics): boolean;
    private emit(type: string, detail?: any): boolean {
        return this.dispatchEvent(new CustomEvent(type, { detail }));
    }

    private context: AudioContext;
    private gainNode!: GainNode;
    private analyserNode?: AnalyserNode;
    private workletNode?: AudioWorkletNode;
    private activeSource?: AudioBufferSourceNode;
    private queue: QueuedAudio[] = [];
    private failedQueue: AudioOutput[] = [];
    private options!: InternalOptions;
    private isInitialized = false;
    private fftTimerId: number | null = null;
    private isProcessing = false;

    private readonly EMPTY_BUFFER: AudioBuffer;

    constructor(opts: HumeWebAudioPlayerOptions = {}) {
        super();
        this.applyDefaults(opts);
        this.context = new AudioContext();
        this.EMPTY_BUFFER = this.context.createBuffer(1, 1, this.context.sampleRate);
        this.detectWorkletSupport();
    }

    /**
     * Initialize user-gesture driven resume and build the Web Audio graph.
     *
     * This method is **idempotent**: if called more than once after a successful initialization,
     * it will return immediately without rebuilding the graph.
     *
     * It performs the following steps:
     * 1. If the AudioContext is in the `"suspended"` state (e.g. on mobile before a user gesture),
     *    it attempts to resume it. Failures here are emitted and thrown as a `PlayerError`
     *    with `code = "CONTEXT_SUSPENDED"`.
     * 2. It creates and wires up a `GainNode` (for volume control) and, if `enableFft` is true,
     *    an `AnalyserNode` (for FFT data), invoking `startFftLoop()`.
     * 3. If the browser supports `AudioWorklet` and either a `workletFactory` or `workletModuleUrl`
     *    is provided, it sets up an `AudioWorkletNode` and connects it into the graph.
     *    Failures in loading the module or instantiating the node are emitted and thrown
     *    as a `PlayerError` with `code = "WORKLET_LOAD_ERROR"`.
     * 4. On success it marks `isInitialized = true`, emits `"initialized"`, then emits initial
     *    queue metrics and a debug log.
     *
     * Throws a `PlayerError` on any internal error:
     *  - `"CONTEXT_SUSPENDED"` if `context.resume()` fails
     *  - `"WORKLET_LOAD_ERROR"` if `audioWorklet.addModule()` or node construction fails
     *  - `"INIT_FAILED"` for any other unexpected exception during graph-building
     *
     * Usage example:
     * ```ts
     * try {
     *   await player.init();
     * } catch (err) {
     *   if ((err as PlayerError).code === 'CONTEXT_SUSPENDED') {
     *     // Prompt the user to interact (iOS gesture requirement)
     *   } else {
     *     // Handle or report other initialization failures
     *   }
     * }
     * ```
     */
    public async init(): Promise<void> {
        // Idempotent guard
        if (this.isInitialized) return;
        // Ensure we can resume (must be inside a user gesture on mobile/Safari)
        if (this.context.state === "suspended") {
            try {
                await this.context.resume();
            } catch (e: any) {
                const err = new Error(e.message) as PlayerError;
                err.code = "CONTEXT_SUSPENDED";
                this.emit("error", err);
                throw err;
            }
        }
        // Build the rest of the graph inside a catch-all for INIT_FAILED
        try {
            // Build audio graph: GainNode for volume
            this.gainNode = this.context.createGain();
            this.gainNode.gain.setValueAtTime(this.options.volume, this.context.currentTime);
            this.gainNode.connect(this.context.destination);
            // Optional AnalyserNode for FFT
            if (this.options.enableFft) {
                this.analyserNode = this.context.createAnalyser();
                this.analyserNode.fftSize = 2048;
                this.analyserNode.connect(this.gainNode);
                this.startFftLoop();
            }
            // AudioWorklet setup for low-latency streaming
            if (this.supportsWorklet) {
                if (this.options.workletFactory) {
                    // Custom worklet injection (testing or alternate processors)
                    this.workletNode = this.options.workletFactory(this.context);
                } else if (this.options.workletModuleUrl) {
                    // Dynamically fetch and register the worklet script
                    await this.context.audioWorklet.addModule(this.options.workletModuleUrl);
                    // Instantiate the processor by the name defined in that script
                    this.workletNode = new AudioWorkletNode(this.context, "audio-processor");
                }
                // Connect the worklet into our graph, if we have one
                if (this.workletNode) {
                    const dest = this.options.enableFft && this.analyserNode ? this.analyserNode : this.gainNode;
                    this.workletNode.connect(dest);
                }
            }
        } catch (e: any) {
            // Convert any unexpected error into INIT_FAILED (unless already a PlayerError)
            let err: PlayerError;
            if ((e as PlayerError).code) {
                err = e as PlayerError;
            } else {
                err = new Error(e.message) as PlayerError;
                err.code = "INIT_FAILED";
            }
            this.emit("error", err);
            throw err;
        }
        // Mark initialized, emit events, and debug-log
        this.isInitialized = true;
        this.emit("initialized");
        this.emitQueueMetrics();
        this.debugLog("Audio player initialized");
    }

    /**
     * Enqueue an audio chunk for playback.
     * @returns `true` if the chunk was successfully decoded and queued;
     *          `false` if it was dropped due to a decode error.
     */
    public async enqueue(msg: AudioOutput): Promise<boolean> {
        await this.init();
        try {
            // Decode audio or supply a silent buffer in headless mode
            const audioBuf = this.options.headless ? this.EMPTY_BUFFER : await this.decodeAudioOutput(msg);
            this.queue.push({ id: msg.id, audioBuffer: audioBuf });
        } catch (e: any) {
            const err = new Error(e.message) as PlayerError;
            err.code = "DECODE_ERROR";
            this.emit("error", err);
            // Push into the retry queue
            this.failedQueue.push(msg);
            // Emit a warning so caller know this was non‐fatal but unexpected
            this.emit("warning", `Decoding failed for chunk ${msg.id}; added to failedQueue for retry`);
            // Indicate that this chunk won’t play immediately
            return false;
        }
        this.emitQueueMetrics();
        this.debugLog(`Enqueued predecoded ${msg.id}`);
        await this.processQueue();
        return true;
    }

    /** Returns IDs of pending audio chunks. */
    public peekQueue(): string[] {
        return this.queue.map((item) => item.id);
    }

    /** Pauses playback (suspends context). */
    public async pause(): Promise<void> {
        await this.context.suspend();
    }

    /** Resumes playback (resumes context). */
    public async resume(): Promise<void> {
        await this.context.resume();
    }

    /** Smoothly fades volume over the specified duration (ms). */
    public fadeVolume(to: number, ms: number): void {
        const now = this.context.currentTime;
        const target = this.clamp(to);
        this.gainNode.gain.cancelScheduledValues(now);
        this.gainNode.gain.linearRampToValueAtTime(target, now + ms / 1000);
        this.options.volume = target;
    }

    /** Retries the next failed audio chunk. */
    public async retryNextFailed(): Promise<boolean> {
        const next = this.failedQueue.shift();
        if (!next) return false;
        return await this.enqueue(next);
    }

    /** Retries all failed audio chunks. */
    public async retryFailed(): Promise<{ attempted: number; succeeded: number }> {
        const list = this.failedQueue.splice(0);
        let succeeded = 0;
        await Promise.all(
            list.map(async (c) => {
                if (await this.enqueue(c)) succeeded++;
            }),
        );
        return { attempted: list.length, succeeded };
    }

    /** Returns a copy of all failed audio chunks. */
    public getFailedChunks(): AudioOutput[] {
        return [...this.failedQueue];
    }

    /** Stops playback and clears the queue. */
    public async stop(): Promise<void> {
        // Suspend the AudioContext to free hardware & threads (no-op if already suspended or closed)
        await this.context.suspend().catch((e) => this.options.debug && this.debugLog(`suspend() failed: ${e}`));
        // If we have an active graph and are not in headless mode, tear it down
        if (this.isInitialized && !this.options.headless) {
            // Safely signal end and close the port
            try {
                this.workletNode?.port.postMessage({ type: "end" });
                this.workletNode?.port.close();
            } catch (e) {
                if (this.options.debug) this.debugLog(`Worklet stop failed: ${e}`);
            }
            this.activeSource?.stop();
            this.activeSource?.disconnect();
            this.activeSource = undefined;
        }
        // Clear out any pending chunks and reset state
        this.queue = [];
        this.emitQueueMetrics();
        this.isProcessing = false;
    }

    /**
     * Disposes and releases all Web Audio resources.
     * Once called, the player is no longer usable and must be re-instantiated to play audio again.
     */
    public async dispose(): Promise<void> {
        // Stop any in-flight playback
        await this.stop();
        // Tear down the analyser and gain nodes
        this.analyserNode?.disconnect();
        this.gainNode.disconnect();
        // Clear the FFT polling timer
        if (this.fftTimerId) {
            clearInterval(this.fftTimerId);
            this.fftTimerId = null;
        }
        // Close the AudioContext and wait for it to finish
        if (this.context.state !== "closed") {
            await this.context.close();
        }
        // Reset initialization flag so a new context would be rebuilt if init() is called
        this.isInitialized = false;
    }

    /** Mutes audio instantly. */
    public mute(): void {
        this.gainNode.gain.setValueAtTime(0, this.context.currentTime);
    }

    /** Unmutes audio instantly. */
    public unmute(): void {
        this.gainNode.gain.setValueAtTime(this.options.volume, this.context.currentTime);
    }

    /** Sets volume level instantly. */
    public setVolume(v: number): void {
        this.options.volume = this.clamp(v);
        this.gainNode.gain.setValueAtTime(this.options.volume, this.context.currentTime);
    }

    /** Playback path capability. */
    public get supportsWorklet(): boolean {
        return typeof AudioWorkletNode === "function";
    }

    /** Playback mode: 'worklet' or 'fallback'. */
    public get mode(): PlaybackMode {
        return this.workletNode ? "worklet" : "fallback";
    }

    /** Number of queued audio chunks. */
    public get queueLength(): number {
        return this.queue.length;
    }

    /** Current state of the AudioContext. */
    public get contextState(): AudioContextState {
        return this.context.state as AudioContextState;
    }

    /** Seconds since the AudioContext was created. */
    public get elapsedTime(): number {
        return this.context.currentTime;
    }

    /** Apply user-provided options and fill in defaults for any missing values. */
    private applyDefaults(opts: HumeWebAudioPlayerOptions): void {
        this.options = {
            // Worklet configuration
            workletModuleUrl: opts.workletModuleUrl ?? "",
            workletFactory: opts.workletFactory,
            // FFT
            enableFft: opts.enableFft ?? false,
            fftIntervalMs: opts.fftIntervalMs ?? 100,
            transformFftBins: opts.transformFftBins,
            // Volume / playback
            volume: this.clamp(opts.volume ?? 1),
            headless: opts.headless ?? false,
            sourceFactory: opts.sourceFactory,
            // Debug
            debug: opts.debug ?? false,
        };
    }

    /** Detect whether AudioWorkletNode is available and emit warnings if the environment or options force fallback. */
    private detectWorkletSupport(): void {
        if (!this.supportsWorklet) {
            this.emit("warning", "AudioWorklet is not supported in this browser; using fallback playback mode");
        } else if (!this.options.workletFactory && !this.options.workletModuleUrl) {
            this.emit(
                "warning",
                "AudioWorklet is supported but no workletFactory or workletModuleUrl supplied; falling back to buffer-source playback",
            );
        }
        if (this.options.workletFactory && this.options.workletModuleUrl) {
            this.emit("warning", "Both workletFactory and workletModuleUrl provided; using workletFactory");
        }
    }

    /** Decode a Base64-encoded WAV chunk into an AudioBuffer and emit timing metrics. */
    private async decodeAudioOutput(msg: AudioOutput): Promise<AudioBuffer> {
        const start = performance.now();
        const blob = convertBase64ToBlob(msg.data, "audio/wav");
        const arrayBuf = await blob.arrayBuffer();
        const audioBuf = await this.context.decodeAudioData(arrayBuf);
        this.emit("decodeMetrics", {
            id: msg.id,
            durationMs: performance.now() - start,
        });
        return audioBuf;
    }

    /** Pump through the queue, playing each AudioBuffer in turn. Exits early if already processing or queue is empty. */
    private async processQueue(): Promise<void> {
        // If the context is still suspended, try to resume
        if (this.context.state === "suspended") {
            try {
                await this.context.resume();
            } catch (err) {
                // Swallow or emit an error – we’re outside a gesture now
                this.debugLog("Failed to resume AudioContext: " + err);
            }
        }
        if (this.isProcessing || this.queue.length === 0) return;
        this.isProcessing = true;
        while (this.queue.length > 0) {
            const { id, audioBuffer } = this.queue[0];
            // Emit "play" before kicking off playback
            this.emit("play", id);

            if (this.options.headless) {
                // No actual playback in headless mode
            } else if (this.workletNode) {
                // Stream PCM via worklet and await its "ended" notification
                const pcm = audioBuffer.getChannelData(0);
                await new Promise<void>((resolve) => {
                    const onMessage = (e: any) => {
                        if (e.type === "ended" && e.id === id) {
                            this.workletNode!.port.removeEventListener("message", onMessage);
                            resolve();
                        }
                    };
                    this.workletNode!.port.addEventListener("message", onMessage);
                    this.workletNode!.port.postMessage({ type: "audio", id, data: pcm });
                });
            } else {
                // Fall back to AudioBufferSourceNode and await its onended event
                await new Promise<void>((resolve) => {
                    const src = this.options.sourceFactory
                        ? this.options.sourceFactory(this.context)
                        : this.context.createBufferSource();
                    this.activeSource = src;
                    src.buffer = audioBuffer;
                    src.connect(this.analyserNode ?? this.gainNode);
                    src.onended = () => resolve();
                    src.start();
                });
                this.activeSource = undefined;
            }
            // Emit "ended" and advance the queue
            this.emit("ended", id);
            this.queue.shift();
            this.emitQueueMetrics();
        }
        this.isProcessing = false;
    }

    /**
     * Starts an FFT polling loop, emitting raw or transformed frequency data at approximately `fftIntervalMs`
     * intervals. Clears any prior interval to avoid multiple concurrent loops.
     */
    private startFftLoop(): void {
        if (this.fftTimerId !== null) clearInterval(this.fftTimerId);
        this.fftTimerId = window.setInterval(() => {
            if (!this.analyserNode) return;
            const raw = new Uint8Array(this.analyserNode.frequencyBinCount);
            this.analyserNode.getByteFrequencyData(raw);
            const values = this.options.transformFftBins
                ? this.options.transformFftBins(raw, this.context.sampleRate)
                : raw;
            this.emit("fft", { timestamp: Date.now(), values });
        }, this.options.fftIntervalMs);
    }

    /** Emit the current queue length and playback mode. Used after `enqueue`, `dequeue`, and at `init`. */
    private emitQueueMetrics(): void {
        this.emit("queueMetrics", {
            queueLength: this.queue.length,
            mode: this.mode,
        });
    }

    /**
     * Clamp a numeric value to the [0, 1] range.
     * Useful for ensuring volume/gain stays within valid bounds.
     * @param v candidate value
     * @returns a number between 0 and 1
     */
    private clamp(v: number): number {
        return Math.max(0, Math.min(1, v));
    }

    /** Conditionally log a debug message when `options.debug` is true. Prepends a standard prefix for easy filtering. */
    private debugLog(msg: string): void {
        if (this.options.debug) {
            console.debug(`[HumeWebAudioPlayer] ${msg}`);
        }
    }
}
