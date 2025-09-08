var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
var __classPrivateFieldGet =
    (this && this.__classPrivateFieldGet) ||
    function (receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
var __classPrivateFieldSet =
    (this && this.__classPrivateFieldSet) ||
    function (receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value);
    };
var _EVIWebAudioPlayer_instances,
    _a,
    _EVIWebAudioPlayer_DEFAULT_WORKLET_URL,
    _EVIWebAudioPlayer_DEFAULT_FFT_SIZE,
    _EVIWebAudioPlayer_DEFAULT_FFT_INTERVAL,
    _EVIWebAudioPlayer_ctx,
    _EVIWebAudioPlayer_workletNode,
    _EVIWebAudioPlayer_analyserNode,
    _EVIWebAudioPlayer_gainNode,
    _EVIWebAudioPlayer_initialized,
    _EVIWebAudioPlayer_playing,
    _EVIWebAudioPlayer_muted,
    _EVIWebAudioPlayer_volume,
    _EVIWebAudioPlayer_enableAudioWorklet,
    _EVIWebAudioPlayer_fft,
    _EVIWebAudioPlayer_fftTimer,
    _EVIWebAudioPlayer_fftOptions,
    _EVIWebAudioPlayer_clipQueue,
    _EVIWebAudioPlayer_currentlyPlayingAudioBuffer,
    _EVIWebAudioPlayer_isProcessing,
    _EVIWebAudioPlayer_lastQueuedChunk,
    _EVIWebAudioPlayer_chunkBufferQueues,
    _EVIWebAudioPlayer_startAnalyserPollingIfEnabled,
    _EVIWebAudioPlayer_emitError,
    _EVIWebAudioPlayer_convertToAudioBuffer,
    _EVIWebAudioPlayer_getNextAudioBuffers,
    _EVIWebAudioPlayer_playNextClip;
