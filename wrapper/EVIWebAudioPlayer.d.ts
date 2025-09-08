import type { AudioOutput } from "api/resources/empathicVoice";
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
     * AudioWorklet Mode (default): Uses a separate thread for audio processing via AudioWorkletNode
     * Regular Buffer Mode: Falls back to AudioBufferSourceNode in the main thread if worklets aren't available
     * @default true
     */
    enableAudioWorklet?: boolean;
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
type PlayerEventMap = {
    play: CustomEvent<{
        id: string;
    }>;
    stop: CustomEvent<{
        id: string;
    }>;
    fft: CustomEvent<{
        fft: number[];
    }>;
    error: CustomEvent<{
        message: string;
    }>;
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
export declare class EVIWebAudioPlayer extends EventTarget {
    #private;
    private readonly opts;
    /** `true` while any clip is currently audible. */
    get playing(): boolean;
    /** `true` if gain is set to 0 via {@link mute}. */
    get muted(): boolean;
    /** Current output gain (0‑1). */
    get volume(): number;
    /** Most recent FFT frame (empty when analyser disabled). */
    get fft(): number[];
    constructor(opts?: EVIWebAudioPlayerOptions);
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
    ): this;
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
    init(): Promise<void>;
    /**
     * Queue one {@link AudioOutput} message for playback.
     *
     * Decodes the base-64 PCM data, sends it to the `AudioWorkletNode` for glitch-free, in-order playback, and emits `'play'` for the first chunk of a new stream.
     *
     * @param message The `AudioOutput` message received from EVI’s WebSocket.
     *
     * @see {@link https://dev.hume.ai/reference/empathic-voice-interface-evi/chat/chat#receive.Audio-Output.type API Reference}
     */
    enqueue(message: AudioOutput): Promise<void>;
    /**
     * Flush the worklet queue and output silence.
     */
    stop(): void;
    /**
     * Set the master gain ({@link volume}) to a value between `0` (_silent_) and `1` (_full volume_).
     *
     * - Clamps out-of-range values.
     * - If called before {@link init}, stores volume for when `AudioContext` is created.
     * - If currently {@link muted}, updates stored volume but keeps output silent until {@link unmute}.
     *
     * @param volume Desired gain; clamped to [0, 1].
     */
    setVolume(volume: number): void;
    /**
     * Mute output instantly by setting the gain to 0. Retains the last volume internally for later restore.
     */
    mute(): void;
    /**
     * Restore output gain to the last set volume (via setVolume).
     */
    unmute(): void;
    /**
     * Tear down all Web-Audio resources (worklet, analyser, gain, context) and reset state so {@link init} can be called again.
     */
    dispose(): void;
}
export {};
