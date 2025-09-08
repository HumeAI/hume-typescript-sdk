/** THIS FILE IS MANUALLY MAINAINED: see .fernignore */
import { Tools } from "../resources/tools/client/Client";
import { Prompts } from "../resources/prompts/client/Client";
import { Configs } from "../resources/configs/client/Client";
import { Chats } from "../resources/chats/client/Client";
import { ChatGroups } from "../resources/chatGroups/client/Client";
import { Chat } from "../resources/chat/client/Client";
export class EmpathicVoice {
    constructor(_options = {}) {
        this._options = _options;
    }
    get tools() {
        var _a;
        return (_a = this._tools) !== null && _a !== void 0 ? _a : (this._tools = new Tools(this._options));
    }
    get prompts() {
        var _a;
        return (_a = this._prompts) !== null && _a !== void 0 ? _a : (this._prompts = new Prompts(this._options));
    }
    get configs() {
        var _a;
        return (_a = this._configs) !== null && _a !== void 0 ? _a : (this._configs = new Configs(this._options));
    }
    get chats() {
        var _a;
        return (_a = this._chats) !== null && _a !== void 0 ? _a : (this._chats = new Chats(this._options));
    }
    get chatGroups() {
        var _a;
        return (_a = this._chatGroups) !== null && _a !== void 0
            ? _a
            : (this._chatGroups = new ChatGroups(this._options));
    }
    get chat() {
        var _a;
        return (_a = this._chat) !== null && _a !== void 0 ? _a : (this._chat = new Chat(this._options));
    }
}
