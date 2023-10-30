import * as Hume from "../api";
import * as core from "../core";
import { StreamSocket } from "./StreamSocket";
import * as serializers from "../serialization";

export declare namespace HumeStreamingClient {
    interface Options {
        apiKey: core.Supplier<string>;
    }
}

export interface HumeEventListeners {
    message?: (response: Hume.ModelResponse) => void;
    close?: ({ code, reason }: { code: number; reason: string }) => void;
}

export class HumeStreamingClient {
    constructor(protected readonly _options: HumeStreamingClient.Options) {}

    public async connect({
        configs,
        streamWindowMs,
        listeners,
    }: {
        configs: Hume.ModelConfig;
        streamWindowMs?: number;
        listeners?: HumeEventListeners;
    }): Promise<StreamSocket> {
        const socket = new WebSocket(`wss://api.hume.ai/v0/stream/models`);
        socket.onmessage = async ({ data }) => {
            const response = await serializers.ModelResponse.parseOrThrow(data, {
                unrecognizedObjectKeys: "passthrough",
            });
            listeners?.message?.(response);
        };
        socket.onclose = ({ code, reason }) => {
            listeners?.close?.({ code, reason });
        };
        return new StreamSocket(socket, streamWindowMs);
    }
}
