import WebSocket from "ws";
import * as Hume from "../../../api";
import * as fs from "fs";
export declare namespace StreamSocket {
    interface Args {
        websocket: WebSocket;
        config: Hume.expressionMeasurement.stream.Config;
        streamWindowMs?: number;
    }
}
export declare class StreamSocket {
    readonly websocket: WebSocket;
    private readonly streamWindowMs?;
    private config;
    constructor({ websocket, config, streamWindowMs }: StreamSocket.Args);
    /**
     * Send file on the `StreamSocket`
     *
     * @param file A fs.ReadStream | File | Blob
     * @param config This method is intended for use with a `LanguageConfig`.
     * When the socket is configured for other modalities this method will fail.
     */
    sendFile({
        file,
        config,
    }: {
        file: fs.ReadStream | Blob;
        config?: Hume.expressionMeasurement.stream.Config;
    }): Promise<Hume.expressionMeasurement.stream.Config | Hume.expressionMeasurement.stream.StreamErrorMessage>;
    /**
     * Send text on the `StreamSocket`
     *
     * @param text Text to send to the language model.
     * @param config This method is intended for use with a `LanguageConfig`.
     * When the socket is configured for other modalities this method will fail.
     */
    sendText({
        text,
        config,
    }: {
        text: string;
        config?: Hume.expressionMeasurement.stream.Config;
    }): Promise<Hume.expressionMeasurement.stream.Config | Hume.expressionMeasurement.stream.StreamErrorMessage>;
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
    sendFacemesh({
        landmarks,
        config,
    }: {
        landmarks: number[][][];
        config?: Hume.expressionMeasurement.stream.Config;
    }): Promise<Hume.expressionMeasurement.stream.Config | Hume.expressionMeasurement.stream.StreamErrorMessage>;
    /**
     *
     * Reset the streaming sliding window.
     *
     * Call this method when some media has been fully processed and you want to continue using the same
     * streaming connection without leaking context across media samples.
     */
    reset(): Promise<void>;
    /**
     *
     * Get details associated with the current streaming connection.
     *
     */
    getJobDetails(): Promise<void>;
    /**
     * Closes the underlying socket.
     */
    close(): void;
    private send;
    private tillSocketOpen;
}
