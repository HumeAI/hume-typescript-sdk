/**
 * SilenceFiller intersperses incoming audio data with bytes of silence.
 * This keeps audio streams "alive" as players like ffmpeg can interpret
 * inactivity as stream end or disconnection.
 *
 * @example
 * ```typescript
 * import { SilenceFiller } from 'hume';
 *
 * const silenceFiller = new SilenceFiller();
 *
 * // Write audio data as it arrives
 * silenceFiller.writeAudio(audioBuffer);
 *
 * // Read audio data with silence filled in
 * const chunk = silenceFiller.readAudio();
 * if (chunk) {
 *   // Send to audio player
 *   audioPlayer.write(chunk);
 * }
 *
 * // When done, drain remaining audio
 * const remaining = silenceFiller.drain();
 * if (remaining) {
 *   audioPlayer.write(remaining);
 * }
 * ```
 */
export class SilenceFiller {
    private audioQueue: Uint8Array[] = [];
    private totalBufferedBytes: number = 0;
    private startTimestamp: number | null = null;
    private totalBytesSent: number = 0;
    private donePrebuffering: boolean = false;
    private bufferSize: number;
    private sampleRate: number;
    private bytesPerSample: number;

    /**
     * Creates a new SilenceFiller instance.
     *
     * @param sampleRate - The sample rate of the audio (default: 48000).
     * @param bytesPerSample - The number of bytes per audio sample (default: 2 for 16-bit).
     * @param bufferSize - Prebuffer size in bytes (default: 9600).
     */
    constructor(sampleRate: number = 48000, bytesPerSample: number = 2, bufferSize: number = 9600) {
        this.bufferSize = bufferSize;
        this.sampleRate = sampleRate;
        this.bytesPerSample = bytesPerSample;
    }

    /**
     * Writes audio data to the silence filler.
     *
     * @param audioBuffer - The audio buffer to write.
     */
    writeAudio(audioBuffer: Uint8Array): void {
        this.audioQueue.push(audioBuffer);
        this.totalBufferedBytes += audioBuffer.length;

        const now = Date.now();
        if (this.startTimestamp === null) {
            this.startTimestamp = now;
        }

        if (!this.donePrebuffering && this.totalBufferedBytes >= this.bufferSize) {
            this.donePrebuffering = true;
        }
    }

    /**
     * Reads audio data with appropriate silence filling.
     * Call this periodically (e.g., every 5-10ms) to get a steady stream.
     *
     * @returns Audio chunk with silence filled as needed, or null if not ready.
     */
    readAudio(): Uint8Array | null {
        if (this.startTimestamp === null || !this.donePrebuffering) {
            return null;
        }

        const now = Date.now();
        const elapsedMs = now - this.startTimestamp;
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
            chunk = this.concat([chunk, nextBuffer]);
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
            const silenceNeeded = new Uint8Array(alignedBytesNeeded - chunk.length);
            chunk = this.concat([chunk, silenceNeeded]);
        }

        // Update total bytes sent
        this.totalBytesSent += chunk.length;

        return chunk;
    }

    /**
     * Drains all remaining audio data from the buffer.
     * Call this when you're done writing audio to get any remaining data.
     *
     * @returns All remaining audio data, or null if buffer is empty.
     */
    drain(): Uint8Array | null {
        if (this.audioQueue.length === 0) {
            return null;
        }

        const chunks: Uint8Array[] = [];
        while (this.audioQueue.length > 0) {
            chunks.push(this.audioQueue.shift()!);
        }

        this.totalBufferedBytes = 0;
        return this.concat(chunks);
    }

    /**
     * Resets the silence filler to its initial state.
     */
    reset(): void {
        this.audioQueue = [];
        this.totalBufferedBytes = 0;
        this.startTimestamp = null;
        this.totalBytesSent = 0;
        this.donePrebuffering = false;
    }

    /**
     * Helper to concatenate Uint8Arrays
     */
    private concat(buffers: Uint8Array[]): Uint8Array {
        const totalLength = buffers.reduce((sum, buf) => sum + buf.length, 0);
        const result = new Uint8Array(totalLength);
        let offset = 0;

        for (const buf of buffers) {
            result.set(buf, offset);
            offset += buf.length;
        }

        return result;
    }
}
