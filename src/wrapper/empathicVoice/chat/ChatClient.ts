import * as Hume from "../../../api";
import * as serializers from "../../../serialization";
import * as core from "../../../core";
import * as errors from "../../../errors";
import qs from "qs";
import WebSocket from "ws";
import { base64Encode } from "../../base64Encode";
import { StreamSocket } from "./StreamSocket";

export declare namespace ChatClient {
    interface Options {
        apiKey?: core.Supplier<string | undefined>;
        clientSecret?: core.Supplier<string | undefined>;
    }

    interface ConnectArgs {
        /** The ID of the configuration. */
        configId: string;

        /** The version of the configuration. */
        configVersion: string;

        onOpen?: (event: WebSocket.Event) => void;
        onMessage?: (message: Hume.empathicVoice.SubscribeEvent) => void;
        onError?: (error: Hume.empathicVoice.Error_) => void;
        onClose?: (event: WebSocket.Event) => void;
    }
}

export class ChatClient {
    constructor(protected readonly _options: ChatClient.Options) {}

    public async connect(args: ChatClient.ConnectArgs): Promise<StreamSocket> {
        const queryParams: Record<string, string | string[] | object | object[]> = {};

        queryParams["accessToken"] = await this.fetchAccessToken();
        queryParams["apiKey"] = core.Supplier.get(this._options.apiKey);
        queryParams["config_id"] = args.configId;
        queryParams["config_id"] = args.configVersion;

        const websocket = new WebSocket(`wss://api.hume.ai/v0/evi/chat${qs.stringify(queryParams)}`, {
            timeout: 10
        });

        websocket.addEventListener("open", (event) => {
            args.onOpen?.(event);
        });

        websocket.addEventListener("error", (e) => {
            args.onError?.({
                type: "error",
                code: e.type,
                message: e.message,
                slug: "websocket-error"
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
        });
    }


    private async fetchAccessToken(): Promise<string> {
        const apiKey = await core.Supplier.get(this._options.apiKey);
        const clientSecret = await core.Supplier.get(this._options.clientSecret);

        const authString = `${apiKey}:${clientSecret}`;
        const encoded = base64Encode(authString);

        const response = await core.fetcher({
            url: `https://api.hume.ai/oauth2-cc/token`,
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${encoded}`,
            },
            body: new URLSearchParams({
                grant_type: "client_credentials",
            }).toString(),
        });

        if (!response.ok) {
            if (response.error.reason === "status-code") {
                throw new errors.HumeError({
                    statusCode: response.error.statusCode,
                    body: response.error.body,
                });
            }
    
            switch (response.error.reason) {
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: response.error.statusCode,
                        body: response.error.rawBody,
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError();
                case "unknown":
                    throw new errors.HumeError({
                        message: response.error.errorMessage,
                    });
            }
        }

        return (response.body as any).access_token as string;
      };
}

export async function parse(
    data: WebSocket.Data,
    args: {
        onMessage?: (message: Hume.empathicVoice.SubscribeEvent) => void;
        onError?: (error: Hume.empathicVoice.Error_) => void;
    } = {}
): Promise<Hume.empathicVoice.SubscribeEvent | undefined> {
    const message = JSON.parse(data as string);

    const parsedResponse = await serializers.empathicVoice.SubscribeEvent.parse(message, {
        unrecognizedObjectKeys: "passthrough",
        allowUnrecognizedUnionMembers: true,
        allowUnrecognizedEnumValues: true,
        breadcrumbsPrefix: ["response"],
    });
    if (parsedResponse.ok) {
        args.onMessage?.(parsedResponse.value);

        if (parsedResponse.value.type === "error") {
            args.onError?.(parsedResponse.value);
        }

        return parsedResponse.value;
    }
}

