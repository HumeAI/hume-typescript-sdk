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
        if (_options.accessToken && _options.headers) {
            const hasAuthHeader = Object.keys(_options.headers).some(
                key => key.toLowerCase() === 'authorization'
            );
            if (hasAuthHeader) {
                throw new Error(
                    "Cannot provide both 'accessToken' and 'headers.Authorization'. Please use only one."
                );
            }
        }

        // If accessToken is provided, add Authorization header
        let optionsWithAuth = _options;
        if (_options.accessToken) {
            optionsWithAuth = {
                ..._options,
                headers: {
                    ..._options.headers,
                    Authorization: core.Supplier.map(_options.accessToken, (token) => `Bearer ${token}`),
                },
            };
        }

        super(optionsWithAuth || {});
    }

    // We need to override this from FernClient to use the extended
    // `ExpressionMeasurement` from `wrapper` and not `api/resources/`
    protected _expressionMeasurement: ExpressionMeasurement | undefined;

    public get expressionMeasurement(): ExpressionMeasurement {
        return (this._expressionMeasurement ??= new ExpressionMeasurement(this._options));
    }
}
