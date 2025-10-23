/** THIS FILE IS MANUALLY MAINTAINED: see .fernignore */

import * as core from "../../../../../../core/index.js";
import * as Hume from "../../../../../index.js";
import { PublishEvent } from "../../../../../../serialization/resources/empathicVoice/resources/chat/types/PublishEvent.js";
import { fromJson } from "../../../../../../core/json.js";
import * as serializers from "../../../../../../serialization/index.js";

export declare namespace ChatSocket {
    export interface Args {
        socket: core.ReconnectingWebSocket;
    }

    export type Response = Hume.empathicVoice.SubscribeEvent & { receivedAt: Date };
    type EventHandlers = {
        open?: () => void;
        message?: (message: Response) => void;
        close?: (event: core.CloseEvent) => void;
        error?: (error: Error) => void;
    };
}

export class ChatSocket {
    public readonly socket: core.ReconnectingWebSocket;
    protected readonly eventHandlers: ChatSocket.EventHandlers = {};
    private handleOpen: () => void = () => {
        this.eventHandlers.open?.();
    };
    private handleMessage: (event: { data: string }) => void = (event) => {
        const data = fromJson(event.data);

        const parsedResponse = serializers.empathicVoice.ChatSocketResponse.parse(data, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            omitUndefined: true,
        });
        if (parsedResponse.ok) {
            this.eventHandlers.message?.({
                ...parsedResponse.value,
                receivedAt: new Date(),
            });
        } else {
            this.eventHandlers.error?.(new Error("Received unknown message type"));
        }
    };
    private handleClose: (event: core.CloseEvent) => void = (event) => {
        this.eventHandlers.close?.(event);
    };
    private handleError: (event: core.ErrorEvent) => void = (event) => {
        const message = event.message;
        this.eventHandlers.error?.(new Error(message));
    };

    constructor(args: ChatSocket.Args) {
        this.socket = args.socket;
        this.socket.addEventListener("open", this.handleOpen);
        this.socket.addEventListener("message", this.handleMessage);
        this.socket.addEventListener("close", this.handleClose);
        this.socket.addEventListener("error", this.handleError);
    }

    /** The current state of the connection; this is one of the readyState constants. */
    get readyState(): number {
        return this.socket.readyState;
    }

    /**
     * @param event - The event to attach to.
     * @param callback - The callback to run when the event is triggered.
     * Usage:
     * ```typescript
     * this.on('open', () => {
     *     console.log('The websocket is open');
     * });
     * ```
     */
    public on<T extends keyof ChatSocket.EventHandlers>(event: T, callback: ChatSocket.EventHandlers[T]) {
        this.eventHandlers[event] = callback;
    }

    public sendPublish(message: Hume.empathicVoice.PublishEvent): void {
        this.assertSocketIsOpen();
        const jsonPayload = PublishEvent.jsonOrThrow(message, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            skipValidation: true,
            omitUndefined: true,
        });
        this.socket.send(JSON.stringify(jsonPayload));
    }

    /**
     * Send audio input
     */
    public sendAudioInput(message: Omit<Hume.empathicVoice.AudioInput, "type">): void {
        this.sendPublish({
            type: "audio_input",
            ...message,
        });
    }

    /**
     * Send session settings
     */
    public sendSessionSettings(message: Omit<Hume.empathicVoice.SessionSettings, "type"> = {}): void {
        this.sendPublish({
            type: "session_settings",
            ...message,
        });
    }

    /**
     * Send assistant input
     */
    public sendAssistantInput(message: Omit<Hume.empathicVoice.AssistantInput, "type">): void {
        this.sendPublish({
            type: "assistant_input",
            ...message,
        });
    }

    /**
     * Send pause assistant message
     */
    public pauseAssistant(message: Omit<Hume.empathicVoice.PauseAssistantMessage, "type"> = {}): void {
        this.sendPublish({
            type: "pause_assistant_message",
            ...message,
        });
    }

    /**
     * Send resume assistant message
     */
    public resumeAssistant(message: Omit<Hume.empathicVoice.ResumeAssistantMessage, "type"> = {}): void {
        this.sendPublish({
            type: "resume_assistant_message",
            ...message,
        });
    }

    /**
     * Send tool response message
     */
    public sendToolResponseMessage(message: Omit<Hume.empathicVoice.ToolResponseMessage, "type">): void {
        this.sendPublish({
            type: "tool_response",
            ...message,
        });
    }

    /**
     * Send tool error message
     */
    public sendToolErrorMessage(message: Omit<Hume.empathicVoice.ToolErrorMessage, "type">): void {
        this.sendPublish({
            type: "tool_error",
            ...message,
        });
    }

    /**
     * Send text input
     */
    public sendUserInput(text: string): void {
        this.sendPublish({
            type: "user_input",
            text,
        });
    }

    /** Connect to the websocket and register event handlers. */
    public connect(): ChatSocket {
        this.socket.reconnect();

        this.socket.addEventListener("open", this.handleOpen);
        this.socket.addEventListener("message", this.handleMessage);
        this.socket.addEventListener("close", this.handleClose);
        this.socket.addEventListener("error", this.handleError);

        return this;
    }

    /** Close the websocket and unregister event handlers. */
    public close(): void {
        this.socket.close();

        this.handleClose({ code: 1000 } as CloseEvent);

        this.socket.removeEventListener("open", this.handleOpen);
        this.socket.removeEventListener("message", this.handleMessage);
        this.socket.removeEventListener("close", this.handleClose);
        this.socket.removeEventListener("error", this.handleError);
    }

    /** Returns a promise that resolves when the websocket is open. */
    public async waitForOpen(): Promise<core.ReconnectingWebSocket> {
        if (this.socket.readyState === core.ReconnectingWebSocket.OPEN) {
            return this.socket;
        }

        return new Promise((resolve, reject) => {
            this.socket.addEventListener("open", () => {
                resolve(this.socket);
            });

            this.socket.addEventListener("error", (event: unknown) => {
                reject(event);
            });
        });
    }

    /**
     * @deprecated Use waitForOpen() instead
     */
    public async tillSocketOpen(): Promise<core.ReconnectingWebSocket> {
        return this.waitForOpen();
    }

    /** Asserts that the websocket is open. */
    private assertSocketIsOpen(): void {
        if (!this.socket) {
            throw new Error("Socket is not connected.");
        }

        if (this.socket.readyState !== core.ReconnectingWebSocket.OPEN) {
            throw new Error("Socket is not open.");
        }
    }

    /** Send a binary payload to the websocket. */
    protected sendBinary(payload: ArrayBufferLike | Blob | ArrayBufferView): void {
        this.socket.send(payload);
    }
}
