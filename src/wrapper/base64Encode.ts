export function base64Encode(str: string): string {
    if (typeof btoa === "function") {
        // Browser environment
        return btoa(str);
    } else if (typeof Buffer === "function") {
        // Node.js environment
        const buffer = Buffer.from(str, "utf-8");
        return buffer.toString("base64");
    } else {
        throw new Error("Base64 encoding not supported in this environment.");
    }
}
