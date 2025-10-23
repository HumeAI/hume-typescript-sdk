/**
 * Enum representing the supported MIME types for audio recording.
 */
export enum MimeType {
    WEBM = "audio/webm",
    MP4 = "audio/mp4",
    WAV = "audio/wav",
}

/**
 * Represents a successful result where a compatible MIME type was found.
 * @property {true} success - Indicates a successful result.
 * @property {MimeType} mimeType - The MIME type supported by the browser.
 */
type MimeTypeSuccessResult = { success: true; mimeType: MimeType };

/**
 * Represents a failure result when no compatible MIME type is supported or an error occurs.
 * @property {false} success - Indicates a failure result.
 * @property {Error} error - The error explaining why a compatible MIME type was not found.
 */
type MimeTypeFailureResult = { success: false; error: Error };

/**
 * Union type representing the possible outcomes of checking for a supported MIME type.
 * Could either be a successful or failure result.
 */
type MimeTypeResult = MimeTypeSuccessResult | MimeTypeFailureResult;

/**
 * Checks whether the `MediaRecorder` API is supported in the current environment.
 *
 * @returns {boolean} Returns `true` if the `MediaRecorder` API is supported, otherwise `false`.
 */
function isMediaRecorderSupported(): boolean {
    return typeof MediaRecorder !== "undefined";
}

/**
 * Finds and returns the first MIME type from the given array that is supported by the `MediaRecorder`.
 *
 * @param {MimeType[]} mimeTypes - An array of MIME types to check for compatibility.
 * @returns {MimeType | null} The first supported MIME type or `null` if none are supported.
 */
function getSupportedMimeType(mimeTypes: MimeType[]): MimeType | null {
    return mimeTypes.find((type) => MediaRecorder.isTypeSupported(type)) || null;
}

/**
 * Determines if the current browser supports any of the predefined audio MIME types
 * (WEBM, MP4, or WAV) via the `MediaRecorder` API.
 *
 * @returns {MimeTypeResult} An object containing the success status and either a supported MIME type or an error.
 * @throws {Error} If the `MediaRecorder` API is not supported by the browser or no compatible types are found.
 */
export function getBrowserSupportedMimeType(): MimeTypeResult {
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
