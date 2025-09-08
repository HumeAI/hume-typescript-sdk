import { HumeClient as FernClient } from "../Client";
import { ExpressionMeasurement } from "./expressionMeasurement/ExpressionMeasurementClient";
export class HumeClient extends FernClient {
    constructor(_options) {
        super(_options || {});
        this._options = _options;
    }
    get expressionMeasurement() {
        var _a;
        return (_a = this._expressionMeasurement) !== null && _a !== void 0
            ? _a
            : (this._expressionMeasurement = new ExpressionMeasurement(this._options));
    }
}
