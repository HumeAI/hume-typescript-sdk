import { Readable } from "stream";

/**
 * SilenceFiller is a Readable stream that intersperses incoming audio data
 * with bytes of silence. This is important in some cases to keep an audio
 * stream "alive". Audio players, such as ffmpeg, can interpret inactivity as
 * meaning the stream is ended, or disconnected.
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
export class SilenceFiller extends Readable {
  private unclockedSilenceFiller: UnclockedSilenceFiller;
  private isStarted: boolean = false;
  private pushInterval: NodeJS.Timeout | null = null;
  private bytesPerSample: number;
  private pushIntervalMs: number;

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
    bufferSize: number = 9600,
  ) {
    super({ objectMode: false });
    this.unclockedSilenceFiller = new UnclockedSilenceFiller(bufferSize, sampleRate, bytesPerSample);
    this.bytesPerSample = bytesPerSample;
    this.pushIntervalMs = pushIntervalMs;
  }

  /**
   * Writes audio data to the silence filler.
   *
   * @param audioBuffer - The audio buffer to write.
   */
  writeAudio(audioBuffer: Buffer): void {
    const now = Date.now();
    try {
      this.unclockedSilenceFiller.writeAudio(audioBuffer, now);
      if (!this.isStarted && this.unclockedSilenceFiller.donePrebuffering) {
        this.isStarted = true;
        this.startPushInterval();
      }
    } catch (error) {
      console.error(`[SilenceFiller] Error writing audio:`, error);
      this.emit('error', error);
    }
  }

  private startPushInterval(): void {
    this.pushInterval = setInterval(() => {
      this.pushData();
    }, this.pushIntervalMs);
  }

  private pushData(): void {
    if (!this.isStarted) return;

    try {
      const now = Date.now();
      const audioChunk = this.unclockedSilenceFiller.readAudio(now);

      if (audioChunk && audioChunk.length > 0) {
        // Ensure chunk size is aligned to bytesPerSample
        const alignedChunkSize = Math.floor(audioChunk.length / this.bytesPerSample) * this.bytesPerSample;

        if (alignedChunkSize > 0) {
          const chunk = audioChunk.subarray(0, alignedChunkSize);
          this.push(chunk);
        }
      }
    } catch (error) {
      console.error(`[SilenceFiller] Error pushing data:`, error);
      this.emit('error', error);
    }
  }

  _read(): void { }

  _destroy(error: Error | null, callback: (error?: Error | null) => void): void {
    super._destroy(error, callback);
  }

  /**
   * Ends the stream and drains all remaining audio data.
   *
   * @returns A promise that resolves when the stream has ended.
   */
  endStream(): Promise<void> {
    return new Promise((resolve) => {
      // Stop pushing data
      if (this.pushInterval) {
        clearInterval(this.pushInterval);
        this.pushInterval = null;
      }

      // Drain all remaining audio from SilenceFiller
      const now = Date.now();

      // Keep reading until no more audio is available
      while (true) {
        const remainingChunk = this.unclockedSilenceFiller.readAudio(now);

        if (!remainingChunk || remainingChunk.length === 0) {
          break;
        }

        const alignedChunkSize = Math.floor(remainingChunk.length / this.bytesPerSample) * this.bytesPerSample;
        if (alignedChunkSize > 0) {
          const chunk = remainingChunk.subarray(0, alignedChunkSize);
          this.push(chunk);
        }
      }

      this.push(null); // Signal end of stream

      this.once('end', () => {
        resolve();
      });
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
  private audioQueue: Buffer[] = [];
  private totalBufferedBytes: number = 0;
  private startTimestamp: number | null = null;
  private totalBytesSent: number = 0;
  public donePrebuffering: boolean = false;
  private bufferSize: number;
  private sampleRate: number;
  private bytesPerSample: number;

  constructor(
    bufferSize: number,
    sampleRate: number,
    bytesPerSample: number
  ) {
    this.bufferSize = bufferSize;
    this.sampleRate = sampleRate;
    this.bytesPerSample = bytesPerSample;
  }

  writeAudio(audioBuffer: Buffer, timestamp: number): void {
    this.audioQueue.push(audioBuffer);
    this.totalBufferedBytes += audioBuffer.length;

    if (this.startTimestamp === null) {
      this.startTimestamp = timestamp;
    }

    if (!this.donePrebuffering && this.totalBufferedBytes >= this.bufferSize) {
      this.donePrebuffering = true;
    }
  }

  readAudio(timestamp: number): Buffer | null {
    if (this.startTimestamp === null || !this.donePrebuffering) {
      return null;
    }

    const elapsedMs = timestamp - this.startTimestamp;

    const targetBytesSent = Math.floor((this.sampleRate * elapsedMs / 1000) * this.bytesPerSample);

    const bytesNeeded = targetBytesSent - this.totalBytesSent;

    if (bytesNeeded <= 0) {
      return null;
    }

    // Ensure bytesNeeded is a multiple of bytesPerSample
    const alignedBytesNeeded = Math.floor(bytesNeeded / this.bytesPerSample) * this.bytesPerSample;

    if (alignedBytesNeeded <= 0) {
      return null;
    }

    let chunk = Buffer.alloc(0);

    // Drain from queue until we have enough bytes
    while (chunk.length < alignedBytesNeeded && this.audioQueue.length > 0) {
      const nextBuffer = this.audioQueue.shift()!;
      chunk = Buffer.concat([chunk, nextBuffer]);
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
      const silenceNeeded = Buffer.alloc(alignedBytesNeeded - chunk.length, 0);
      chunk = Buffer.concat([chunk, silenceNeeded]);
    }

    // Update total bytes sent
    this.totalBytesSent += chunk.length;

    return chunk;
  }
}
