export { base64Decode } from "./base64Decode";
export { base64Encode } from "./base64Encode";
export { convertBase64ToBlob } from "./convertBase64ToBlob";
export { convertBlobToBase64 } from "./convertBlobToBase64";
export { ensureSingleValidAudioTrack } from "./ensureSingleValidAudioTrack";
export { checkForAudioTracks } from "./checkForAudioTracks";
export { fetchAccessToken } from "./fetchAccessToken";
export { getAudioStream } from "./getAudioStream";
export { MimeType, getBrowserSupportedMimeType } from "./getBrowserSupportedMimeType";
export { HumeClient } from "./HumeClient";
export { EVIWebAudioPlayer, EVIWebAudioPlayerFFTOptions, EVIWebAudioPlayerOptions } from "./EVIWebAudioPlayer";
export { collate } from "./collate";

// SilenceFiller extends from Node.JS Readable -- this should not be exported in non-nodeJS environments. Otherwise the bundle will crash in the browser.
export const createSilenceFiller = async () => {
  if (typeof process === 'undefined' || !process.versions?.node) {
    throw new Error('SilenceFiller is only available in Node.js environments');
  }
  const { SilenceFiller } = await import('./SilenceFiller');
  return SilenceFiller;
};
