/**
 * Converts a base64-encoded string into a `Blob` object with the specified content type.
 *
 * @param {string} base64 - The base64-encoded string representing binary data.
 * @param {string} contentType - The MIME type to assign to the resulting `Blob`.
 * @returns {Blob} A `Blob` object containing the binary data from the base64 string.
 */
export function convertBase64ToBlob(base64, contentType) {
    // Decode base64 string to a binary string
    const binaryString = window.atob(base64);
    // Create a Uint8Array with the same length as the binary string
    const byteArray = new Uint8Array(binaryString.length);
    // Fill the Uint8Array by converting each character's Unicode value to a byte
    for (let i = 0; i < binaryString.length; i++) {
        byteArray[i] = binaryString.charCodeAt(i);
    }
    // Create and return a Blob with the specified content type
    return new Blob([byteArray], { type: contentType });
}
