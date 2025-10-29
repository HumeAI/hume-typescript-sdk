import * as Hume from "../../../api/index.js";
import * as serializers from "../../../serialization/index.js";
import * as core from "../../../core/index.js";
import { StreamSocket } from "./StreamSocket.js";
import WebSocket from "ws";

export declare namespace StreamClient {
    interface Options {
        apiKey?: core.Supplier<string | undefined>;
    }

    interface ConnectArgs {
        /* Job config */
        config: Hume.expressionMeasurement.stream.Config;
        /* Length of the sliding window in milliseconds to use when 
            aggregating media across streaming payloads within one WebSocket connection. */
        streamWindowMs?: number;

        onOpen?: (event: WebSocket.Event) => void;
        onMessage?: (message: Hume.expressionMeasurement.stream.Config) => void;
        onError?: (error: Hume.expressionMeasurement.stream.StreamErrorMessage) => void;
        onClose?: (event: WebSocket.Event) => void;
    }
}

export class StreamClient {
    constructor(protected readonly _options: StreamClient.Options) {}

    public connect(args: StreamClient.ConnectArgs): StreamSocket {
        const websocket = new WebSocket(`wss://api.hume.ai/v0/stream/models`, {
            headers: {
                "X-Hume-Api-Key": typeof this._options.apiKey === "string" ? this._options.apiKey : "",
            },
            timeout: 10,
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

export function parse(
    data: WebSocket.Data,
    args: {
        onMessage?: (message: Hume.expressionMeasurement.stream.Config) => void;
        onError?: (error: Hume.expressionMeasurement.stream.StreamErrorMessage) => void;
    } = {},
): Hume.expressionMeasurement.stream.Config | Hume.expressionMeasurement.stream.StreamErrorMessage | undefined {
    const message = JSON.parse(data as string);

    const parsedResponse = serializers.expressionMeasurement.stream.Config.parse(message, {
        unrecognizedObjectKeys: "passthrough",
        allowUnrecognizedUnionMembers: true,
        allowUnrecognizedEnumValues: true,
        breadcrumbsPrefix: ["response"],
    });
    if (parsedResponse.ok) {
        args.onMessage?.(parsedResponse.value);
        return parsedResponse.value;
    }

    const parsedError = serializers.expressionMeasurement.stream.StreamErrorMessage.parse(message, {
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
