/** THIS FILE IS MANUALLY MAINTAINED: see .fernignore */

import * as environments from "../../../../../../environments.js";
import * as core from "../../../../../../core/index.js";
import * as Hume from "../../../../../index.js";
import { mergeOnlyDefinedHeaders, mergeHeaders } from "../../../../../../core/headers.js";
import * as serializers from "../../../../../../serialization/index.js";
import { ChatSocket } from "./Socket.js";

function createHostnameWithProtocol(url: string): string {
    const protocol = /(https|http|wss|ws):\/\//.exec(url);

    if (protocol) {
        return url.replace("https://", "wss://").replace("http://", "ws://");
    } else {
        return `wss://${url}`;
    }
}

export declare namespace Chat {
    export interface Options {
        environment?: core.Supplier<environments.HumeEnvironment | environments.HumeEnvironmentUrls | string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: core.Supplier<string>;
        apiKey?: core.Supplier<string | undefined>;
        /** Additional headers to include in requests. */
        headers?: Record<string, string | core.Supplier<string | null | undefined> | null | undefined>;
    }

    export interface ConnectArgs {
        accessToken?: string | undefined;
        configId?: string | undefined;
        configVersion?: string | number | undefined;
        eventLimit?: number | undefined;
        resumedChatGroupId?: string | undefined;
        verboseTranscription?: boolean | undefined;
        /** @deprecated Use sessionSettings.voiceId instead */
        voiceId?: string | undefined;
        apiKey?: string | undefined;
        sessionSettings?: Hume.empathicVoice.ConnectSessionSettings;
        /** Extra query parameters sent at WebSocket connection */
        queryParams?: Record<string, string | string[] | object | object[]>;
        /** Arbitrary headers to send with the websocket connect request. */
        headers?: Record<string, string>;
        /** Enable debug mode on the websocket. Defaults to false. */
        debug?: boolean;
        /** Number of reconnect attempts. Defaults to 30. */
        reconnectAttempts?: number;
    }
}

export class Chat {
    protected readonly _options: Chat.Options;

    constructor(_options: Chat.Options = {}) {
        this._options = _options;
    }

    public connect(args: Chat.ConnectArgs = {}): ChatSocket {
        const {
            accessToken,
            configId,
            configVersion,
            eventLimit,
            resumedChatGroupId,
            verboseTranscription,
            voiceId,
            apiKey,
            sessionSettings,
            queryParams,
            headers,
            debug,
            reconnectAttempts,
        } = args;
        const _queryParams: Record<string, string | string[] | object | object[] | null> = {};

        if (accessToken != null) {
            _queryParams["access_token"] = accessToken;
        }

        if (configId != null) {
            _queryParams["config_id"] = configId;
        }

        if (configVersion != null) {
            _queryParams["config_version"] =
                typeof configVersion === "number" ? configVersion.toString() : configVersion;
        }

        if (eventLimit != null) {
            _queryParams["event_limit"] = eventLimit.toString();
        }

        if (resumedChatGroupId != null) {
            _queryParams["resumed_chat_group_id"] = resumedChatGroupId;
        }

        if (verboseTranscription != null) {
            _queryParams["verbose_transcription"] = verboseTranscription.toString();
        }

        if (voiceId != null) {
            _queryParams["voice_id"] = voiceId;
        }

        if (apiKey != null) {
            _queryParams["api_key"] = apiKey;
        }

        if (sessionSettings != null) {
            _queryParams["session_settings"] = serializers.empathicVoice.ConnectSessionSettings.jsonOrThrow(
                sessionSettings,
                {
                    unrecognizedObjectKeys: "passthrough",
                    allowUnrecognizedUnionMembers: true,
                    allowUnrecognizedEnumValues: true,
                    omitUndefined: true,
                    breadcrumbsPrefix: ["request", "sessionSettings"],
                },
            );
        }

        // Merge in any additional query parameters
        if (queryParams != null) {
            for (const [name, value] of Object.entries(queryParams)) {
                _queryParams[name] = value;
            }
        }

        let _headers: Record<string, unknown> = mergeHeaders(
            mergeOnlyDefinedHeaders({ ...this._getCustomAuthorizationHeaders() }),
            headers,
        );

        // Construct WebSocket URL with protocol conversion
        const baseUrl = core.Supplier.get(this._options["baseUrl"]);
        const environment = core.Supplier.get(this._options["environment"]) ?? environments.HumeEnvironment.Prod;

        let websocketUrl: string;
        if (baseUrl) {
            // baseUrl takes precedence - apply protocol conversion
            websocketUrl = core.url.join(createHostnameWithProtocol(baseUrl), "/v0/evi/chat");
        } else if (typeof environment === "string") {
            // String environment - apply protocol conversion
            websocketUrl = core.url.join(createHostnameWithProtocol(environment), "/v0/evi/chat");
        } else {
            // Structured environment object - use .evi property directly
            websocketUrl = core.url.join(environment.evi, "/chat");
        }

        const socket = new core.ReconnectingWebSocket({
            url: websocketUrl,
            protocols: [],
            queryParameters: _queryParams,
            headers: _headers,
            options: { debug: debug ?? false, maxRetries: reconnectAttempts ?? 30 },
        });
        return new ChatSocket({ socket });
    }

    protected _getCustomAuthorizationHeaders() {
        const apiKeyValue = core.Supplier.get(this._options.apiKey);
        // This `authHeaderValue` is manually added as if you don't provide it it will
        // be omitted from the headers which means it won't reach the logic in ws.ts that
        // extracts values from the headers and adds them to query parameters.
        const authHeaderValue = core.Supplier.get(this._options.headers?.Authorization);
        return { "X-Hume-Api-Key": apiKeyValue, Authorization: authHeaderValue };
    }
}
