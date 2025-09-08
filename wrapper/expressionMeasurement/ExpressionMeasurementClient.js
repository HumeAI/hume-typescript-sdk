import { ExpressionMeasurement as FernClient } from "../../api/resources/expressionMeasurement/client/Client";
import { BatchClient } from "./batch/BatchClient";
import { StreamClient } from "./streaming/StreamingClient";
export class ExpressionMeasurement extends FernClient {
    // BatchClient here is overridden from the generated version, we wrap expression measurement jobs in
    // a helper that makes it easier to await the result of a job.
    get batch() {
        var _a;
        return (_a = this._batch) !== null && _a !== void 0 ? _a : (this._batch = new BatchClient(this._options));
    }
    get stream() {
        var _a;
        return (_a = this._stream) !== null && _a !== void 0 ? _a : (this._stream = new StreamClient(this._options));
    }
}
