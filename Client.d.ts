/** THIS FILE IS MANUALLY MAINAINED: see .fernignore */
import * as environments from "./environments";
import * as core from "./core";
import { Tts } from "./api/resources/tts/client/Client";
import { EmpathicVoice } from "./api/resources/empathicVoice/client/Client";
import { ExpressionMeasurement } from "./api/resources/expressionMeasurement/client/Client";
export declare namespace HumeClient {
    interface Options {
        environment?: core.Supplier<environments.HumeEnvironment | string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: core.Supplier<string>;
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
        /** Additional headers to include in the request. */
        headers?: Record<string, string>;
    }
}
export declare class HumeClient {
    protected readonly _options: HumeClient.Options;
    protected _tts: Tts | undefined;
    protected _empathicVoice: EmpathicVoice | undefined;
    protected _expressionMeasurement: ExpressionMeasurement | undefined;
    constructor(_options?: HumeClient.Options);
    get tts(): Tts;
    get empathicVoice(): EmpathicVoice;
    get expressionMeasurement(): ExpressionMeasurement;
}
