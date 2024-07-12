import * as core from "../../../../../../core";
import * as errors from "../../../../../../errors";
import * as Hume from "../../../../../index";
import * as serializers from "../../../../../../serialization/index";

export declare namespace ChatSocket {
    interface Args {
        socket: core.ReconnectingWebSocket;
    }

    type Response = Hume.empathicVoice.SubscribeEvent & { receivedAt: number };

    type EventHandlers = {
        open?: () => void;
        message?: (message: Response) => void;
        close?: (event: core.CloseEvent) => void;
        error?: (error: Error) => void;
    };
}

export class ChatSocket{
    public readonly socket: core.ReconnectingWebSocket;
    public readonly readyState: number;

    protected readonly eventHandlers: ChatSocket.EventHandlers = {};

    constructor({ socket }: ChatSocket.Args) {
        this.socket = socket;
        this.readyState = socket.readyState;

        this.socket.addEventListener('open', this.handleOpen);
        this.socket.addEventListener('message', this.handleMessage);
        this.socket.addEventListener('close', this.handleClose);
        this.socket.addEventListener('error', this.handleError);
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
    on<T extends keyof ChatSocket.EventHandlers>(event: T, callback: ChatSocket.EventHandlers[T]) {
        this.eventHandlers[event] = callback;
    }

    /**
     * Send audio input
     */
    public sendAudioInput(message: Omit<Hume.empathicVoice.AudioInput, "type">): void {
        this.assertSocketIsOpen();
        this.sendJson({
            type: "audio_input",
            ...message,
        });
    }

    /**
     * Send session settings
     */
    public sendSessionSettings(message: Omit<Hume.empathicVoice.SessionSettings, "type">): void {
        this.assertSocketIsOpen();
        this.sendJson({
            type: "session_settings",
            ...message,
        });
    }

    /**
     * Send assistant input
     */
    public sendAssistantInput(message: Omit<Hume.empathicVoice.AssistantInput, "type">): void {
        this.assertSocketIsOpen();
        this.sendJson({
            type: "assistant_input",
            ...message,
        });
    }

    /**
     * Send pause assistant message
     */
    public pauseAssistant(message: Omit<Hume.empathicVoice.PauseAssistantMessage, "type">): void {
        this.assertSocketIsOpen();
        this.sendJson({
            type: "pause_assistant_message",
            ...message,
        });
    }

    /**
     * Send resume assistant message
     */
    public resumeAssistant(message: Omit<Hume.empathicVoice.ResumeAssistantMessage, "type">): void {
        this.assertSocketIsOpen();
        this.sendJson({
            type: "resume_assistant_message",
            ...message,
        });
    }

    /**
     * Send tool response message
     */
    public sendToolResponseMessage(message: Omit<Hume.empathicVoice.ToolResponseMessage, "type">): void {
        this.assertSocketIsOpen();
        this.sendJson({
            type: "tool_response",
            ...message,
        });
    }

    /**
     * Send tool error message
     */
    public sendToolErrorMessage(message: Omit<Hume.empathicVoice.ToolErrorMessage, "type">): void {
        this.assertSocketIsOpen();
        this.sendJson({
            type: "tool_error",
            ...message,
        });
    }

    /**
     * Send text input
     */
    public sendUserInput(text: string): void {
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
    public connect(): ChatSocket {
        this.socket.reconnect();

        this.socket.addEventListener('open', this.handleOpen);
        this.socket.addEventListener('message', this.handleMessage);
        this.socket.addEventListener('close', this.handleClose);
        this.socket.addEventListener('error', this.handleError);

        return this;
    }

    /**
     * Closes the underlying socket.
     */
    public close(): void {
        this.socket.close();

        this.handleClose({ code: 1000 } as CloseEvent);

        this.socket.removeEventListener('open', this.handleOpen);
        this.socket.removeEventListener('message', this.handleMessage);
        this.socket.removeEventListener('close', this.handleClose);
        this.socket.removeEventListener('error', this.handleError);
    }

    public async tillSocketOpen(): Promise<core.ReconnectingWebSocket> {
        if (this.socket.readyState === core.ReconnectingWebSocket.OPEN) {
            return this.socket;
        }
        return new Promise((resolve, reject) => {
            this.socket.addEventListener("open", () => {
                resolve(this.socket);
            });

            this.socket.addEventListener("error", (event: any) => {
                reject(event);
            });
        });
    }

    private assertSocketIsOpen(): void {
        if (!this.socket) {
            throw new errors.HumeError({ message: 'Socket is not connected.'});
        }
      
        if (this.socket.readyState !== core.ReconnectingWebSocket.OPEN) {
            throw new errors.HumeError({ message: 'Socket is not open.' });
        }
    }

    private sendJson(payload: Hume.empathicVoice.PublishEvent): void {
        const jsonPayload = serializers.empathicVoice.PublishEvent.jsonOrThrow(payload, {
            unrecognizedObjectKeys: "strip",
        });
        this.socket.send(JSON.stringify(jsonPayload));
    }

    private handleOpen = () => {
        this.eventHandlers.open?.();
    };

    private handleMessage = (event: { data: any}): void => {
        const data = JSON.parse(event.data);

        const parsedResponse = serializers.empathicVoice.SubscribeEvent.parse(data, {
            unrecognizedObjectKeys: "passthrough",
            allowUnrecognizedUnionMembers: true,
            allowUnrecognizedEnumValues: true,
            breadcrumbsPrefix: ["response"],
        });
        if (parsedResponse.ok) {
            this.eventHandlers.message?.({ ...parsedResponse.value, receivedAt: Date.now() });
        } else {
            this.eventHandlers.error?.(new Error(`Received unknown message type`));
        }
    };

    private handleClose = (event: core.CloseEvent) => {
        this.eventHandlers.close?.(event);
    };

    private handleError = (event: core.ErrorEvent) => {
        const message = event.message ?? 'core.ReconnectingWebSocket error';
        this.eventHandlers.error?.(new Error(message));
    };
}