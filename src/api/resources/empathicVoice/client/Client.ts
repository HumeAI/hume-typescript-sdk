/** THIS FILE IS MANUALLY MAINAINED: see .fernignore */

import * as environments from "../../../../environments";
import * as core from "../../../../core";
import { Tools } from "../resources/tools/client/Client";
import { Prompts } from "../resources/prompts/client/Client";
import { Configs } from "../resources/configs/client/Client";
import { Chats } from "../resources/chats/client/Client";
import { ChatGroups } from "../resources/chatGroups/client/Client";
import { Chat } from "../resources/chat/client/Client";

export declare namespace EmpathicVoice {
    interface Options {
        environment?: core.Supplier<environments.HumeEnvironment | string>;
        apiKey?: core.Supplier<string | undefined>;
        accessToken?: core.Supplier<string | undefined>;
        fetcher?: core.FetchFunction;
    }

    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
    }
}

export class EmpathicVoice {
    constructor(protected readonly _options: EmpathicVoice.Options = {}) {}

    protected _tools: Tools | undefined;

    public get tools(): Tools {
        return (this._tools ??= new Tools(this._options));
    }

    protected _prompts: Prompts | undefined;

    public get prompts(): Prompts {
        return (this._prompts ??= new Prompts(this._options));
    }

    protected _configs: Configs | undefined;

    public get configs(): Configs {
        return (this._configs ??= new Configs(this._options));
    }

    protected _chats: Chats | undefined;

    public get chats(): Chats {
        return (this._chats ??= new Chats(this._options));
    }

    protected _chatGroups: ChatGroups | undefined;

    public get chatGroups(): ChatGroups {
        return (this._chatGroups ??= new ChatGroups(this._options));
    }

    protected _chat: Chat | undefined;

    public get chat(): Chat {
        return (this._chat ??= new Chat(this._options));
    }
}
