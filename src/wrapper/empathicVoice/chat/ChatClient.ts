import * as Hume from "../../../api";
import * as serializers from "../../../serialization";
import * as core from "../../../core";
import * as errors from "../../../errors";
import qs from "qs";
import { base64Encode } from "../../base64Encode";

export declare namespace ChatClient {
    interface Options {
        apiKey?: core.Supplier<string | undefined>;
        secretKey?: core.Supplier<string | undefined>;
    }

    interface ConnectArgs {
        /** The ID of the configuration. */
        configId?: string;

        /** The version of the configuration. */
        configVersion?: string;

        /** The ID of a chat group, used to resume a previous chat. */
        resumedChatGroupId?: string;

        onOpen?: () => void;
        onMessage?: (message: Hume.empathicVoice.SubscribeEvent) => void;
        onError?: (error: Hume.empathicVoice.Error_) => void;
        onClose?: () => void;
    }
}

export class ChatClient {
    constructor(protected readonly _options: ChatClient.Options) {}

    public async connect(args: ChatClient.ConnectArgs = {}): Promise<Hume.empathicVoice.StreamSocket> {
        const queryParams: Record<string, string | string[] | object | object[]> = {};

        queryParams["accessToken"] = await this.fetchAccessToken();
        queryParams["apiKey"] = core.Supplier.get(this._options.apiKey);
        if (args.configId != null) {
            queryParams["config_id"] = args.configId;
        }
        if (args.configVersion != null) {
            queryParams["config_version"] = args.configVersion;
        }
        if (args.resumedChatGroupId != null) {
            queryParams["resumed_chat_group_id"] = args.resumedChatGroupId;
        }

        const websocket = await core.connect(`wss://api.hume.ai/v0/evi/chat?${qs.stringify(queryParams)}`);

        websocket.addEventListener("open", () => {
            args.onOpen?.();
        });

        websocket.addEventListener("error", (e: any) => {
            args.onError?.({
                type: "error",
                code: e.type,
                message: e.message,
                slug: "websocket-error",
            });
        });

        websocket.addEventListener("message", async ({ data }: any) => {
            parse(data, {
                onMessage: args.onMessage,
                onError: args.onError,
            });
        });

        websocket.addEventListener("close", () => {
            args.onClose?.();
        });

        return new Hume.empathicVoice.StreamSocket({
            websocket,
        });
    }

    private async fetchAccessToken(): Promise<string> {
        const apiKey = await core.Supplier.get(this._options.apiKey);
        const secretKey = await core.Supplier.get(this._options.secretKey);

        const authString = `${apiKey}:${secretKey}`;
        const encoded = base64Encode(authString);

        const response = await core.fetcher({
            url: "https://api.hume.ai/oauth2-cc/token",
            method: "POST",
            contentType: "application/x-www-form-urlencoded",
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
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

        const token = ((await response.body) as any).access_token as string;
        return token;
    }
}

export async function parse(
    data: any,
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
