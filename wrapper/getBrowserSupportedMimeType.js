/**
 * Enum representing the supported MIME types for audio recording.
 */
export var MimeType;
(function (MimeType) {
    MimeType["WEBM"] = "audio/webm";
    MimeType["MP4"] = "audio/mp4";
    MimeType["WAV"] = "audio/wav";
})(MimeType || (MimeType = {}));
/**
 * Checks whether the `MediaRecorder` API is supported in the current environment.
 *
 * @returns {boolean} Returns `true` if the `MediaRecorder` API is supported, otherwise `false`.
 */
function isMediaRecorderSupported() {
    return typeof MediaRecorder !== "undefined";
}
/**
 * Finds and returns the first MIME type from the given array that is supported by the `MediaRecorder`.
 *
 * @param {MimeType[]} mimeTypes - An array of MIME types to check for compatibility.
 * @returns {MimeType | null} The first supported MIME type or `null` if none are supported.
 */
function getSupportedMimeType(mimeTypes) {
    return mimeTypes.find((type) => MediaRecorder.isTypeSupported(type)) || null;
}
/**
 * Determines if the current browser supports any of the predefined audio MIME types
 * (WEBM, MP4, or WAV) via the `MediaRecorder` API.
 *
 * @returns {MimeTypeResult} An object containing the success status and either a supported MIME type or an error.
 * @throws {Error} If the `MediaRecorder` API is not supported by the browser or no compatible types are found.
 */
export function getBrowserSupportedMimeType() {
    // Check if the MediaRecorder API is supported in the current environment.
    if (!isMediaRecorderSupported()) {
        return {
            success: false,
            error: new Error("MediaRecorder is not supported"),
        };
    }
    const COMPATIBLE_MIME_TYPES = [MimeType.WEBM, MimeType.MP4, MimeType.WAV];
    // Find the first compatible MIME type that the browser's MediaRecorder supports.
    const supportedMimeType = getSupportedMimeType(COMPATIBLE_MIME_TYPES);
    // If no compatible MIME type is found, return a failure result with an appropriate error message.
    if (!supportedMimeType) {
        return {
            success: false,
            error: new Error("Browser does not support any compatible mime types"),
        };
    }
    // If a compatible MIME type is found, return a success result with the supported MIME type.
    return {
        success: true,
        mimeType: supportedMimeType,
    };
}
