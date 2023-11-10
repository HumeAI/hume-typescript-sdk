import * as Hume from "../api";
import * as core from "../core";
import * as serializers from "../serialization";
import { StreamSocket } from "./StreamSocket";
import WebSocket from "ws";

export declare namespace HumeStreamingClient {
    interface Options {
        apiKey: core.Supplier<string>;
        /* Defaults to 10 seconds */
        openTimeoutInSeconds?: number;
    }

    interface ConnectArgs {
        /* Job config */
        config: Hume.ModelConfig;
        /* Length of the sliding window in milliseconds to use when 
            aggregating media across streaming payloads within one WebSocket connection. */
        streamWindowMs?: number;

        onOpen?: () => void;
        onMessage?: (message: Hume.ModelResponse) => void;
        onWarning?: (error: Hume.ModelsWarning) => void;
        onError?: (error: Hume.ModelsError) => void;
        onClose?: () => void;
    }
}

export class HumeStreamingClient {
    constructor(protected readonly _options: HumeStreamingClient.Options) {}

    public async connect(
        args: HumeStreamingClient.ConnectArgs
    ): Promise<StreamSocket> {
        const websocket = new WebSocket(`wss://api.hume.ai/v0/stream/models`, {
            headers: {
                "X-Hume-Api-Key": await core.Supplier.get(this._options.apiKey),
            },
            timeout: this._options.openTimeoutInSeconds,
        });
        websocket.addEventListener("open", () => {
            args.onOpen?.();
        });
        websocket.addEventListener("error", (e) => {
            args.onError?.({
                code: e.type,
                error: e.message,
            });
        });
        websocket.addEventListener("message", async ({ data }) => {
            const body = JSON.parse(data as string);

            const parsedResponse = await serializers.ModelResponse.parse(body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                breadcrumbsPrefix: ["response"],
            });
            if (parsedResponse.ok) {
                args.onMessage?.(parsedResponse.value);
                return;
            }

            const parsedWarning = await serializers.ModelsWarning.parse(body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                breadcrumbsPrefix: ["response"],
            });
            if (parsedWarning.ok) {
                args.onWarning?.(parsedWarning.value);
                return;
            }

            const parsedError = await serializers.ModelsError.parse(body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                breadcrumbsPrefix: ["response"],
            });
            if (parsedError.ok) {
                args.onError?.(parsedError.value);
                return;
            }
        });
        websocket.addEventListener("close", () => {
            args.onClose?.();
        });

        return new Promise((resolve) => {
            if (websocket && websocket.readyState !== websocket.OPEN) {
                websocket.addEventListener("open", () => {
                    resolve(
                        new StreamSocket({
                            websocket,
                            streamWindowMs: args.streamWindowMs,
                            config: args.config,
                        })
                    );
                });
            } else {
                resolve(
                    new StreamSocket({
                        websocket,
                        streamWindowMs: args.streamWindowMs,
                        config: args.config,
                    })
                );
            }
        });
    }
}
