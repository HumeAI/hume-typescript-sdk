import * as Hume from "../../../api";
import * as core from "../../../core";
import { StreamSocket } from "./StreamSocket";
import WebSocket from "ws";
export declare namespace StreamClient {
    interface Options {
        apiKey?: core.Supplier<string | undefined>;
    }
    interface ConnectArgs {
        config: Hume.expressionMeasurement.stream.Config;
        streamWindowMs?: number;
        onOpen?: (event: WebSocket.Event) => void;
        onMessage?: (message: Hume.expressionMeasurement.stream.Config) => void;
        onError?: (error: Hume.expressionMeasurement.stream.StreamErrorMessage) => void;
        onClose?: (event: WebSocket.Event) => void;
    }
}
export declare class StreamClient {
    protected readonly _options: StreamClient.Options;
    constructor(_options: StreamClient.Options);
    connect(args: StreamClient.ConnectArgs): StreamSocket;
}
export declare function parse(
    data: WebSocket.Data,
    args?: {
        onMessage?: (message: Hume.expressionMeasurement.stream.Config) => void;
        onError?: (error: Hume.expressionMeasurement.stream.StreamErrorMessage) => void;
    },
): Hume.expressionMeasurement.stream.Config | Hume.expressionMeasurement.stream.StreamErrorMessage | undefined;
