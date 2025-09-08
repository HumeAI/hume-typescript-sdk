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
import * as serializers from "../../../serialization";
import { StreamSocket } from "./StreamSocket";
import WebSocket from "ws";
export class StreamClient {
    constructor(_options) {
        this._options = _options;
    }
    connect(args) {
        const websocket = new WebSocket(`wss://api.hume.ai/v0/stream/models`, {
            headers: {
                "X-Hume-Api-Key": typeof this._options.apiKey === "string" ? this._options.apiKey : "",
            },
            timeout: 10,
        });
        websocket.addEventListener("open", (event) => {
            var _a;
            (_a = args.onOpen) === null || _a === void 0 ? void 0 : _a.call(args, event);
        });
        websocket.addEventListener("error", (e) => {
            var _a;
            (_a = args.onError) === null || _a === void 0
                ? void 0
                : _a.call(args, {
                      code: e.type,
                      error: e.message,
                  });
        });
        websocket.addEventListener("message", (_a) =>
            __awaiter(this, [_a], void 0, function* ({ data }) {
                parse(data, {
                    onMessage: args.onMessage,
                    onError: args.onError,
                });
            }),
        );
        websocket.addEventListener("close", (event) => {
            var _a;
            (_a = args.onClose) === null || _a === void 0 ? void 0 : _a.call(args, event);
        });
        return new StreamSocket({
            websocket,
            streamWindowMs: args.streamWindowMs,
            config: args.config,
        });
    }
}
export function parse(data, args = {}) {
    var _a, _b;
    const message = JSON.parse(data);
    const parsedResponse = serializers.expressionMeasurement.stream.Config.parse(message, {
        unrecognizedObjectKeys: "passthrough",
        allowUnrecognizedUnionMembers: true,
        allowUnrecognizedEnumValues: true,
        breadcrumbsPrefix: ["response"],
    });
    if (parsedResponse.ok) {
        (_a = args.onMessage) === null || _a === void 0 ? void 0 : _a.call(args, parsedResponse.value);
        return parsedResponse.value;
    }
    const parsedError = serializers.expressionMeasurement.stream.StreamErrorMessage.parse(message, {
        unrecognizedObjectKeys: "passthrough",
        allowUnrecognizedUnionMembers: true,
        allowUnrecognizedEnumValues: true,
        breadcrumbsPrefix: ["response"],
    });
    if (parsedError.ok) {
        (_b = args.onError) === null || _b === void 0 ? void 0 : _b.call(args, parsedError.value);
        return parsedError.value;
    }
}
