import { HumeClient as FernClient } from "../Client";
import { ExpressionMeasurement } from "./expressionMeasurement/ExpressionMeasurementClient";

export class HumeClient extends FernClient {
    protected _expressionMeasurement: ExpressionMeasurement | undefined;

    public get expressionMeasurement(): ExpressionMeasurement {
        return (this._expressionMeasurement ??= new ExpressionMeasurement(this._options));
    }
}
