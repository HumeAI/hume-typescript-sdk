var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
/**
 * Requests an audio stream from the user's device using the `getUserMedia` API.
 * The stream will have echo cancellation, noise suppression, and auto gain control enabled.
 *
 * @returns {Promise<MediaStream>} A promise that resolves to a `MediaStream` containing audio data only.
 * @throws {DOMException} If the user denies access or no audio input devices are found.
 */
export const getAudioStream = (...args_1) =>
    __awaiter(void 0, [...args_1], void 0, function* (audioStreamOptions = {}) {
        const { echoCancellation = true, noiseSuppression = true, autoGainControl = true } = audioStreamOptions;
        return navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation,
                noiseSuppression,
                autoGainControl,
            },
            video: false,
        });
    });
