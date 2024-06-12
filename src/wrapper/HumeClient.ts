import { HumeClient as FernClient } from "../Client";
import { EmpathicVoice } from "./empathicVoice/EmpathicVoiceClient";
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

    protected _expressionMeasurement: ExpressionMeasurement | undefined;

    public get expressionMeasurement(): ExpressionMeasurement {
        return (this._expressionMeasurement ??= new ExpressionMeasurement(this._options));
    }

    protected _empathicVoice: EmpathicVoice | undefined;

    public get empathicVoice(): EmpathicVoice {
        return (this._empathicVoice ??= new EmpathicVoice(this._options));
    }
}
