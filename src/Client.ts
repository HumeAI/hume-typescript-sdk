/** THIS FILE IS MANUALLY MAINTAINED: see .fernignore */

import * as environments from "./environments";
import * as core from "./core";
import { ExpressionMeasurement } from "./api/resources/expressionMeasurement/client/Client";
import { EmpathicVoice } from "./api/resources/empathicVoice/client/Client";
import { Tts } from "./api/resources/tts/client/Client";

export declare namespace HumeClient {
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

export class HumeClient {
    constructor(protected readonly _options: HumeClient.Options = {}) {}

    protected _expressionMeasurement: ExpressionMeasurement | undefined;

    public get expressionMeasurement(): ExpressionMeasurement {
        return (this._expressionMeasurement ??= new ExpressionMeasurement(this._options));
    }

    protected _empathicVoice: EmpathicVoice | undefined;

    public get empathicVoice(): EmpathicVoice {
        return (this._empathicVoice ??= new EmpathicVoice(this._options));
    }

    protected _tts: Tts | undefined;

    public get tts(): Tts {
        return (this._tts ??= new Tts(this._options));
    }
}
