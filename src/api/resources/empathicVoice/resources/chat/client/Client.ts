/** THIS FILE IS MANUALLY MAINTAINED: see .fernignore */
import type { BaseClientOptions } from '../../../../../../BaseClient.js';
import {
  type NormalizedClientOptions,
  normalizeClientOptions,
} from '../../../../../../BaseClient.js';
import * as core from '../../../../../../core/index.js';
import * as environments from '../../../../../../environments.js';
import * as serializers from '../../../../../../serialization/index.js';
import type * as Hume from '../../../../../index.js';
import { mergeOnlyDefinedHeaders } from '../../../../../../core/headers.js';
import { ChatSocket } from './Socket.js';

export declare namespace ChatClient {
  export type Options = BaseClientOptions;

  export interface ConnectArgs {
    accessToken?: string;
    allowConnection?: boolean;
    configId?: string;
    /** Accepts both string and number for backward compatibility */
    configVersion?: string | number;
    eventLimit?: number;
    resumedChatGroupId?: string;
    verboseTranscription?: boolean;
    /** @deprecated Use sessionSettings.voiceId instead */
    voiceId?: string;
    apiKey?: string;
    sessionSettings?: Hume.empathicVoice.ConnectSessionSettings;
    /** Extra query parameters sent at WebSocket connection  for backward compatibility */
    queryParams?: Record<string, string | string[] | object | object[]>;
    /** Arbitrary headers to send with the websocket connect request. */
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
      voiceId,
      apiKey,
      sessionSettings,
      queryParams,
      headers,
      debug,
      reconnectAttempts,
    } = args;

    const _queryParams: Record<
      string,
      string | string[] | object | object[] | null | undefined
    > = {
      access_token: accessToken,
      allow_connection:
        allowConnection != null
          ? allowConnection
            ? 'true'
            : 'false'
          : undefined,
      config_id: configId,
      config_version:
        configVersion != null
          ? typeof configVersion === 'number'
            ? configVersion.toString()
            : configVersion
          : undefined,
      event_limit: eventLimit != null ? eventLimit.toString() : undefined,
      resumed_chat_group_id: resumedChatGroupId,
      verbose_transcription:
        verboseTranscription != null
          ? verboseTranscription.toString()
          : undefined,
      voice_id: voiceId,
      api_key: apiKey,
      session_settings:
        sessionSettings != null
          ? serializers.empathicVoice.ConnectSessionSettings.jsonOrThrow(
              sessionSettings,
              {
                unrecognizedObjectKeys: 'passthrough',
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                omitUndefined: true,
                breadcrumbsPrefix: ['request', 'sessionSettings'],
              },
            )
          : undefined,
    };

    // Merge in any additional query parameters
    if (queryParams != null) {
      for (const [name, value] of Object.entries(queryParams)) {
        _queryParams[name] = value;
      }
    }

    const _headers: Record<string, unknown> = mergeOnlyDefinedHeaders({
      ...this._getCustomAuthorizationHeaders(),
      ...headers,
    });
    const socket = new core.ReconnectingWebSocket({
      url: core.url.join(
        core.Supplier.get(this._options.baseUrl) ??
          (
            core.Supplier.get(this._options.environment) ??
            environments.HumeEnvironment.Prod
          ).evi,
        '/chat',
      ),
      protocols: [],
      queryParameters: _queryParams,
      headers: _headers,
      options: { debug: debug ?? false, maxRetries: reconnectAttempts ?? 30 },
    });

    return new ChatSocket({ socket });
  }

  protected _getCustomAuthorizationHeaders(): Record<
    string,
    string | null | undefined
  > {
    const apiKeyValue = core.Supplier.get(this._options.apiKey);
    // This `authHeaderValue` is manually added as if you don't provide it it will
    // be omitted from the headers which means it won't reach the logic in ws.ts that
    // extracts values from the headers and adds them to query parameters.
    const authHeaderValue = core.Supplier.get(
      this._options.headers?.authorization,
    );
    return { 'X-Hume-Api-Key': apiKeyValue, Authorization: authHeaderValue };
  }
}
