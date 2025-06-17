/** THIS FILE IS MANUALLY MAINAINED: see .fernignore */

import * as environments from "./environments";
import * as core from "./core";
import { mergeHeaders } from "./core/headers.js";
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
        headers?: Record<string, string | core.Supplier<string | undefined> | undefined>;
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

export class HumeClient {
    protected readonly _options: HumeClient.Options;
    protected _tts: Tts | undefined;
    protected _empathicVoice: EmpathicVoice | undefined;
    protected _expressionMeasurement: ExpressionMeasurement | undefined;

    constructor(_options: HumeClient.Options = {}) {
        this._options = {
            ..._options,
            headers: mergeHeaders(
                {
                    "X-Fern-Language": "JavaScript",
                    "X-Fern-SDK-Name": "",
                    "X-Fern-SDK-Version": "0.0.673",
                    "X-Fern-Runtime": core.RUNTIME.type,
                    "X-Fern-Runtime-Version": core.RUNTIME.version,
                    "X-Hume-Client-Name": "typescript_sdk",
                    "X-Hume-Client-Version": SDK_VERSION,
                },
                _options?.headers,
            ),
        };
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
