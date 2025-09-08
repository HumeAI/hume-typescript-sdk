/** THIS FILE IS MANUALLY MAINAINED: see .fernignore */
import * as environments from "../../../../../../environments";
import * as core from "../../../../../../core";
import qs from "qs";
import { ChatSocket } from "./Socket";
import { SDK_VERSION } from "../../../../../../version";
export function createHostnameWithProtocol(environment) {
    const protocol = /(https|http|wss|ws):\/\//.exec(environment);
    if (protocol) {
        return environment.replace("https://", "wss://").replace("http://", "ws://");
    } else {
        return `wss://${environment}`;
    }
}
export class Chat {
    constructor(_options) {
        this._options = _options;
    }
    connect(args = {}) {
        var _a, _b, _c;
        const queryParams = {};
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
        if (args.voiceId !== null && args.voiceId !== undefined && args.voiceId !== "") {
            queryParams["voice_id"] = args.voiceId;
        }
        if (args.queryParams !== null && args.queryParams !== undefined) {
            for (const [name, value] of Object.entries(args.queryParams)) {
                queryParams[name] = value;
            }
        }
        const hostname = createHostnameWithProtocol(
            (_a = core.Supplier.get(this._options.environment)) !== null && _a !== void 0
                ? _a
                : environments.HumeEnvironment.Production,
        );
        const socket = new core.ReconnectingWebSocket(`${hostname}/v0/evi/chat?${qs.stringify(queryParams)}`, [], {
            debug: (_b = args.debug) !== null && _b !== void 0 ? _b : false,
            maxRetries: (_c = args.reconnectAttempts) !== null && _c !== void 0 ? _c : 30,
        });
        return new ChatSocket({
            socket,
        });
    }
}
