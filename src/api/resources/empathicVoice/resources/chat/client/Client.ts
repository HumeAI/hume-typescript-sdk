/** THIS FILE IS MANUALLY MAINTAINED: see .fernignore */
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

        /**
         * A flag to enable verbose transcription. Set this query parameter to `true` to have unfinalized user
         * transcripts be sent to the client as interim `UserMessage` messages.
         *
         * The [interim](/reference/empathic-voice-interface-evi/chat/chat#receive.User%20Message.interim) field
         * on a [UserMessage](/reference/empathic-voice-interface-evi/chat/chat#receive.User%20Message.type)
         * denotes whether the message is "interim" or "final."
         */
        verboseTranscription?: boolean;

        /** Extra query parameters sent at WebSocket connection */
        queryParams?: Record<string, string | string[] | object | object[]>;

        /**
         * Determines whether to resume the previous Chat context when reconnecting after specific types of
         * disconnections. When `true`, upon reconnection after the WebSocket disconnects with one of the
         * following [close codes](https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent/code#value):
         *  - `1006` (Abnormal Closure)
         *  - `1011` (Internal Error)
         *  - `1012` (Service Restart)
         *  - `1013` (Try Again Later)
         *  - `1014` (Bad Gateway)
         *
         * The SDK will use the `chat_group_id` from the disconnected session to restore the conversation history
         * and context. This preserves the continuity of the conversation across connections. Defaults to `false`.
         */
        shouldResumeChatOnReconnect?: boolean;
    }
}

export class Chat {
    constructor(protected readonly _options: Chat.Options) {}

    public connect(args: Chat.ConnectArgs = {}): ChatSocket {
        const shouldResumeChatOnReconnect = args.shouldResumeChatOnReconnect ?? false;
        const url = this._buildSocketUrl(args);
        const options: core.Options = {
            debug: args.debug ?? false,
            maxRetries: args.reconnectAttempts ?? 30,
            shouldAttemptReconnectHook: (event) => Chat._staticShouldAttemptReconnectEvi(event),
        };
        const socket = new core.ReconnectingWebSocket(url, [], options);
        return new ChatSocket({ socket, shouldResumeChatOnReconnect });
    }

    private static _staticShouldAttemptReconnectEvi({ code }: core.CloseEvent): boolean {
        const abnormalCloseCodes: Set<number> = new Set([1006, 1011, 1012, 1013, 1014]);
        return abnormalCloseCodes.has(code);
    }

    private _buildSocketUrl(args: Chat.ConnectArgs): string {
        const baseParams = {
            fernSdkLanguage: "JavaScript",
            fernSdkVersion: SDK_VERSION,
        };

        let authParam = {};
        if (this._options.accessToken != null) {
            authParam = { accessToken: this._options.accessToken };
        } else if (this._options.apiKey != null) {
            authParam = { apiKey: this._options.apiKey };
        }

        const optionalParams: Record<string, string> = {};
        if (args.configId != null && args.configId !== "") {
            optionalParams.config_id = args.configId;
        }
        if (args.configVersion != null && args.configVersion !== "") {
            optionalParams.config_version = args.configVersion;
        }
        if (args.resumedChatGroupId != null && args.resumedChatGroupId !== "") {
            optionalParams.resumed_chat_group_id = args.resumedChatGroupId;
        }
        if (args.verboseTranscription != null) {
            optionalParams.verbose_transcription = String(args.verboseTranscription);
        }

        const additionalParams = args.queryParams ?? {};

        const queryParams = {
            ...baseParams,
            ...authParam,
            ...optionalParams,
            ...additionalParams,
        };

        const baseUrl = core.Supplier.get(this._options.environment) ?? environments.HumeEnvironment.Production;
        const host = baseUrl.replace("https://", "");
        const queryString = qs.stringify(queryParams, { addQueryPrefix: true });
        return `wss://${host}/v0/evi/chat${queryString}`;
    }
}
