/**
 * A minimal Writable-like interface that SilenceFiller can pipe to.
 * This matches the subset of Node.js Writable that we need.
 */
export interface PipeDestination {
    write(chunk: Uint8Array): boolean;
    end?(): void;
    on?(event: "drain", listener: () => void): this;
    once?(event: "drain", listener: () => void): this;
    removeListener?(event: "drain", listener: () => void): this;
}

type EventListener = (...args: unknown[]) => void;

/**
 * SilenceFiller is a pipeable stream that intersperses incoming audio data
 * with bytes of silence. This is important in some cases to keep an audio
 * stream "alive". Audio players, such as ffmpeg, can interpret inactivity as
 * meaning the stream is ended, or disconnected.
 *
 * This implementation does not depend on Node.js built-ins and can work in
 * any JavaScript environment, while still being pipeable to Node.js streams.
 *
 * @example
 * ```typescript
 * import { SilenceFiller } from 'hume';
 *
 * const BYTES_PER_SAMPLE = 2; // 16-bit samples
 * const SAMPLE_RATE = 48000;
 * const BUFFER_SIZE = Math.floor(SAMPLE_RATE * 0.1 * BYTES_PER_SAMPLE); // 100ms buffer
 * const silenceFiller = new SilenceFiller(BUFFER_SIZE, SAMPLE_RATE, BYTES_PER_SAMPLE, 10);
 *
 * // Pipe silence filler output to audio player stdin
 * silenceFiller.pipe(audioPlayer.stdin);
 *
 * // Handle pipe errors
 * silenceFiller.on('error', (err) => {
 *   console.error("SilenceFiller error:", err);
 * });
 *
 * // Write audio data as it arrives
 * silenceFiller.writeAudio(audioBuffer);
 *
 * // End the stream when done
 * await silenceFiller.endStream();
 * ```
 */
export class SilenceFiller {
    private unclockedSilenceFiller: UnclockedSilenceFiller;
    private isStarted: boolean = false;
    private pushIntervalId: ReturnType<typeof setInterval> | null = null;
    private bytesPerSample: number;
    private pushIntervalMs: number;
    private destination: PipeDestination | null = null;
    private eventListeners: Map<string, Set<EventListener>> = new Map();
    private ended: boolean = false;

    /**
     * Creates a new SilenceFiller instance.
     *
     * @param pushIntervalMs - The interval in milliseconds for pushing audio data (default: 5ms).
     * @param sampleRate - The sample rate of the audio (e.g., 48000).
     * @param bytesPerSample - The number of bytes per audio sample (e.g., 2 for 16-bit).
     * @param bufferSize - How much to 'prebuffer'. If you set this too low there
     * is a chance that playback will stutter, but if you set it too high
     * playback will take longer to start.
     */
    constructor(
        pushIntervalMs: number = 5,
        sampleRate: number = 48000,
        bytesPerSample: number = 2,
        bufferSize: number = 9600
    ) {
        this.unclockedSilenceFiller = new UnclockedSilenceFiller(bufferSize, sampleRate, bytesPerSample);
        this.bytesPerSample = bytesPerSample;
        this.pushIntervalMs = pushIntervalMs;
    }

    /**
     * Pipes the output of this SilenceFiller to a writable destination.
     *
     * @param destination - The destination to pipe to (e.g., a Node.js Writable stream).
     * @returns The destination, for chaining.
     */
    pipe<T extends PipeDestination>(destination: T): T {
        this.destination = destination;
        return destination;
    }