import { convertBase64ToBlob } from "./convertBase64ToBlob";
import { convertLinearFrequenciesToBark } from "./convertFrequencyScale";
import { generateEmptyFft } from "./generateEmptyFft";
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
    /** `true` while any clip is currently audible. */
    get playing() {
        return __classPrivateFieldGet(this, _EVIWebAudioPlayer_playing, "f");
    }
    /** `true` if gain is set to 0 via {@link mute}. */
    get muted() {
        return __classPrivateFieldGet(this, _EVIWebAudioPlayer_muted, "f");
    }
    /** Current output gain (0‑1). */
    get volume() {
        return __classPrivateFieldGet(this, _EVIWebAudioPlayer_volume, "f");
    }
    /** Most recent FFT frame (empty when analyser disabled). */
    get fft() {
        return __classPrivateFieldGet(this, _EVIWebAudioPlayer_fft, "f");
    }
    constructor(opts = {}) {
        var _b, _c, _d;
        super();
        _EVIWebAudioPlayer_instances.add(this);
        this.opts = opts;
        _EVIWebAudioPlayer_ctx.set(this, null);
        _EVIWebAudioPlayer_workletNode.set(this, null);
        _EVIWebAudioPlayer_analyserNode.set(this, null);
        _EVIWebAudioPlayer_gainNode.set(this, null);
        _EVIWebAudioPlayer_initialized.set(this, false);
        _EVIWebAudioPlayer_playing.set(this, false);
        _EVIWebAudioPlayer_muted.set(this, false);
        _EVIWebAudioPlayer_volume.set(this, void 0);
        _EVIWebAudioPlayer_enableAudioWorklet.set(this, void 0);
        _EVIWebAudioPlayer_fft.set(this, generateEmptyFft());
        _EVIWebAudioPlayer_fftTimer.set(this, null);
        _EVIWebAudioPlayer_fftOptions.set(this, null);
        _EVIWebAudioPlayer_clipQueue.set(this, []);
        _EVIWebAudioPlayer_currentlyPlayingAudioBuffer.set(this, null);
        _EVIWebAudioPlayer_isProcessing.set(this, false);
        // chunkBufferQueues and #lastQueuedChunk are used to make sure that
        // we don't play chunks out of order. #chunkBufferQueues is NOT the
        // audio playback queue.
        _EVIWebAudioPlayer_lastQueuedChunk.set(this, null);
        _EVIWebAudioPlayer_chunkBufferQueues.set(this, {});
        __classPrivateFieldSet(
            this,
            _EVIWebAudioPlayer_volume,
            (_b = opts.volume) !== null && _b !== void 0 ? _b : 1.0,
            "f",
        );
        __classPrivateFieldSet(
            this,
            _EVIWebAudioPlayer_enableAudioWorklet,
            (_c = opts.enableAudioWorklet) !== null && _c !== void 0 ? _c : true,
            "f",
        );
        // Resolve FFT options if enabled
        if ((_d = opts.fft) === null || _d === void 0 ? void 0 : _d.enabled) {
            const { size, interval, transform } = opts.fft;
            __classPrivateFieldSet(
                this,
                _EVIWebAudioPlayer_fftOptions,
                {
                    size:
                        size !== null && size !== void 0
                            ? size
                            : __classPrivateFieldGet(_a, _a, "f", _EVIWebAudioPlayer_DEFAULT_FFT_SIZE),
                    interval:
                        interval !== null && interval !== void 0
                            ? interval
                            : __classPrivateFieldGet(_a, _a, "f", _EVIWebAudioPlayer_DEFAULT_FFT_INTERVAL),
                    transform:
                        transform !== null && transform !== void 0
                            ? transform
                            : (bins, sampleRate) => convertLinearFrequenciesToBark(bins, sampleRate),
                },
                "f",
            );
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
    on(type, fn, opts) {
        super.addEventListener(type, fn, opts);
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
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            if (__classPrivateFieldGet(this, _EVIWebAudioPlayer_initialized, "f")) return;
            // Create the AudioContext
            __classPrivateFieldSet(this, _EVIWebAudioPlayer_ctx, new AudioContext(), "f");
            // Fail fast if AudioWorklet isn’t supported
            if (!__classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f").audioWorklet) {
                console.warn("AudioWorklet is not supported in this browser. Falling back to Regular Buffer Mode.");
                __classPrivateFieldSet(this, _EVIWebAudioPlayer_enableAudioWorklet, false, "f");
            }
            try {
                // Build GainNode
                __classPrivateFieldSet(
                    this,
                    _EVIWebAudioPlayer_gainNode,
                    __classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f").createGain(),
                    "f",
                );
                __classPrivateFieldGet(this, _EVIWebAudioPlayer_gainNode, "f").gain.value = __classPrivateFieldGet(
                    this,
                    _EVIWebAudioPlayer_volume,
                    "f",
                );
                // Build AnalyserNode (optional)
                if (__classPrivateFieldGet(this, _EVIWebAudioPlayer_fftOptions, "f")) {
                    __classPrivateFieldSet(
                        this,
                        _EVIWebAudioPlayer_analyserNode,
                        __classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f").createAnalyser(),
                        "f",
                    );
                    __classPrivateFieldGet(this, _EVIWebAudioPlayer_analyserNode, "f").fftSize = __classPrivateFieldGet(
                        this,
                        _EVIWebAudioPlayer_fftOptions,
                        "f",
                    ).size;
                }
                if (__classPrivateFieldGet(this, _EVIWebAudioPlayer_enableAudioWorklet, "f")) {
                    // Loads the AudioWorklet processor module.
                    yield __classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f").audioWorklet.addModule(
                        __classPrivateFieldGet(_a, _a, "f", _EVIWebAudioPlayer_DEFAULT_WORKLET_URL),
                    );
                    // Build AudioWorkletNode
                    __classPrivateFieldSet(
                        this,
                        _EVIWebAudioPlayer_workletNode,
                        new AudioWorkletNode(
                            __classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f"),
                            "audio-processor",
                        ),
                        "f",
                    );
                    // When the worklet posts { type: "ended" }, mark playback stopped and emit a `'stop'` event.
                    __classPrivateFieldGet(this, _EVIWebAudioPlayer_workletNode, "f").port.onmessage = (e) => {
                        if (e.data.type === "ended") {
                            __classPrivateFieldSet(this, _EVIWebAudioPlayer_playing, false, "f");
                            this.dispatchEvent(new CustomEvent("stop", { detail: { id: "stream" } }));
                        }
                    };
                    // Audio graph nodes
                    const workletNode = __classPrivateFieldGet(this, _EVIWebAudioPlayer_workletNode, "f"); // AudioWorkletNode (PCM processor)
                    const analyserNode = __classPrivateFieldGet(this, _EVIWebAudioPlayer_analyserNode, "f"); // Optional AnalyserNode (FFT)
                    const gainNode = __classPrivateFieldGet(this, _EVIWebAudioPlayer_gainNode, "f"); // GainNode (volume control)
                    const destination = __classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f").destination; // AudioDestinationNode (speakers)
                    // Analyser node is filtered out of audio graph if null (FFT disabled)
                    const audioGraph = [workletNode, analyserNode, gainNode, destination].filter(Boolean);
                    // Wire nodes: AudioWorkletNode → (AnalyserNode?) → GainNode → AudioDestinationNode
                    audioGraph.reduce((prev, next) => (prev.connect(next), next));
                } else {
                    // Regular Buffer Mode
                    const analyserNode = __classPrivateFieldGet(this, _EVIWebAudioPlayer_analyserNode, "f");
                    const gainNode = __classPrivateFieldGet(this, _EVIWebAudioPlayer_gainNode, "f");
                    const destination = __classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f").destination;
                    // Wire nodes: (AnalyserNode?) → GainNode → AudioDestinationNode
                    const audioGraph = [analyserNode, gainNode, destination].filter(Boolean);
                    audioGraph.reduce((prev, next) => (prev.connect(next), next));
                }
                // If an analyser is configured, begin polling it at the resolved interval and dispatching `'fft'` events for each frame.
                __classPrivateFieldGet(
                    this,
                    _EVIWebAudioPlayer_instances,
                    "m",
                    _EVIWebAudioPlayer_startAnalyserPollingIfEnabled,
                ).call(this);
                // Resume the AudioContext now that the audio graph is fully wired.
                // Browsers allow `resume()` only inside a user-gesture callback.
                // Any rejection (autoplay policy, hardware issue, etc.) is caught by the outer catch-block below, which emits an 'error' event and re-throws.
                yield __classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f").resume();
                __classPrivateFieldSet(this, _EVIWebAudioPlayer_initialized, true, "f");
            } catch (err) {
                const suffix = err instanceof Error ? `: ${err.message}` : String(err);
                __classPrivateFieldGet(this, _EVIWebAudioPlayer_instances, "m", _EVIWebAudioPlayer_emitError).call(
                    this,
                    `Failed to initialize audio player${suffix}`,
                );
                throw err;
            }
        });
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
    enqueue(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (
                !__classPrivateFieldGet(this, _EVIWebAudioPlayer_initialized, "f") ||
                !__classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f")
            ) {
                __classPrivateFieldGet(this, _EVIWebAudioPlayer_instances, "m", _EVIWebAudioPlayer_emitError).call(
                    this,
                    "Audio player is not initialized",
                );
                return;
            }
            if (__classPrivateFieldGet(this, _EVIWebAudioPlayer_enableAudioWorklet, "f")) {
                try {
                    const { data, id } = message;
                    const blob = convertBase64ToBlob(data);
                    const buffer = yield blob.arrayBuffer();
                    const audio = yield __classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f").decodeAudioData(
                        buffer,
                    );
                    const pcmData = audio.getChannelData(0);
                    __classPrivateFieldGet(this, _EVIWebAudioPlayer_workletNode, "f").port.postMessage({
                        type: "audio",
                        data: pcmData,
                    });
                    __classPrivateFieldSet(this, _EVIWebAudioPlayer_playing, true, "f");
                    this.dispatchEvent(new CustomEvent("play", { detail: { id } }));
                } catch (err) {
                    const msg = err instanceof Error ? err.message : "Unknown error";
                    __classPrivateFieldGet(this, _EVIWebAudioPlayer_instances, "m", _EVIWebAudioPlayer_emitError).call(
                        this,
                        `Failed to queue clip: ${msg}`,
                    );
                }
            } else {
                // Regular Buffer Mode
                try {
                    const audioBuffer = yield __classPrivateFieldGet(
                        this,
                        _EVIWebAudioPlayer_instances,
                        "m",
                        _EVIWebAudioPlayer_convertToAudioBuffer,
                    ).call(this, message);
                    if (!audioBuffer) {
                        __classPrivateFieldGet(
                            this,
                            _EVIWebAudioPlayer_instances,
                            "m",
                            _EVIWebAudioPlayer_emitError,
                        ).call(this, "Failed to convert data to audio buffer");
                        return;
                    }
                    const playableBuffers = __classPrivateFieldGet(
                        this,
                        _EVIWebAudioPlayer_instances,
                        "m",
                        _EVIWebAudioPlayer_getNextAudioBuffers,
                    ).call(this, message, audioBuffer);
                    if (playableBuffers.length === 0) {
                        return;
                    }
                    for (const nextAudioBufferToPlay of playableBuffers) {
                        __classPrivateFieldGet(this, _EVIWebAudioPlayer_clipQueue, "f").push({
                            id: nextAudioBufferToPlay.id,
                            buffer: nextAudioBufferToPlay.buffer,
                            index: nextAudioBufferToPlay.index,
                        });
                        if (__classPrivateFieldGet(this, _EVIWebAudioPlayer_clipQueue, "f").length === 1) {
                            __classPrivateFieldGet(
                                this,
                                _EVIWebAudioPlayer_instances,
                                "m",
                                _EVIWebAudioPlayer_playNextClip,
                            ).call(this);
                        }
                    }
                } catch (e) {
                    const eMessage = e instanceof Error ? e.message : "Unknown error";
                    __classPrivateFieldGet(this, _EVIWebAudioPlayer_instances, "m", _EVIWebAudioPlayer_emitError).call(
                        this,
                        `Failed to add clip to queue: ${eMessage}`,
                    );
                }
            }
        });
    }
    /**
     * Flush the worklet queue and output silence.
     */
    stop() {
        var _b;
        if (__classPrivateFieldGet(this, _EVIWebAudioPlayer_enableAudioWorklet, "f")) {
            // Clear buffered audio from the worklet queue
            (_b = __classPrivateFieldGet(this, _EVIWebAudioPlayer_workletNode, "f")) === null || _b === void 0
                ? void 0
                : _b.port.postMessage({ type: "fadeAndClear" });
        } else {
            // Regular Buffer mode
            if (__classPrivateFieldGet(this, _EVIWebAudioPlayer_currentlyPlayingAudioBuffer, "f")) {
                __classPrivateFieldGet(this, _EVIWebAudioPlayer_currentlyPlayingAudioBuffer, "f").stop();
                __classPrivateFieldGet(this, _EVIWebAudioPlayer_currentlyPlayingAudioBuffer, "f").disconnect();
                __classPrivateFieldSet(this, _EVIWebAudioPlayer_currentlyPlayingAudioBuffer, null, "f");
            }
            __classPrivateFieldSet(this, _EVIWebAudioPlayer_clipQueue, [], "f");
            __classPrivateFieldSet(this, _EVIWebAudioPlayer_isProcessing, false, "f");
        }
        // Restart analyser polling so fft events continue after stopping or clearing the queue
        __classPrivateFieldGet(
            this,
            _EVIWebAudioPlayer_instances,
            "m",
            _EVIWebAudioPlayer_startAnalyserPollingIfEnabled,
        ).call(this);
        __classPrivateFieldSet(this, _EVIWebAudioPlayer_playing, false, "f");
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
    setVolume(volume) {
        const clampedVolume = Math.max(0, Math.min(volume, 1));
        __classPrivateFieldSet(this, _EVIWebAudioPlayer_volume, clampedVolume, "f");
        if (
            __classPrivateFieldGet(this, _EVIWebAudioPlayer_gainNode, "f") &&
            __classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f") &&
            !__classPrivateFieldGet(this, _EVIWebAudioPlayer_muted, "f")
        ) {
            __classPrivateFieldGet(this, _EVIWebAudioPlayer_gainNode, "f").gain.setValueAtTime(
                clampedVolume,
                __classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f").currentTime,
            );
        }
    }
    /**
     * Mute output instantly by setting the gain to 0. Retains the last volume internally for later restore.
     */
    mute() {
        if (
            !__classPrivateFieldGet(this, _EVIWebAudioPlayer_gainNode, "f") ||
            !__classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f")
        )
            return;
        __classPrivateFieldGet(this, _EVIWebAudioPlayer_gainNode, "f").gain.setValueAtTime(
            0,
            __classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f").currentTime,
        );
        __classPrivateFieldSet(this, _EVIWebAudioPlayer_muted, true, "f");
    }
    /**
     * Restore output gain to the last set volume (via setVolume).
     */
    unmute() {
        if (
            !__classPrivateFieldGet(this, _EVIWebAudioPlayer_gainNode, "f") ||
            !__classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f")
        )
            return;
        __classPrivateFieldGet(this, _EVIWebAudioPlayer_gainNode, "f").gain.setValueAtTime(
            __classPrivateFieldGet(this, _EVIWebAudioPlayer_volume, "f"),
            __classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f").currentTime,
        );
        __classPrivateFieldSet(this, _EVIWebAudioPlayer_muted, false, "f");
    }
    /**
     * Tear down all Web-Audio resources (worklet, analyser, gain, context) and reset state so {@link init} can be called again.
     */
    dispose() {
        var _b, _c, _d, _e, _f, _g, _h;
        if (__classPrivateFieldGet(this, _EVIWebAudioPlayer_fftTimer, "f") != null) {
            clearInterval(__classPrivateFieldGet(this, _EVIWebAudioPlayer_fftTimer, "f"));
            __classPrivateFieldSet(this, _EVIWebAudioPlayer_fftTimer, null, "f");
        }
        if (__classPrivateFieldGet(this, _EVIWebAudioPlayer_enableAudioWorklet, "f")) {
            (_b = __classPrivateFieldGet(this, _EVIWebAudioPlayer_workletNode, "f")) === null || _b === void 0
                ? void 0
                : _b.port.postMessage({ type: "fadeAndClear" });
            (_c = __classPrivateFieldGet(this, _EVIWebAudioPlayer_workletNode, "f")) === null || _c === void 0
                ? void 0
                : _c.port.postMessage({ type: "end" });
            (_d = __classPrivateFieldGet(this, _EVIWebAudioPlayer_workletNode, "f")) === null || _d === void 0
                ? void 0
                : _d.port.close();
            (_e = __classPrivateFieldGet(this, _EVIWebAudioPlayer_workletNode, "f")) === null || _e === void 0
                ? void 0
                : _e.disconnect();
        } else {
            // Regular Buffer mode
            if (__classPrivateFieldGet(this, _EVIWebAudioPlayer_currentlyPlayingAudioBuffer, "f")) {
                __classPrivateFieldGet(this, _EVIWebAudioPlayer_currentlyPlayingAudioBuffer, "f").stop();
                __classPrivateFieldGet(this, _EVIWebAudioPlayer_currentlyPlayingAudioBuffer, "f").disconnect();
                __classPrivateFieldSet(this, _EVIWebAudioPlayer_currentlyPlayingAudioBuffer, null, "f");
            }
            __classPrivateFieldSet(this, _EVIWebAudioPlayer_clipQueue, [], "f");
            __classPrivateFieldSet(this, _EVIWebAudioPlayer_isProcessing, false, "f");
        }
        (_f = __classPrivateFieldGet(this, _EVIWebAudioPlayer_analyserNode, "f")) === null || _f === void 0
            ? void 0
            : _f.disconnect();
        (_g = __classPrivateFieldGet(this, _EVIWebAudioPlayer_gainNode, "f")) === null || _g === void 0
            ? void 0
            : _g.disconnect();
        (_h = __classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f")) === null || _h === void 0
            ? void 0
            : _h.close().catch(() => void 0);
        __classPrivateFieldSet(this, _EVIWebAudioPlayer_initialized, false, "f");
        __classPrivateFieldSet(this, _EVIWebAudioPlayer_playing, false, "f");
        __classPrivateFieldSet(this, _EVIWebAudioPlayer_fft, generateEmptyFft(), "f");
    }
}
((_a = EVIWebAudioPlayer),
    (_EVIWebAudioPlayer_ctx = new WeakMap()),
    (_EVIWebAudioPlayer_workletNode = new WeakMap()),
    (_EVIWebAudioPlayer_analyserNode = new WeakMap()),
    (_EVIWebAudioPlayer_gainNode = new WeakMap()),
    (_EVIWebAudioPlayer_initialized = new WeakMap()),
    (_EVIWebAudioPlayer_playing = new WeakMap()),
    (_EVIWebAudioPlayer_muted = new WeakMap()),
    (_EVIWebAudioPlayer_volume = new WeakMap()),
    (_EVIWebAudioPlayer_enableAudioWorklet = new WeakMap()),
    (_EVIWebAudioPlayer_fft = new WeakMap()),
    (_EVIWebAudioPlayer_fftTimer = new WeakMap()),
    (_EVIWebAudioPlayer_fftOptions = new WeakMap()),
    (_EVIWebAudioPlayer_clipQueue = new WeakMap()),
    (_EVIWebAudioPlayer_currentlyPlayingAudioBuffer = new WeakMap()),
    (_EVIWebAudioPlayer_isProcessing = new WeakMap()),
    (_EVIWebAudioPlayer_lastQueuedChunk = new WeakMap()),
    (_EVIWebAudioPlayer_chunkBufferQueues = new WeakMap()),
    (_EVIWebAudioPlayer_instances = new WeakSet()),
    (_EVIWebAudioPlayer_startAnalyserPollingIfEnabled = function _EVIWebAudioPlayer_startAnalyserPollingIfEnabled() {
        if (
            !__classPrivateFieldGet(this, _EVIWebAudioPlayer_fftOptions, "f") ||
            !__classPrivateFieldGet(this, _EVIWebAudioPlayer_analyserNode, "f")
        )
            return;
        if (__classPrivateFieldGet(this, _EVIWebAudioPlayer_fftTimer, "f"))
            clearInterval(__classPrivateFieldGet(this, _EVIWebAudioPlayer_fftTimer, "f"));
        const { interval, transform } = __classPrivateFieldGet(this, _EVIWebAudioPlayer_fftOptions, "f");
        __classPrivateFieldSet(
            this,
            _EVIWebAudioPlayer_fftTimer,
            window.setInterval(() => {
                const bins = new Uint8Array(
                    __classPrivateFieldGet(this, _EVIWebAudioPlayer_analyserNode, "f").frequencyBinCount,
                );
                __classPrivateFieldGet(this, _EVIWebAudioPlayer_analyserNode, "f").getByteFrequencyData(bins);
                __classPrivateFieldSet(
                    this,
                    _EVIWebAudioPlayer_fft,
                    transform(bins, __classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f").sampleRate),
                    "f",
                );
                this.dispatchEvent(
                    new CustomEvent("fft", {
                        detail: { fft: __classPrivateFieldGet(this, _EVIWebAudioPlayer_fft, "f") },
                    }),
                );
            }, interval),
            "f",
        );
    }),
    (_EVIWebAudioPlayer_emitError = function _EVIWebAudioPlayer_emitError(message) {
        this.dispatchEvent(new CustomEvent("error", { detail: { message } }));
    }),
    (_EVIWebAudioPlayer_convertToAudioBuffer = function _EVIWebAudioPlayer_convertToAudioBuffer(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (
                !__classPrivateFieldGet(this, _EVIWebAudioPlayer_initialized, "f") ||
                !__classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f")
            ) {
                __classPrivateFieldGet(this, _EVIWebAudioPlayer_instances, "m", _EVIWebAudioPlayer_emitError).call(
                    this,
                    "Audio player has not been initialized",
                );
                return;
            }
            const blob = convertBase64ToBlob(message.data);
            const arrayBuffer = yield blob.arrayBuffer();
            const audioBuffer = yield __classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f").decodeAudioData(
                arrayBuffer,
            );
            return audioBuffer;
        });
    }),
    (_EVIWebAudioPlayer_getNextAudioBuffers = function _EVIWebAudioPlayer_getNextAudioBuffers(message, audioBuffer) {
        var _b, _c;
        //1. Add the current buffer to the queue
        if (!__classPrivateFieldGet(this, _EVIWebAudioPlayer_chunkBufferQueues, "f")[message.id]) {
            __classPrivateFieldGet(this, _EVIWebAudioPlayer_chunkBufferQueues, "f")[message.id] = [];
        }
        const queueForCurrMessage =
            __classPrivateFieldGet(this, _EVIWebAudioPlayer_chunkBufferQueues, "f")[message.id] || [];
        queueForCurrMessage[message.index] = audioBuffer;
        // 2. Now collect buffers that are ready to be played
        const lastId =
            (_b = __classPrivateFieldGet(this, _EVIWebAudioPlayer_lastQueuedChunk, "f")) === null || _b === void 0
                ? void 0
                : _b.id;
        const buffers = [];
        // If the current message ID is different from the last one that was added
        // to the queue, that means that we're playing a new message now, so the first chunk
        // we play needs to be at index 0.
        if (message.id !== lastId) {
            if (queueForCurrMessage[0]) {
                __classPrivateFieldSet(this, _EVIWebAudioPlayer_lastQueuedChunk, { id: message.id, index: 0 }, "f");
                buffers.push({
                    id: message.id,
                    index: 0,
                    buffer: queueForCurrMessage[0],
                });
                // Every time we add a buffer to the buffers array, we set the current index to undefined.
                // This is so that we don't try to add the same buffer to the buffers array again the next
                // time we call this function.
                queueForCurrMessage[0] = undefined;
            } else {
                // If the current index is not 0, that means the chunks came out of order,
                // so we return an empty array instead of returning anything to be added to the queue.
                return [];
            }
        }
        // Drain the queue - basically if any chunks were received out of order previously,
        // and they're now ready to be played because the earlier chunks
        // have been received, we can add them to the buffers array.
        let nextIdx =
            (((_c = __classPrivateFieldGet(this, _EVIWebAudioPlayer_lastQueuedChunk, "f")) === null || _c === void 0
                ? void 0
                : _c.index) || 0) + 1;
        let nextBuf = queueForCurrMessage[nextIdx];
        while (nextBuf) {
            buffers.push({ index: nextIdx, buffer: nextBuf, id: message.id });
            // As above re: setting queueForCurrMessage[nextIdx] to undefined
            queueForCurrMessage[nextIdx] = undefined;
            __classPrivateFieldSet(this, _EVIWebAudioPlayer_lastQueuedChunk, { id: message.id, index: nextIdx }, "f");
            nextIdx += 1;
            nextBuf = queueForCurrMessage[nextIdx];
        }
        return buffers;
    }),
    (_EVIWebAudioPlayer_playNextClip = function _EVIWebAudioPlayer_playNextClip() {
        var _b, _c;
        if (
            __classPrivateFieldGet(this, _EVIWebAudioPlayer_clipQueue, "f").length === 0 ||
            __classPrivateFieldGet(this, _EVIWebAudioPlayer_isProcessing, "f")
        ) {
            return;
        }
        if (
            __classPrivateFieldGet(this, _EVIWebAudioPlayer_analyserNode, "f") === null ||
            __classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f") === null
        ) {
            __classPrivateFieldGet(this, _EVIWebAudioPlayer_instances, "m", _EVIWebAudioPlayer_emitError).call(
                this,
                "Audio player is not initialized",
            );
            return;
        }
        const nextClip = __classPrivateFieldGet(this, _EVIWebAudioPlayer_clipQueue, "f").shift();
        if (!nextClip) return;
        __classPrivateFieldSet(this, _EVIWebAudioPlayer_isProcessing, true, "f");
        __classPrivateFieldSet(this, _EVIWebAudioPlayer_playing, true, "f");
        const bufferSource = __classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f").createBufferSource();
        bufferSource.buffer = nextClip.buffer;
        if (__classPrivateFieldGet(this, _EVIWebAudioPlayer_analyserNode, "f")) {
            bufferSource.connect(__classPrivateFieldGet(this, _EVIWebAudioPlayer_analyserNode, "f"));
        }
        if (__classPrivateFieldGet(this, _EVIWebAudioPlayer_gainNode, "f")) {
            (_b = __classPrivateFieldGet(this, _EVIWebAudioPlayer_analyserNode, "f")) === null || _b === void 0
                ? void 0
                : _b.connect(__classPrivateFieldGet(this, _EVIWebAudioPlayer_gainNode, "f"));
            __classPrivateFieldGet(this, _EVIWebAudioPlayer_gainNode, "f").connect(
                __classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f").destination,
            );
        } else {
            (_c = __classPrivateFieldGet(this, _EVIWebAudioPlayer_analyserNode, "f")) === null || _c === void 0
                ? void 0
                : _c.connect(__classPrivateFieldGet(this, _EVIWebAudioPlayer_ctx, "f").destination);
        }
        __classPrivateFieldSet(this, _EVIWebAudioPlayer_currentlyPlayingAudioBuffer, bufferSource, "f");
        __classPrivateFieldGet(
            this,
            _EVIWebAudioPlayer_instances,
            "m",
            _EVIWebAudioPlayer_startAnalyserPollingIfEnabled,
        ).call(this);
        bufferSource.start(0);
        if (nextClip.index === 0) {
            this.dispatchEvent(new CustomEvent("play", { detail: { id: nextClip.id } }));
        }
        bufferSource.onended = () => {
            if (__classPrivateFieldGet(this, _EVIWebAudioPlayer_fftTimer, "f")) {
                clearInterval(__classPrivateFieldGet(this, _EVIWebAudioPlayer_fftTimer, "f"));
                __classPrivateFieldSet(this, _EVIWebAudioPlayer_fftTimer, null, "f");
            }
            __classPrivateFieldSet(this, _EVIWebAudioPlayer_fft, generateEmptyFft(), "f");
            bufferSource.disconnect();
            __classPrivateFieldSet(this, _EVIWebAudioPlayer_isProcessing, false, "f");
            __classPrivateFieldSet(this, _EVIWebAudioPlayer_playing, false, "f");
            this.dispatchEvent(new CustomEvent("stop", { detail: { id: nextClip.id } }));
            __classPrivateFieldSet(this, _EVIWebAudioPlayer_currentlyPlayingAudioBuffer, null, "f");
            __classPrivateFieldGet(this, _EVIWebAudioPlayer_instances, "m", _EVIWebAudioPlayer_playNextClip).call(this);
        };
    }));
/** Default URL of the `audio-worklet.js` processor module, fetched from Hume AI’s CDN. */
_EVIWebAudioPlayer_DEFAULT_WORKLET_URL = {
    value: "https://storage.googleapis.com/evi-react-sdk-assets/audio-worklet-20250506.js",
};
/** Default FFT size (power-of-two). */
_EVIWebAudioPlayer_DEFAULT_FFT_SIZE = { value: 2048 };
/** Default analyser poll interval (16 ms). */
_EVIWebAudioPlayer_DEFAULT_FFT_INTERVAL = { value: 16 };
