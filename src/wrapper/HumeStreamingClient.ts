import * as Hume from "../api";
import * as serializers from "../serialization";
import { StreamSocket } from "./StreamSocket";
import WebSocket from "ws";

export declare namespace HumeStreamingClient {
    interface Options {
        apiKey: string;
        /* Defaults to 10 seconds */
        openTimeoutInSeconds?: number;
    }

    interface ConnectArgs {
        /* Job config */
        config: Hume.ModelConfig;
        /* Length of the sliding window in milliseconds to use when 
            aggregating media across streaming payloads within one WebSocket connection. */
        streamWindowMs?: number;

        onOpen?: (event: WebSocket.Event) => void;
        onMessage?: (message: Hume.ModelResponse) => void;
        onWarning?: (error: Hume.ModelsWarning) => void;
        onError?: (error: Hume.ModelsError) => void;
        onClose?: (event: WebSocket.Event) => void;
    }
}

export class HumeStreamingClient {
    constructor(protected readonly _options: HumeStreamingClient.Options) {}

    public connect(args: HumeStreamingClient.ConnectArgs): StreamSocket {
        const websocket = new WebSocket(`wss://api.hume.ai/v0/stream/models`, {
            headers: {
                "X-Hume-Api-Key": this._options.apiKey,
            },
            timeout: this._options.openTimeoutInSeconds,
        });

        websocket.addEventListener("open", (event) => {
            args.onOpen?.(event);
        });

        websocket.addEventListener("error", (e) => {
            args.onError?.({
                code: e.type,
                error: e.message,
            });
        });

        websocket.addEventListener("message", async ({ data }) => {
            parse(data, {
                onMessage: args.onMessage,
                onWarning: args.onWarning,
                onError: args.onError,
            });
        });

        websocket.addEventListener("close", (event) => {
            args.onClose?.(event);
        });

        return new StreamSocket({
            websocket,
            streamWindowMs: args.streamWindowMs,
            config: args.config,
        });
    }
}

export async function parse(
    data: WebSocket.Data,
    args: {
        onMessage?: (message: Hume.ModelResponse) => void;
        onWarning?: (error: Hume.ModelsWarning) => void;
        onError?: (error: Hume.ModelsError) => void;
    } = {}
): Promise<Hume.ModelResponse | Hume.ModelsWarning | Hume.ModelsError | undefined> {
    const message = JSON.parse(data as string);

    const parsedResponse = await serializers.ModelResponse.parse(message, {
        unrecognizedObjectKeys: "passthrough",
        allowUnrecognizedUnionMembers: true,
        allowUnrecognizedEnumValues: true,
        breadcrumbsPrefix: ["response"],
    });
    if (parsedResponse.ok) {
        args.onMessage?.(parsedResponse.value);
        return parsedResponse.value;
    }

    const parsedWarning = await serializers.ModelsWarning.parse(message, {
        unrecognizedObjectKeys: "passthrough",
        allowUnrecognizedUnionMembers: true,
        allowUnrecognizedEnumValues: true,
        breadcrumbsPrefix: ["response"],
    });
    if (parsedWarning.ok) {
        args.onWarning?.(parsedWarning.value);
        return parsedWarning.value;
    }

    const parsedError = await serializers.ModelsError.parse(message, {
        unrecognizedObjectKeys: "passthrough",
        allowUnrecognizedUnionMembers: true,
        allowUnrecognizedEnumValues: true,
        breadcrumbsPrefix: ["response"],
    });
    if (parsedError.ok) {
        args.onError?.(parsedError.value);
        return parsedError.value;
    }
}
