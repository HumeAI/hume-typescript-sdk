/**
 * Ensures that the given media stream contains exactly one valid audio track.
 * Throws an error if no audio tracks are found, if there is more than one audio track,
 * or if the sole audio track is falsy.
 *
 * @param {MediaStream} stream - The media stream object containing audio tracks to validate.
 * @throws {Error} "No audio tracks" if the stream contains zero audio tracks.
 * @throws {Error} "Multiple audio tracks" if the stream contains more than one audio track.
 * @throws {Error} "No audio track" if the sole audio track is falsy.
 */
export declare const ensureSingleValidAudioTrack: (stream: MediaStream) => void;
