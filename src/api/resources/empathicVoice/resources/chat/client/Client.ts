import * as core from "../../../../../../core";
import qs from "qs";
import { ChatSocket } from "./Socket";

export declare namespace Chat {
    interface Options {
        apiKey?: core.Supplier<string | undefined>;
        accessToken?: core.Supplier<string | undefined>;
    }

    interface ConnectArgs {
        /** The ID of the configuration. */
        configId?: string;

        /** The version of the configuration. */
        configVersion?: string;

        /** The ID of a chat group, used to resume a previous chat. */
        resumedChatGroupId?: string;
    }
}

export class Chat {
    constructor(protected readonly _options: Chat.Options) {}

    public connect(args: Chat.ConnectArgs = {}): ChatSocket {
        const queryParams: Record<string, string | string[] | object | object[]> = {};

        queryParams["accessToken"] = core.Supplier.get(this._options.accessToken);
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

        const socket = new core.ReconnectingWebSocket(`wss://api.hume.ai/v0/evi/chat?${qs.stringify(queryParams)}`);

        return new ChatSocket({
            socket,
        });
    }
}
