import WebSocket from "ws";
import * as Hume from "../api";
import { readFile } from "fs/promises";

export declare namespace StreamSocket {
    interface Args {
        websocket: WebSocket;
        config: Hume.ModelConfig;
        streamWindowMs?: number;
    }
}

export class StreamSocket {
    readonly websocket: WebSocket;
    private readonly streamWindowMs?: number;
    private config: Hume.ModelConfig;

    constructor({ websocket, config, streamWindowMs }: StreamSocket.Args) {
        this.websocket = websocket;
        this.config = config;
        this.streamWindowMs = streamWindowMs;
    }

    /**
     * Send a file on the `StreamSocket`
     *
     * @param filepath Path to media file to send on socket connection
     * @param config List of model configurations.
     * If set these configurations will overwrite any configurations
     * set when initializing the `StreamSocket`
     */
    public async sendFile({
        filepath,
        config,
    }: {
        filepath: string;
        config?: Hume.ModelConfig;
    }): Promise<void> {
        this.sendBuffer({
            buffer: await readFile(filepath),
            config,
        });
    }

    /**
     * Send raw bytes on the `StreamSocket`
     *
     * @param buffer Raw bytes of media to send on socket connection
     * @param config List of model configurations.
     * If set these configurations will overwrite any configurations
     * set when initializing the `StreamSocket`
     */
    public sendBuffer({
        buffer,
        config,
    }: {
        buffer: Buffer;
        config?: Hume.ModelConfig;
    }): void {
        this.sendText({
            text: buffer.toString("base64"),
            config,
        });
    }

    /**
     * Send text on the `StreamSocket`
     *
     * @param text Text to send to the language model.
     * @param config This method is intended for use with a `LanguageConfig`.
     * When the socket is configured for other modalities this method will fail.
     */
    public sendText({
        text,
        config,
    }: {
        text: string;
        config?: Hume.ModelConfig;
    }): void {
        if (config != null) {
            this.config = config;
        }
        this.websocket.send(
            JSON.stringify({
                data: text,
                raw_text: true,
                models: this.config,
                stream_window_ms: this.streamWindowMs,
            })
        );
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
    public sendFacemesh({
        landmarks,
        config,
    }: {
        landmarks: number[][][];
        config?: Hume.ModelConfig;
    }): void {
        const stringifiedLandmarks = JSON.stringify(landmarks);
        this.sendText({
            text: Buffer.from(stringifiedLandmarks).toString("base64"),
            config,
        });
    }

    /**
     *
     * Reset the streaming sliding window.
     *
     * Call this method when some media has been fully processed and you want to continue using the same
     * streaming connection without leaking context across media samples.
     */
    public reset(): void {
        this.websocket.send(
            JSON.stringify({
                reset_stream: true,
            })
        );
    }

    /**
     *
     * Get details associated with the current streaming connection.
     *
     */
    public getJobDetails(): void {
        this.websocket.send(
            JSON.stringify({
                job_details: true,
            })
        );
    }

    /**
     * Closes the underlying socket.
     */
    public close(): void {
        this.websocket.close();
    }
}
