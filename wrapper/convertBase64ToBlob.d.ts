/**
 * Converts a base64-encoded string into a `Blob` object with the specified content type.
 *
 * @param {string} base64 - The base64-encoded string representing binary data.
 * @param {string} contentType - The MIME type to assign to the resulting `Blob`.
 * @returns {Blob} A `Blob` object containing the binary data from the base64 string.
 */
export declare function convertBase64ToBlob(base64: string, contentType?: string): Blob;
