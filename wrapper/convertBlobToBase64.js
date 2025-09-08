/**
 * Converts a `Blob` object into a base64-encoded string.
 * The resulting string contains the binary data from the `Blob`.
 *
 * @param {Blob} blob - The `Blob` object to convert to base64.
 * @returns {Promise<string>} A promise that resolves to a base64-encoded string representing the `Blob` data.
 */
export function convertBlobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        // Handle the load event which is triggered when readAsDataURL completes
        reader.onloadend = () => {
            // Ensure reader.result is not null and is a string
            if (typeof reader.result === "string") {
                // Extract the Base64 encoded string, skipping the data URL prefix (e.g., "data:image/png;base64,")
                const base64Data = reader.result.split(",")[1];
                if (base64Data) {
                    resolve(base64Data);
                } else {
                    reject(new Error("Failed to split the result into Base64 data."));
                }
            } else {
                reject(new Error("FileReader result is null or not a string."));
            }
        };
        // Handle errors during the read process
        reader.onerror = () => {
            var _a;
            reject(
                new Error(`Error reading blob: ${(_a = reader.error) === null || _a === void 0 ? void 0 : _a.message}`),
            );
        };
        // Initiate reading the blob as a data URL
        reader.readAsDataURL(blob);
    });
}
