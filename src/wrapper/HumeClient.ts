import { HumeClient as FernClient } from "../Client";
import { EmpathicVoice } from "./empathicVoice/EmpathicVoiceClient";
import { ExpressionMeasurement } from "./expressionMeasurement/ExpressionMeasurementClient";

export class HumeClient extends FernClient {
    protected _expressionMeasurement: ExpressionMeasurement | undefined;

    public get expressionMeasurement(): ExpressionMeasurement {
        return (this._expressionMeasurement ??= new ExpressionMeasurement(this._options));
    }

    protected _empathicVoice: EmpathicVoice | undefined;

    public get empathicVoice(): EmpathicVoice {
        return (this._empathicVoice ??= new EmpathicVoice(this._options));
    }
}
