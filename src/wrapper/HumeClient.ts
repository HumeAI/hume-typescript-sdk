import { HumeClient as FernClient } from "../Client";
import { ExpressionMeasurement } from "./expressionMeasurement/ExpressionMeasurementClient";

export declare namespace HumeClient {
    export interface Options extends FernClient.Options {
        secretKey?: string;
    }
}

export class HumeClient extends FernClient {
    constructor(protected readonly _options: HumeClient.Options = {}) {
        super(_options);
    }
}
