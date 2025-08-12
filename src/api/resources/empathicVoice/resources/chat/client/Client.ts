/** THIS FILE IS MANUALLY MAINAINED: see .fernignore */
import * as environments from "../../../../../../environments";
import * as core from "../../../../../../core";
import qs from "qs";
import { ChatSocket } from "./Socket";
import { SDK_VERSION } from "../../../../../../version";

export function createHostnameWithProtocol(environment: string) {
    const protocol = /(https|http|wss|ws):\/\//.exec(environment);

    if (protocol) {
        return environment.replace("https://", "wss://").replace("http://", "ws://");
    } else {
        return `wss://${environment}`;
    }
}

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

        /** A flag to enable verbose transcription. Set this query parameter to `true` to have unfinalized user transcripts be sent to the client as interim UserMessage messages. The [interim](/reference/empathic-voice-interface-evi/chat/chat#receive.User%20Message.interim) field on a [UserMessage](/reference/empathic-voice-interface-evi/chat/chat#receive.User%20Message.type) denotes whether the message is "interim" or "final." */
        verboseTranscription?: boolean;

        /** ID of the Voice to use for this chat. If specified, will override the voice set in the Config */
        voiceId?: string;

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

        if (args.configId !== null && args.configId !== undefined && args.configId !== "") {
            queryParams["config_id"] = args.configId;
        }

        if (args.configVersion !== null && args.configVersion !== undefined && args.configVersion !== "") {
            queryParams["config_version"] = args.configVersion;
        }

        if (
            args.resumedChatGroupId !== null &&
            args.resumedChatGroupId !== undefined &&
            args.resumedChatGroupId !== ""
        ) {
            queryParams["resumed_chat_group_id"] = args.resumedChatGroupId;
        }

        if (args.verboseTranscription !== null) {
            queryParams["verbose_transcription"] = args.verboseTranscription ? "true" : "false";
        }

        if (args.queryParams !== null && args.queryParams !== undefined) {
            for (const [name, value] of Object.entries(args.queryParams)) {
                queryParams[name] = value;
            }
        }

        const hostname = createHostnameWithProtocol(
            core.Supplier.get(this._options.environment) ?? environments.HumeEnvironment.Production,
        );

        const socket = new core.ReconnectingWebSocket(`${hostname}/v0/evi/chat?${qs.stringify(queryParams)}`, [], {
            debug: args.debug ?? false,
            maxRetries: args.reconnectAttempts ?? 30,
        });

        return new ChatSocket({
            socket,
        });
    }
}
