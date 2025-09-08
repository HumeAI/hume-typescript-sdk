/**
 * Enum representing the supported MIME types for audio recording.
 */
export declare enum MimeType {
    WEBM = "audio/webm",
    MP4 = "audio/mp4",
    WAV = "audio/wav",
}
/**
 * Represents a successful result where a compatible MIME type was found.
 * @property {true} success - Indicates a successful result.
 * @property {MimeType} mimeType - The MIME type supported by the browser.
 */
type MimeTypeSuccessResult = {
    success: true;
    mimeType: MimeType;
};
/**
 * Represents a failure result when no compatible MIME type is supported or an error occurs.
 * @property {false} success - Indicates a failure result.
 * @property {Error} error - The error explaining why a compatible MIME type was not found.
 */
type MimeTypeFailureResult = {
    success: false;
    error: Error;
};
/**
 * Union type representing the possible outcomes of checking for a supported MIME type.
 * Could either be a successful or failure result.
 */
type MimeTypeResult = MimeTypeSuccessResult | MimeTypeFailureResult;
/**
 * Determines if the current browser supports any of the predefined audio MIME types
 * (WEBM, MP4, or WAV) via the `MediaRecorder` API.
 *
 * @returns {MimeTypeResult} An object containing the success status and either a supported MIME type or an error.
 * @throws {Error} If the `MediaRecorder` API is not supported by the browser or no compatible types are found.
 */
export declare function getBrowserSupportedMimeType(): MimeTypeResult;
export {};
