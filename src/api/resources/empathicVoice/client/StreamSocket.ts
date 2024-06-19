import * as Hume from "../../../../api";
import * as serializers from "../../../../serialization";

export declare namespace StreamSocket {
    interface Args {
        websocket: any;
    }
}

export class StreamSocket {
    public readonly websocket: any;

    constructor({ websocket }: StreamSocket.Args) {
        this.websocket = websocket;
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
    public async sendTextInput(text: string): Promise<void> {
        await this.sendJson({
            type: "user_input",
            text,
        });
    }

    /**
     * Closes the underlying socket.
     */
    public close(): void {
        this.websocket.close();
    }

    private async sendJson(payload: Hume.empathicVoice.PublishEvent): Promise<void> {
        await this.tillSocketOpen();
        const jsonPayload = await serializers.empathicVoice.PublishEvent.jsonOrThrow(payload, {
            unrecognizedObjectKeys: "strip",
        });
        this.websocket.send(JSON.stringify(jsonPayload));
    }

    private async tillSocketOpen(): Promise<WebSocket> {
        if (this.websocket.readyState === 1) {
            return this.websocket;
        }
        return new Promise((resolve, reject) => {
            this.websocket.addEventListener("open", () => {
                resolve(this.websocket);
            });

            this.websocket.addEventListener("error", (event: any) => {
                reject(event);
            });
        });
    }
}
