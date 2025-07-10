/** THIS FILE IS MANUALLY MAINAINED: see .fernignore */

import * as environments from "./environments";
import * as core from "./core";
import { Tts } from "./api/resources/tts/client/Client";
import { EmpathicVoice } from "./api/resources/empathicVoice/client/Client";
import { ExpressionMeasurement } from "./api/resources/expressionMeasurement/client/Client";
import { SDK_VERSION } from "./version";

export declare namespace HumeClient {
    export interface Options {
        environment?: core.Supplier<environments.HumeEnvironment | string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: core.Supplier<string>;
        apiKey?: core.Supplier<string | undefined>;
        // THIS (`accessToken`) IS THE ONLY NON-GENERATED PART
        accessToken?: core.Supplier<string | undefined>;
        fetcher?: core.FetchFunction;
    }

    export interface RequestOptions {
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

const fetcherThatAddsHeaders = (fetcherToWrap: core.FetchFunction): core.FetchFunction => {
    return (args: core.Fetcher.Args) => {
        const newArgs = { ...args };
        newArgs.headers = newArgs.headers ?? {};
        ((newArgs.headers["X-Hume-Client-Name"] = "typescript_sdk"),
            (newArgs.headers["X-Hume-Client-Version"] = SDK_VERSION));
        return fetcherToWrap(args);
    };
};

export class HumeClient {
    protected _tts: Tts | undefined;
    protected _empathicVoice: EmpathicVoice | undefined;
    protected _expressionMeasurement: ExpressionMeasurement | undefined;

    constructor(protected readonly _options: HumeClient.Options = {}) {
        const defaultFetcher = _options.fetcher ?? core.fetcher;
        this._options.fetcher = fetcherThatAddsHeaders(defaultFetcher);
    }

    public get tts(): Tts {
        return (this._tts ??= new Tts(this._options));
    }

    public get empathicVoice(): EmpathicVoice {
        return (this._empathicVoice ??= new EmpathicVoice(this._options));
    }

    public get expressionMeasurement(): ExpressionMeasurement {
        return (this._expressionMeasurement ??= new ExpressionMeasurement(this._options));
    }
}
