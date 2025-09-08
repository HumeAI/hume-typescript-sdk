/**
 * Converts a `Blob` object into a base64-encoded string.
 * The resulting string contains the binary data from the `Blob`.
 *
 * @param {Blob} blob - The `Blob` object to convert to base64.
 * @returns {Promise<string>} A promise that resolves to a base64-encoded string representing the `Blob` data.
 */
export declare function convertBlobToBase64(blob: Blob): Promise<string>;
