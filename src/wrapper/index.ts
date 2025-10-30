export { base64Decode } from "./base64Decode.js";
export { base64Encode } from "./base64Encode.js";
export { convertBase64ToBlob } from "./convertBase64ToBlob.js";
export { convertBlobToBase64 } from "./convertBlobToBase64.js";
export { ensureSingleValidAudioTrack } from "./ensureSingleValidAudioTrack.js";
export { checkForAudioTracks } from "./checkForAudioTracks.js";
export { fetchAccessToken } from "./fetchAccessToken.js";
export { getAudioStream } from "./getAudioStream.js";
export { MimeType, getBrowserSupportedMimeType } from "./getBrowserSupportedMimeType.js";
export { HumeClient } from "./HumeClient.js";
export { ExpressionMeasurement } from "./expressionMeasurement/ExpressionMeasurementClient.js";
export { EVIWebAudioPlayer } from "./EVIWebAudioPlayer.js";
export type { EVIWebAudioPlayerFFTOptions, EVIWebAudioPlayerOptions } from "./EVIWebAudioPlayer.js";
export { collate } from "./collate.js";

// SilenceFiller extends from Node.JS Readable -- this should not be exported in non-nodeJS environments. Otherwise the bundle will crash in the browser.
export const createSilenceFiller = async (): Promise<typeof import("./SilenceFiller.js").SilenceFiller> => {
    if (typeof process === "undefined" || !process.versions?.node) {
        throw new Error("SilenceFiller is only available in Node.js environments");
    }
    const { SilenceFiller } = await import("./SilenceFiller.js");
    return SilenceFiller;
};
