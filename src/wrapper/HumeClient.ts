import { HumeClient as FernClient } from "../Client";
import * as core from "../core/index.js";

export declare namespace HumeClient {
    type Options = FernClient.Options & { secretKey?: string, accessToken?: string } & (
            | { accessToken: NonNullable<core.Supplier<string>> }
            | { apiKey: NonNullable<FernClient.Options["apiKey"]> }
        );
}

export class HumeClient extends FernClient {
    constructor(protected readonly _options: HumeClient.Options) {
        super(_options || {});
    }
}
