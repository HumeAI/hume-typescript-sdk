import { HumeClient as FernClient } from "../Client";
import { ExpressionMeasurement } from "./expressionMeasurement/ExpressionMeasurementClient";
export declare namespace HumeClient {
    type Options = FernClient.Options & {
        secretKey?: string;
    } & (
            | {
                  accessToken: NonNullable<FernClient.Options["accessToken"]>;
              }
            | {
                  apiKey: NonNullable<FernClient.Options["apiKey"]>;
              }
        );
}
export declare class HumeClient extends FernClient {
    protected readonly _options: HumeClient.Options;
    constructor(_options: HumeClient.Options);
    protected _expressionMeasurement: ExpressionMeasurement | undefined;
    get expressionMeasurement(): ExpressionMeasurement;
}
