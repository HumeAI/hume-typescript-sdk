import { HumeClient as FernClient } from "../Client";
import * as core from "../core/index.js";
import { ExpressionMeasurement } from "./expressionMeasurement/ExpressionMeasurementClient";

export declare namespace HumeClient {
    type Options = FernClient.Options & { secretKey?: string; accessToken?: string } & (
            | { accessToken: NonNullable<core.Supplier<string>> }
            | { apiKey: NonNullable<FernClient.Options["apiKey"]> }
        );
}

export class HumeClient extends FernClient {
    constructor(protected readonly _options: HumeClient.Options) {
        super(_options || {});
    }

    // We need to override this from FernClient to use the extended
    // `ExpressionMeasurement` from `wrapper` and not `api/resources/`
    protected _expressionMeasurement: ExpressionMeasurement | undefined;

    public get expressionMeasurement(): ExpressionMeasurement {
        return (this._expressionMeasurement ??= new ExpressionMeasurement(this._options));
    }
}
