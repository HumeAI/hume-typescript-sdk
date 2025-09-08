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
var __asyncValues =
    (this && this.__asyncValues) ||
    function (o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator],
            i;
        return m
            ? m.call(o)
            : ((o = typeof __values === "function" ? __values(o) : o[Symbol.iterator]()),
              (i = {}),
              verb("next"),
              verb("throw"),
              verb("return"),
              (i[Symbol.asyncIterator] = function () {
                  return this;
              }),
              i);
        function verb(n) {
            i[n] =
                o[n] &&
                function (v) {
                    return new Promise(function (resolve, reject) {
                        ((v = o[n](v)), settle(resolve, reject, v.done, v.value));
                    });
                };
        }
        function settle(resolve, reject, d, v) {
            Promise.resolve(v).then(function (v) {
                resolve({ value: v, done: d });
            }, reject);
        }
    };
import WebSocket from "ws";
import { v4 as uuid } from "uuid";
import { parse } from "./StreamingClient";
import { base64Encode } from "../../base64Encode";
import * as errors from "../../../errors";
import * as serializers from "../../../serialization";
import * as fs from "fs";
export class StreamSocket {
    constructor({ websocket, config, streamWindowMs }) {
        this.websocket = websocket;
        this.config = config;
        this.streamWindowMs = streamWindowMs;
    }
    /**
     * Send file on the `StreamSocket`
     *
     * @param file A fs.ReadStream | File | Blob
     * @param config This method is intended for use with a `LanguageConfig`.
     * When the socket is configured for other modalities this method will fail.
     */
    sendFile(_a) {
        return __awaiter(this, arguments, void 0, function* ({ file, config }) {
            var _b, file_1, file_1_1;
            var _c, e_1, _d, _e;
            if (config != null) {
                this.config = config;
            }
            let contents = "";
            if (file instanceof fs.ReadStream) {
                const chunks = [];
                try {
                    for (
                        _b = true, file_1 = __asyncValues(file);
                        (file_1_1 = yield file_1.next()), (_c = file_1_1.done), !_c;
                        _b = true
                    ) {
                        _e = file_1_1.value;
                        _b = false;
                        const chunk = _e;
                        chunks.push(Buffer.from(chunk));
                    }
                } catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                } finally {
                    try {
                        if (!_b && !_c && (_d = file_1.return)) yield _d.call(file_1);
                    } finally {
                        if (e_1) throw e_1.error;
                    }
                }
                contents = Buffer.concat(chunks).toString("base64");
            } else if (file instanceof Blob) {
                const toBase64 = (file) =>
                    new Promise((res) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => res(reader.result);
                    });
                contents = yield toBase64(file);
            } else {
                throw new errors.HumeError({
                    message: `file must be one of ReadStream or Blob.`,
                });
            }
            const request = {
                payloadId: uuid(),
                data: contents,
                models: this.config,
                rawText: false,
            };
            if (this.streamWindowMs != null) {
                request.streamWindowMs = this.streamWindowMs;
            }
            const response = yield this.send(request);
            if (response == null) {
                throw new errors.HumeError({
                    message: `Received no response after sending file: ${file}`,
                });
            }
            return response;
        });
    }
    /**
     * Send text on the `StreamSocket`
     *
     * @param text Text to send to the language model.
     * @param config This method is intended for use with a `LanguageConfig`.
     * When the socket is configured for other modalities this method will fail.
     */
    sendText(_a) {
        return __awaiter(this, arguments, void 0, function* ({ text, config }) {
            if (config != null) {
                this.config = config;
            }
            const request = {
                payloadId: uuid(),
                data: text,
                rawText: true,
                models: this.config,
            };
            if (this.streamWindowMs != null) {
                request.streamWindowMs = this.streamWindowMs;
            }
            const response = yield this.send(request);
            if (response == null) {
                throw new errors.HumeError({
                    message: `Received no response after sending text: ${text}`,
                });
            }
            return response;
        });
    }
    /**
     * Send facemesh landmarks on the `StreamSocket`
     *
     * @param landmarks List of landmark points for multiple faces.
     * The shape of this 3-dimensional list should be (n, 478, 3) where n is the number
     * of faces to be processed, 478 is the number of MediaPipe landmarks per face and 3
     * represents the (x, y, z) coordinates of each landmark.
     * @param config List of model configurations.
     * If set these configurations will overwrite existing configurations
     */
    sendFacemesh(_a) {
        return __awaiter(this, arguments, void 0, function* ({ landmarks, config }) {
            const response = this.sendText({
                text: base64Encode(JSON.stringify(landmarks)),
                config,
            });
            return response;
        });
    }
    /**
     *
     * Reset the streaming sliding window.
     *
     * Call this method when some media has been fully processed and you want to continue using the same
     * streaming connection without leaking context across media samples.
     */
    reset() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.send({
                resetStream: true,
            });
        });
    }
    /**
     *
     * Get details associated with the current streaming connection.
     *
     */
    getJobDetails() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.send({
                jobDetails: true,
            });
        });
    }
    /**
     * Closes the underlying socket.
     */
    close() {
        this.websocket.close();
    }
    send(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.tillSocketOpen();
            const jsonPayload = serializers.expressionMeasurement.stream.StreamModelsEndpointPayload.jsonOrThrow(
                payload,
                {
                    unrecognizedObjectKeys: "strip",
                },
            );
            this.websocket.send(JSON.stringify(jsonPayload));
            const response = yield new Promise((resolve) => {
                this.websocket.addEventListener("message", (event) => {
                    const response = parse(event.data);
                    resolve(response);
                });
            });
            if (response != null && isError(response)) {
                throw new errors.HumeError({
                    message: `CODE ${response.code}: ${response.error}`,
                });
            }
            return response;
        });
    }
    tillSocketOpen() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.websocket.readyState === WebSocket.OPEN) {
                return this.websocket;
            }
            return new Promise((resolve, reject) => {
                this.websocket.addEventListener("open", () => {
                    resolve(this.websocket);
                });
                this.websocket.addEventListener("error", (event) => {
                    reject(event);
                });
            });
        });
    }
}
function isError(response) {
    return response.error != null;
}
