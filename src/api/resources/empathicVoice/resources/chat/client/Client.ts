/** THIS FILE IS MANUALLY MAINTAINED: see .fernignore */
import type { BaseClientOptions } from "../../../../../../BaseClient.js";
import { type NormalizedClientOptions, normalizeClientOptions } from "../../../../../../BaseClient.js";
import * as core from "../../../../../../core/index.js";
import * as environments from "../../../../../../environments.js";
import * as serializers from "../../../../../../serialization/index.js";
import type * as Hume from "../../../../../index.js";
import { mergeOnlyDefinedHeaders } from "../../../../../../core/headers.js";
import { ChatSocket } from "./Socket.js";

export declare namespace ChatClient {
    export type Options = BaseClientOptions;

    export interface ConnectArgs {
        accessToken?: string;
        allowConnection?: boolean;
        configId?: string;
        configVersion?: number;
        eventLimit?: number;
        resumedChatGroupId?: string;
        verboseTranscription?: boolean;
        apiKey?: string;
        sessionSettings?: Hume.empathicVoice.ConnectSessionSettings;
        headers?: Record<string, string>;
        debug?: boolean;
        reconnectAttempts?: number;
    }
}

export class ChatClient {
    protected readonly _options: NormalizedClientOptions<ChatClient.Options>;

    constructor(options: ChatClient.Options = {}) {
        this._options = normalizeClientOptions(options);
    }

    public connect(args: ChatClient.ConnectArgs = {}): ChatSocket {
        const {
            accessToken,
            allowConnection,
            configId,
            configVersion,
            eventLimit,
            resumedChatGroupId,
            verboseTranscription,
            apiKey,
            sessionSettings,
            headers,
            debug,
            reconnectAttempts,
        } = args;

        const _queryParams: Record<string, unknown> = {
            access_token: accessToken,
            allow_connection: allowConnection,
            config_id: configId,
            config_version: configVersion,
            event_limit: eventLimit,
            resumed_chat_group_id: resumedChatGroupId,
            verbose_transcription: verboseTranscription,
            api_key: apiKey,
            session_settings:
                sessionSettings != null
                    ? serializers.empathicVoice.ConnectSessionSettings.jsonOrThrow(sessionSettings, {
                          unrecognizedObjectKeys: "passthrough",
                          allowUnrecognizedUnionMembers: true,
                          allowUnrecognizedEnumValues: true,
                          omitUndefined: true,
                          breadcrumbsPrefix: ["request", "sessionSettings"],
                      })
                    : undefined,
        };
        const _headers: Record<string, unknown> = mergeOnlyDefinedHeaders({
            ...this._getCustomAuthorizationHeaders(),
            ...headers,
        });
        const socket = new core.ReconnectingWebSocket({
            url: core.url.join(
                core.Supplier.get(this._options.baseUrl) ??
                    (core.Supplier.get(this._options.environment) ?? environments.HumeEnvironment.Prod).evi,
                "/chat",
            ),
            protocols: [],
            queryParameters: _queryParams as Record<string, string | string[] | object | object[] | null | undefined>,
            headers: _headers,
            options: { debug: debug ?? false, maxRetries: reconnectAttempts ?? 30 },
        });

        return new ChatSocket({ socket });
    }

    protected _getCustomAuthorizationHeaders(): Record<string, string | null | undefined> {
        const apiKeyValue = core.Supplier.get(this._options.apiKey);
        // This `authHeaderValue` is manually added as if you don't provide it it will
        // be omitted from the headers which means it won't reach the logic in ws.ts that
        // extracts values from the headers and adds them to query parameters.
        const authHeaderValue = core.Supplier.get(this._options.headers?.authorization);
        return { "X-Hume-Api-Key": apiKeyValue, Authorization: authHeaderValue };
    }
}
