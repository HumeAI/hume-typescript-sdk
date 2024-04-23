import WebSocket from "ws";
import * as Hume from "../../../api";
import * as serializers from "../../../serialization";

export declare namespace StreamSocket {
    interface Args {
        websocket: WebSocket;
    }
}

export class StreamSocket {
    public readonly websocket: WebSocket;

    constructor({ websocket }: StreamSocket.Args) {
        this.websocket = websocket;
    }

    /**
     * Send audio input
     **/
    public async sendAudioInput(message: Hume.empathicVoice.AudioInput): Promise<void> {
        await this.send(message);
    }

    /**
     * Send session settings
     */
    public async sendSessionSettings(message: Hume.empathicVoice.SessionSettings): Promise<void> {
        await this.send(message);
    }

    /**
     * Send text input
     */
    public async sendTextInput(text: string): Promise<void> {
        await this.send({
            type: "user_input",
            text,
        });
    }

    /**
     *
     * Send TTS input
     *
     */
    public async sendTtsInput(message: Hume.empathicVoice.TtsInput): Promise<void> {
        await this.send(message);
    }

    /**
     * Closes the underlying socket.
     */
    public close(): void {
        this.websocket.close();
    }

    private async send(payload: Hume.empathicVoice.PublishEvent): Promise<void> {
        await this.tillSocketOpen();
        const jsonPayload = await serializers.expressionMeasurement.StreamData.jsonOrThrow(payload, {
            unrecognizedObjectKeys: "strip",
        });
        this.websocket.send(JSON.stringify(jsonPayload));
    }

    private async tillSocketOpen(): Promise<WebSocket> {
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
    }
}
