/** THIS FILE IS MANUALLY MAINAINED: see .fernignore */
import * as environments from "../../../../../../environments";
import * as core from "../../../../../../core";
import { ChatSocket } from "./Socket";
export declare function createHostnameWithProtocol(environment: string): string;
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
export declare class Chat {
    protected readonly _options: Chat.Options;
    constructor(_options: Chat.Options);
    connect(args?: Chat.ConnectArgs): ChatSocket;
}
