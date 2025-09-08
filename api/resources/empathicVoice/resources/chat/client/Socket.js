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
/** THIS FILE IS MANUALLY MAINAINED: see .fernignore */
import * as core from "../../../../../../core";
import * as errors from "../../../../../../errors";
import * as serializers from "../../../../../../serialization/index";
export class ChatSocket {
    constructor({ socket }) {
        this.eventHandlers = {};
        this.handleOpen = () => {
            var _a, _b;
            (_b = (_a = this.eventHandlers).open) === null || _b === void 0 ? void 0 : _b.call(_a);
        };
        this.handleMessage = (event) => {
            var _a, _b;
            const data = JSON.parse(event.data);
            const parsedResponse = serializers.empathicVoice.SubscribeEvent.parse(data, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                breadcrumbsPrefix: ["response"],
            });
            if (parsedResponse.ok) {
                (_b = (_a = this.eventHandlers).message) === null || _b === void 0
                    ? void 0
                    : _b.call(_a, Object.assign(Object.assign({}, parsedResponse.value), { receivedAt: new Date() }));
            }
        };
        this.handleClose = (event) => {
            var _a, _b;
            (_b = (_a = this.eventHandlers).close) === null || _b === void 0 ? void 0 : _b.call(_a, event);
        };
        this.handleError = (event) => {
            var _a, _b;
            // Create and dispatch a new Error object using the message from the standardized event.
            (_b = (_a = this.eventHandlers).error) === null || _b === void 0
                ? void 0
                : _b.call(_a, new Error(event.message));
        };
        this.socket = socket;
        this.socket.addEventListener("open", this.handleOpen);
        this.socket.addEventListener("message", this.handleMessage);
        this.socket.addEventListener("close", this.handleClose);
        this.socket.addEventListener("error", this.handleError);
    }
    /**
     * The current state of the connection; this is one of the Ready state constants
     */
    get readyState() {
        return this.socket.readyState;
    }
    /**
     * @param event - The event to attach to.
     * @param callback - The callback to run when the event is triggered.
     *
     * @example
     * ```ts
     * const socket = hume.empathicVoice.chat.connect({ apiKey: "...." });
     * socket.on('open', () => {
     *  console.log('Socket opened');
     * });
     * ```
     */
    on(event, callback) {
        this.eventHandlers[event] = callback;
    }
    /**
     * Send audio input
     */
    sendAudioInput(message) {
        this.assertSocketIsOpen();
        this.sendJson(Object.assign({ type: "audio_input" }, message));
    }
    /**
     * Send session settings
     */
    sendSessionSettings(message = {}) {
        this.assertSocketIsOpen();
        this.sendJson(Object.assign({ type: "session_settings" }, message));
    }
    /**
     * Send assistant input
     */
    sendAssistantInput(message) {
        this.assertSocketIsOpen();
        this.sendJson(Object.assign({ type: "assistant_input" }, message));
    }
    /**
     * Send pause assistant message
     */
    pauseAssistant(message = {}) {
        this.assertSocketIsOpen();
        this.sendJson(Object.assign({ type: "pause_assistant_message" }, message));
    }
    /**
     * Send resume assistant message
     */
    resumeAssistant(message = {}) {
        this.assertSocketIsOpen();
        this.sendJson(Object.assign({ type: "resume_assistant_message" }, message));
    }
    /**
     * Send tool response message
     */
    sendToolResponseMessage(message) {
        this.assertSocketIsOpen();
        this.sendJson(Object.assign({ type: "tool_response" }, message));
    }
    /**
     * Send tool error message
     */
    sendToolErrorMessage(message) {
        this.assertSocketIsOpen();
        this.sendJson(Object.assign({ type: "tool_error" }, message));
    }
    /**
     * Send text input
     */
    sendUserInput(text) {
        this.assertSocketIsOpen();
        this.sendJson({
            type: "user_input",
            text,
        });
    }
    /**
     * @name connect
     * @description
     * Connect to the core.ReconnectingWebSocket.
     */
    connect() {
        this.socket.reconnect();
        this.socket.addEventListener("open", this.handleOpen);
        this.socket.addEventListener("message", this.handleMessage);
        this.socket.addEventListener("close", this.handleClose);
        this.socket.addEventListener("error", this.handleError);
        return this;
    }
    /**
     * Closes the underlying socket.
     */
    close() {
        this.socket.close();
        this.handleClose({ code: 1000 });
        this.socket.removeEventListener("open", this.handleOpen);
        this.socket.removeEventListener("message", this.handleMessage);
        this.socket.removeEventListener("close", this.handleClose);
        this.socket.removeEventListener("error", this.handleError);
    }
    tillSocketOpen() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.socket.readyState === core.ReconnectingWebSocket.OPEN) {
                return this.socket;
            }
            return new Promise((resolve, reject) => {
                this.socket.addEventListener("open", () => {
                    resolve(this.socket);
                });
                this.socket.addEventListener("error", (event) => {
                    reject(event);
                });
            });
        });
    }
    assertSocketIsOpen() {
        if (!this.socket) {
            throw new errors.HumeError({ message: "Socket is not connected." });
        }
        if (this.socket.readyState !== core.ReconnectingWebSocket.OPEN) {
            throw new errors.HumeError({ message: "Socket is not open." });
        }
    }
    sendJson(payload) {
        const jsonPayload = serializers.empathicVoice.PublishEvent.jsonOrThrow(payload, {
            unrecognizedObjectKeys: "strip",
        });
        this.socket.send(JSON.stringify(jsonPayload));
    }
}
