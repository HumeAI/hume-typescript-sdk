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
export declare class EmpathicVoice {
    protected readonly _options: EmpathicVoice.Options;
    constructor(_options?: EmpathicVoice.Options);
    protected _tools: Tools | undefined;
    get tools(): Tools;
    protected _prompts: Prompts | undefined;
    get prompts(): Prompts;
    protected _configs: Configs | undefined;
    get configs(): Configs;
    protected _chats: Chats | undefined;
    get chats(): Chats;
    protected _chatGroups: ChatGroups | undefined;
    get chatGroups(): ChatGroups;
    protected _chat: Chat | undefined;
    get chat(): Chat;
}
