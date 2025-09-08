/** THIS FILE IS MANUALLY MAINAINED: see .fernignore */
import * as core from "../../../../../../core";
import * as Hume from "../../../../../index";
export declare namespace ChatSocket {
    interface Args {
        socket: core.ReconnectingWebSocket;
    }
    type Response = Hume.empathicVoice.SubscribeEvent & {
        receivedAt: Date;
    };
    type EventHandlers = {
        open?: () => void;
        message?: (message: Response) => void;
        close?: (event: core.CloseEvent) => void;
        error?: (error: Error) => void;
    };
}
export declare class ChatSocket {
    readonly socket: core.ReconnectingWebSocket;
    protected readonly eventHandlers: ChatSocket.EventHandlers;
    constructor({ socket }: ChatSocket.Args);
    /**
     * The current state of the connection; this is one of the Ready state constants
     */
    get readyState(): number;
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
    on<T extends keyof ChatSocket.EventHandlers>(event: T, callback: ChatSocket.EventHandlers[T]): void;
    /**
     * Send audio input
     */
    sendAudioInput(message: Omit<Hume.empathicVoice.AudioInput, "type">): void;
    /**
     * Send session settings
     */
    sendSessionSettings(message?: Omit<Hume.empathicVoice.SessionSettings, "type">): void;
    /**
     * Send assistant input
     */
    sendAssistantInput(message: Omit<Hume.empathicVoice.AssistantInput, "type">): void;
    /**
     * Send pause assistant message
     */
    pauseAssistant(message?: Omit<Hume.empathicVoice.PauseAssistantMessage, "type">): void;
    /**
     * Send resume assistant message
     */
    resumeAssistant(message?: Omit<Hume.empathicVoice.ResumeAssistantMessage, "type">): void;
    /**
     * Send tool response message
     */
    sendToolResponseMessage(message: Omit<Hume.empathicVoice.ToolResponseMessage, "type">): void;
    /**
     * Send tool error message
     */
    sendToolErrorMessage(message: Omit<Hume.empathicVoice.ToolErrorMessage, "type">): void;
    /**
     * Send text input
     */
    sendUserInput(text: string): void;
    /**
     * @name connect
     * @description
     * Connect to the core.ReconnectingWebSocket.
     */
    connect(): ChatSocket;
    /**
     * Closes the underlying socket.
     */
    close(): void;
    tillSocketOpen(): Promise<core.ReconnectingWebSocket>;
    private assertSocketIsOpen;
    private sendJson;
    private handleOpen;
    private handleMessage;
    private handleClose;
    private handleError;
}
