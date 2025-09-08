export type AudioStreamOptions = {
    echoCancellation?: boolean;
    noiseSuppression?: boolean;
    autoGainControl?: boolean;
};
/**
 * Requests an audio stream from the user's device using the `getUserMedia` API.
 * The stream will have echo cancellation, noise suppression, and auto gain control enabled.
 *
 * @returns {Promise<MediaStream>} A promise that resolves to a `MediaStream` containing audio data only.
 * @throws {DOMException} If the user denies access or no audio input devices are found.
 */
export declare const getAudioStream: (audioStreamOptions?: AudioStreamOptions) => Promise<MediaStream>;
