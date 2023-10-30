import * as Hume from "../api";
import * as core from "../core";

export declare namespace HumeStreamClient {
    interface Options {
        apiKey: core.Supplier<string>;
    }

    interface RequestOptions {
        timeoutInSeconds?: number;
        maxRetries?: number;
    }
}

export class HumeStreamClient {
    constructor(protected readonly _options: HumeStreamClient.Options) {}
}
