/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "../../../../environments";
import * as core from "../../../../core";
import { Files } from "../resources/files/client/Client";
import { Datasets } from "../resources/datasets/client/Client";
import { Models } from "../resources/models/client/Client";
import { Jobs } from "../resources/jobs/client/Client";

export declare namespace CustomModels {
    interface Options {
        environment?: core.Supplier<environments.HumeEnvironment | string>;
        apiKey?: core.Supplier<string | undefined>;
        fetcher?: core.FetchFunction;
    }

    interface RequestOptions {
        timeoutInSeconds?: number;
        maxRetries?: number;
    }
}

export class CustomModels {
    constructor(protected readonly _options: CustomModels.Options = {}) {}

    protected _files: Files | undefined;

    public get files(): Files {
        return (this._files ??= new Files(this._options));
    }

    protected _datasets: Datasets | undefined;

    public get datasets(): Datasets {
        return (this._datasets ??= new Datasets(this._options));
    }

    protected _models: Models | undefined;

    public get models(): Models {
        return (this._models ??= new Models(this._options));
    }

    protected _jobs: Jobs | undefined;

    public get jobs(): Jobs {
        return (this._jobs ??= new Jobs(this._options));
    }
}
