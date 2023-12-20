import WebSocket from "ws";
import * as Hume from "../api";
import { v4 as uuid } from "uuid";
import { parse } from "./HumeStreamingClient";
import * as serializers from "../serialization";
import { base64Encode } from "./base64Encode";
import * as errors from "../errors";

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
     * Send text on the `StreamSocket`
     *
     * @param text Text to send to the language model.
     * @param config This method is intended for use with a `LanguageConfig`.
     * When the socket is configured for other modalities this method will fail.
     */
    public async sendText({ text, config }: { text: string; config?: Hume.ModelConfig }): Promise<Hume.ModelResponse> {
        if (config != null) {
            this.config = config;
        }
        const request: Hume.ModelsInput = {
            payloadId: uuid(),
            data: text,
            rawText: true,
            models: this.config,
        };
        if (this.streamWindowMs != null) {
            request.streamWindowMs = this.streamWindowMs;
        }
        const response = await this.send(request);
        if (response == null) {
            throw new errors.HumeError({ message: `Received no response after sending text: ${text}` });
        }
        return response;
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
    public async sendFacemesh({
        landmarks,
        config,
    }: {
        landmarks: number[][][];
        config?: Hume.ModelConfig;
    }): Promise<Hume.ModelResponse> {
        const response = this.sendText({
            text: base64Encode(JSON.stringify(landmarks)),
            config,
        });
        return response;
    }

    /**
     *
     * Reset the streaming sliding window.
     *
     * Call this method when some media has been fully processed and you want to continue using the same
     * streaming connection without leaking context across media samples.
     */
    public async reset(): Promise<void> {
        await this.send({
            resetStream: true,
        });
    }

    /**
     *
     * Get details associated with the current streaming connection.
     *
     */
    public async getJobDetails(): Promise<void> {
        await this.send({
            jobDetails: true,
        });
    }

    /**
     * Closes the underlying socket.
     */
    public close(): void {
        this.websocket.close();
    }

    private async send(payload: Hume.ModelsInput): Promise<Hume.ModelResponse | void> {
        await this.tillSocketOpen();
        const jsonPayload = await serializers.ModelsInput.jsonOrThrow(payload, {
            unrecognizedObjectKeys: "strip",
        });
        console.log("payload: ", JSON.stringify(jsonPayload));
        this.websocket.send(JSON.stringify(jsonPayload));
        const response = await new Promise<Hume.ModelResponse | Hume.ModelsWarning | Hume.ModelsError | undefined>(
            (resolve, reject) => {
                this.websocket.addEventListener("message", (event) => {
                    const response = parse(event.data);
                    resolve(response);
                });
            }
        );
        console.log(response);
        if (response != null && isError(response)) {
            throw new errors.HumeError({ message: `CODE ${response.code}: ${response.error}` });
        }
        if (response != null && isWarning(response)) {
            throw new errors.HumeError({ message: `CODE ${response.code}: ${response.warning}` });
        }
        return response;
    }

    private tillSocketOpen(): Promise<WebSocket> {
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

function isError(response: Hume.ModelResponse | Hume.ModelsWarning | Hume.ModelsError): response is Hume.ModelsError {
    return (response as Hume.ModelsError).error != null;
}

function isWarning(
    response: Hume.ModelResponse | Hume.ModelsWarning | Hume.ModelsError
): response is Hume.ModelsWarning {
    return (response as Hume.ModelsWarning).warning != null;
}
