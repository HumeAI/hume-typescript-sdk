import { HumeClient as FernClient } from "../Client";
import * as core from "../core/index.js";
import { ExpressionMeasurement } from "./expressionMeasurement/ExpressionMeasurementClient";
import * as environments from "../environments.js";

export declare namespace HumeClient {
    type Options = Omit<FernClient.Options, 'environment'> & { secretKey?: string; accessToken?: string } & (
        | { accessToken: NonNullable<core.Supplier<string>> }
        | { apiKey: NonNullable<FernClient.Options["apiKey"]> }
    ) & {
        environment: core.Supplier<environments.HumeEnvironment | environments.HumeEnvironmentUrls | string>
    };
}

export class HumeClient extends FernClient {
    constructor(_options: HumeClient.Options) {

        let options: FernClient.Options;
        let oldEnvironment: HumeClient.Options['environment'];
        ({ environment: oldEnvironment, ...options } = _options || {});

        // Check if both accessToken and Authorization header are provided (case-insensitive)
        if (_options.accessToken && _options.headers) {
            const hasAuthHeader = Object.keys(_options.headers).some((key) => key.toLowerCase() === "authorization");
            if (hasAuthHeader) {
                throw new Error("Cannot provide both 'accessToken' and 'headers.Authorization'. Please use only one.");
            }
        }


        if (_options.accessToken) {
            options.headers = {
                ...options.headers,
                Authorization: core.Supplier.map(_options.accessToken, (token) => `Bearer ${token}`),
            }
        }

        // Allow setting a single url http://... or https://... for environment'
        if (oldEnvironment) {
            const environment: FernClient.Options['environment'] = _options.environment ? core.Supplier.map(_options.environment, (e): environments.HumeEnvironment | environments.HumeEnvironmentUrls => {
                if (typeof e === "string") {
                    if (e.startsWith("http://")) {
                        return {
                            base: e,
                            evi: e.replace('http://', 'ws://') + "/v0/evi",
                            tts: e.replace('http://', 'ws://') + "/v0/tts",
                            stream: e.replace('http://', 'ws://') + "/v0/stream",
                        }
                    }
                    if (e.startsWith("https://")) {
                        return {
                            base: e,
                            evi: e.replace('https://', 'wss://') + "/v0/evi",
                            tts: e.replace('https://', 'wss://') + "/v0/tts",
                            stream: e.replace('https://', 'wss://') + "/v0/stream",
                        }
                    }
                        return {
                            base: 'https://' + e,
                            evi: 'wss://' + e + "/v0/evi",
                            tts: 'wss://' + e + "/v0/tts",
                            stream: 'wss://' + e + "/v0/stream",
                        }
                } else {
                    return e
                }
            }) : undefined
            options.environment = environment;
        }

        super(options);
    }

    // We need to override this from FernClient to use the extended
    // `ExpressionMeasurement` from `wrapper` and not `api/resources/`
    protected _expressionMeasurement: ExpressionMeasurement | undefined;

    public get expressionMeasurement(): ExpressionMeasurement {
        return (this._expressionMeasurement ??= new ExpressionMeasurement(this._options));
    }
}