    /**
     * Registers an event listener.
     *
     * @param event - The event name ('error', 'end').
     * @param listener - The listener function.
     * @returns This instance, for chaining.
     */
    on(event: string, listener: EventListener): this {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, new Set());
        }
        this.eventListeners.get(event)!.add(listener);
        return this;
    }

    /**
     * Registers a one-time event listener.
     *
     * @param event - The event name ('error', 'end').
     * @param listener - The listener function.
     * @returns This instance, for chaining.
     */
    once(event: string, listener: EventListener): this {
        const onceWrapper: EventListener = (...args: unknown[]) => {
            this.off(event, onceWrapper);
            listener(...args);
        };
        return this.on(event, onceWrapper);
    }

    /**
     * Removes an event listener.
     *
     * @param event - The event name.
     * @param listener - The listener function to remove.
     * @returns This instance, for chaining.
     */
    off(event: string, listener: EventListener): this {
        const listeners = this.eventListeners.get(event);
        if (listeners) {
            listeners.delete(listener);
        }
        return this;
    }

    /**
     * Emits an event to all registered listeners.
     *
     * @param event - The event name.
     * @param args - Arguments to pass to listeners.
     */
    private emit(event: string, ...args: unknown[]): void {
        const listeners = this.eventListeners.get(event);
        if (listeners) {
            for (const listener of listeners) {
                try {
                    listener(...args);
                } catch {
                    // Ignore errors in listeners
                }
            }
        }
    }

    /**
     * Writes audio data to the silence filler.
     *
     * @param audioBuffer - The audio buffer to write (Uint8Array or Buffer).
     */
    writeAudio(audioBuffer: Uint8Array): void {
        const now = Date.now();
        try {
            this.unclockedSilenceFiller.writeAudio(audioBuffer, now);
            if (!this.isStarted && this.unclockedSilenceFiller.donePrebuffering) {
                this.isStarted = true;
                this.startPushInterval();
            }
        } catch (error) {
            console.error(`[SilenceFiller] Error writing audio:`, error);
            this.emit("error", error);
        }
    }

    private startPushInterval(): void {
        this.pushIntervalId = setInterval(() => {
            this.pushData();
        }, this.pushIntervalMs);
    }

    private pushData(): void {
        if (!this.isStarted || !this.destination) return;

        try {
            const now = Date.now();
            const audioChunk = this.unclockedSilenceFiller.readAudio(now);

            if (audioChunk && audioChunk.length > 0) {
                // Ensure chunk size is aligned to bytesPerSample
                const alignedChunkSize = Math.floor(audioChunk.length / this.bytesPerSample) * this.bytesPerSample;

                if (alignedChunkSize > 0) {
                    const chunk = audioChunk.subarray(0, alignedChunkSize);
                    this.destination.write(chunk);
                }
            }
        } catch (error) {
            console.error(`[SilenceFiller] Error pushing data:`, error);
            this.emit("error", error);
        }
    }

    /**
     * Ends the stream and drains all remaining audio data.
     *
     * @returns A promise that resolves when the stream has ended.
     */
    endStream(): Promise<void> {
        return new Promise((resolve) => {
            if (this.ended) {
                resolve();
                return;
            }
            this.ended = true;

            // Stop pushing data
            if (this.pushIntervalId) {
                clearInterval(this.pushIntervalId);
                this.pushIntervalId = null;
            }

            // Drain all remaining audio from SilenceFiller
            const now = Date.now();

            // Keep reading until no more audio is available
            while (this.destination) {
                const remainingChunk = this.unclockedSilenceFiller.readAudio(now);

                if (!remainingChunk || remainingChunk.length === 0) {
                    break;
                }

                const alignedChunkSize =
                    Math.floor(remainingChunk.length / this.bytesPerSample) * this.bytesPerSample;
                if (alignedChunkSize > 0) {
                    const chunk = remainingChunk.subarray(0, alignedChunkSize);
                    this.destination.write(chunk);
                }
            }

            this.emit("end");
            resolve();
        });
    }
}

/**
 * Does the actual calculation of how interspersing audio with silence
 * is "pure" in the sense that it does not rely on the system clock.
 * It's up to the caller to provide timestamps.
 *
 * @internal
 */
export class UnclockedSilenceFiller {
    private audioQueue: Uint8Array[] = [];
    private totalBufferedBytes: number = 0;
    private startTimestamp: number | null = null;
    private totalBytesSent: number = 0;
    public donePrebuffering: boolean = false;
    private bufferSize: number;
    private sampleRate: number;
    private bytesPerSample: number;

    constructor(bufferSize: number, sampleRate: number, bytesPerSample: number) {
        this.bufferSize = bufferSize;
        this.sampleRate = sampleRate;
        this.bytesPerSample = bytesPerSample;
    }

    writeAudio(audioBuffer: Uint8Array, timestamp: number): void {
        this.audioQueue.push(audioBuffer);
        this.totalBufferedBytes += audioBuffer.length;

        if (this.startTimestamp === null) {
            this.startTimestamp = timestamp;
        }

        if (!this.donePrebuffering && this.totalBufferedBytes >= this.bufferSize) {
            this.donePrebuffering = true;
        }
    }

    readAudio(timestamp: number): Uint8Array | null {
        if (this.startTimestamp === null || !this.donePrebuffering) {
            return null;
        }

        const elapsedMs = timestamp - this.startTimestamp;

        const targetBytesSent = Math.floor(((this.sampleRate * elapsedMs) / 1000) * this.bytesPerSample);

        const bytesNeeded = targetBytesSent - this.totalBytesSent;

        if (bytesNeeded <= 0) {
            return null;
        }

        // Ensure bytesNeeded is a multiple of bytesPerSample
        const alignedBytesNeeded = Math.floor(bytesNeeded / this.bytesPerSample) * this.bytesPerSample;

        if (alignedBytesNeeded <= 0) {
            return null;
        }

        let chunk = new Uint8Array(0);

        // Drain from queue until we have enough bytes
        while (chunk.length < alignedBytesNeeded && this.audioQueue.length > 0) {
            const nextBuffer = this.audioQueue.shift()!;
            chunk = concatUint8Arrays(chunk, nextBuffer);
            this.totalBufferedBytes -= nextBuffer.length;
        }

        // If we have more than needed, put the excess back
        if (chunk.length > alignedBytesNeeded) {
            const excess = chunk.subarray(alignedBytesNeeded);
            this.audioQueue.unshift(excess);
            this.totalBufferedBytes += excess.length;
            chunk = chunk.subarray(0, alignedBytesNeeded);
        }

        // Fill remaining with silence if needed
        if (chunk.length < alignedBytesNeeded) {
            const silenceNeeded = new Uint8Array(alignedBytesNeeded - chunk.length); // Uint8Array is zero-filled by default
            chunk = concatUint8Arrays(chunk, silenceNeeded);
        }

        // Update total bytes sent
        this.totalBytesSent += chunk.length;

        return chunk;
    }
}

/**
 * Concatenates two Uint8Arrays into a new Uint8Array.
 */
function concatUint8Arrays(a: Uint8Array, b: Uint8Array): Uint8Array {
    const result = new Uint8Array(a.length + b.length);
    result.set(a, 0);
    result.set(b, a.length);
    return result;
}
