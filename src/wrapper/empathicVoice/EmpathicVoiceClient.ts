import { EmpathicVoice as FernClient } from "../../api/resources/empathicVoice/client/Client";
import { ChatClient } from "./chat/ChatClient";

export declare namespace EmpathicVoice {
    export interface Options extends FernClient.Options {
        clientSecret?: string;
    }
}

export class EmpathicVoice extends FernClient {
    protected _chat: ChatClient | undefined;

    public get chat(): ChatClient {
        return (this._chat ??= new ChatClient(this._options));
    }
}
