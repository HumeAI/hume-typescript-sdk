/**
 * @name checkForAudioTracks
 * @description
 * Check if a MediaStream has audio tracks.
 * @param stream
 * The MediaStream to check
 */
export const checkForAudioTracks = (stream: MediaStream) => {
  const tracks = stream.getAudioTracks();

  if (tracks.length === 0) {
    throw new Error('No audio tracks');
  }
  if (tracks.length > 1) {
    throw new Error('Multiple audio tracks');
  }
  const track = tracks[0];
  if (!track) {
    throw new Error('No audio track');
  }
};
