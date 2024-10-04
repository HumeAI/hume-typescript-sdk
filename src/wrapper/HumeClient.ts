import { HumeClient as FernClient } from "../Client";
import { ExpressionMeasurement } from "./expressionMeasurement/ExpressionMeasurementClient";

export declare namespace HumeClient {
    type Options = FernClient.Options & { secretKey?: string } & (
            | { accessToken: FernClient.Options["accessToken"] }
            | { apiKey: FernClient.Options["apiKey"] }
        );
}

export class HumeClient extends FernClient {
    constructor(protected readonly _options: HumeClient.Options) {
        super(_options);
    }
}
