import * as core from "../../../../../../core";
import * as Hume from "../../../../../index";
import * as serializers from "../../../../../../serialization/index";
import { MaybeValid } from "core/schemas/Schema";

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
    public async sendAudioInput(message: Omit<Hume.empathicVoice.AudioInput, "type">): Promise<void> {
        await this.sendJson({
            type: "audio_input",
            ...message,
        });
    }

    /**
     * Send session settings
     */
    public async sendSessionSettings(message: Omit<Hume.empathicVoice.SessionSettings, "type">): Promise<void> {
        await this.sendJson({
            type: "session_settings",
            ...message,
        });
    }

    /**
     * Send assistant input
     */
    public async sendAssistantInput(message: Omit<Hume.empathicVoice.AssistantInput, "type">): Promise<void> {
        await this.sendJson({
            type: "assistant_input",
            ...message,
        });
    }

    /**
     * Send pause assistant message
     */
    public async pauseAssistant(message: Omit<Hume.empathicVoice.PauseAssistantMessage, "type">): Promise<void> {
        await this.sendJson({
            type: "pause_assistant_message",
            ...message,
        });
    }

    /**
     * Send resume assistant message
     */
    public async resumeAssistant(message: Omit<Hume.empathicVoice.ResumeAssistantMessage, "type">): Promise<void> {
        await this.sendJson({
            type: "resume_assistant_message",
            ...message,
        });
    }

    /**
     * Send tool response message
     */
    public async sendToolResponseMessage(message: Omit<Hume.empathicVoice.ToolResponseMessage, "type">): Promise<void> {
        await this.sendJson({
            type: "tool_response",
            ...message,
        });
    }

    /**
     * Send tool error message
     */
    public async sendToolErrorMessage(message: Omit<Hume.empathicVoice.ToolErrorMessage, "type">): Promise<void> {
        await this.sendJson({
            type: "tool_error",
            ...message,
        });
    }

    /**
     * Send text input
     */
    public async sendUserInput(text: string): Promise<void> {
        await this.sendJson({
            type: "user_input",
            text,
        });
    }

    /**
     * Closes the underlying socket.
     */
    public close(): void {
        this.socket.close();

        this.socket.removeEventListener('open', this.handleOpen);
        this.socket.removeEventListener('message', this.handleMessage);
        this.socket.removeEventListener('close', this.handleClose);
        this.socket.removeEventListener('error', this.handleError);
    }

    private async sendJson(payload: Hume.empathicVoice.PublishEvent): Promise<void> {
        const jsonPayload = await serializers.empathicVoice.PublishEvent.jsonOrThrow(payload, {
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
        }) as MaybeValid<Hume.empathicVoice.SubscribeEvent>;
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
        const message = event.message ?? 'WebSocket error';
        this.eventHandlers.error?.(new Error(message));
    };
}
