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
export { SilenceFiller } from "./SilenceFiller.js";
export type { PipeDestination } from "./SilenceFiller.js";

/**
 * @deprecated SilenceFiller no longer requires dynamic import. Use `import { SilenceFiller } from 'hume'` directly.
 */
export const createSilenceFiller = async (): Promise<typeof import("./SilenceFiller.js").SilenceFiller> => {
    const { SilenceFiller } = await import("./SilenceFiller.js");
    return SilenceFiller;
};
