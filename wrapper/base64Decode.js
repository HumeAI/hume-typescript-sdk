export function base64Decode(str) {
    if (typeof Buffer === "function") {
        // Node.js environment
        return Buffer.from(str, "base64");
    } else if (typeof atob === "function") {
        // Browser environment
        return atob(str);
    } else {
        throw new Error("Base64 encoding not supported in this environment.");
    }
}
