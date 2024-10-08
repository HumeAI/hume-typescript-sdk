import * as environments from "../../../../../../environments";
import * as core from "../../../../../../core";
import qs from "qs";
import { ChatSocket } from "./Socket";
import { SDK_VERSION } from "../../../../../../version";

export declare namespace Chat {
    interface Options {
        environment?: core.Supplier<environments.HumeEnvironment | string>;
        apiKey?: core.Supplier<string | undefined>;
        accessToken?: core.Supplier<string | undefined>;
    }

    interface ConnectArgs {
        /** Enable debug mode on the websocket. Defaults to false. */
        debug?: boolean;

        /** Number of reconnect attempts. Defaults to 30. */
        reconnectAttempts?: number;

        /** The ID of the configuration. */
        configId?: string;

        /** The version of the configuration. */
        configVersion?: string;

        /** The ID of a chat group, used to resume a previous chat. */
        resumedChatGroupId?: string;

        /** Extra query parameters sent at WebSocket connection */
        queryParams?: Record<string, string | string[] | object | object[]>;
    }
}

export class Chat {
    constructor(protected readonly _options: Chat.Options) {}

    public connect(args: Chat.ConnectArgs = {}): ChatSocket {
        const queryParams: Record<string, string | string[] | object | object[]> = {};

        queryParams["fernSdkLanguage"] = "JavaScript";
        queryParams["fernSdkVersion"] = SDK_VERSION;

        if (this._options.accessToken != null) {
            queryParams["accessToken"] = this._options.accessToken;
        } else if (this._options.apiKey != null) {
            queryParams["apiKey"] = this._options.apiKey;
        }
        if (args.configId != null) {
            queryParams["config_id"] = args.configId;
        }
        if (args.configVersion != null) {
            queryParams["config_version"] = args.configVersion;
        }
        if (args.resumedChatGroupId != null) {
            queryParams["resumed_chat_group_id"] = args.resumedChatGroupId;
        }

        if (args.queryParams != null) {
            for (const [name, value] of Object.entries(args.queryParams)) {
                queryParams[name] = value;
            }
        }

        const socket = new core.ReconnectingWebSocket(
            `wss://${(core.Supplier.get(this._options.environment) ?? environments.HumeEnvironment.Production).replace(
                "https://",
                ""
            )}/v0/evi/chat?${qs.stringify(queryParams)}`,
            [],
            {
                debug: args.debug ?? false,
                maxRetries: args.reconnectAttempts ?? 30,
            }
        );

        return new ChatSocket({
            socket,
        });
    }
}
