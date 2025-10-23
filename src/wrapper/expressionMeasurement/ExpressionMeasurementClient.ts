import { ExpressionMeasurement as FernClient } from "../../api/resources/expressionMeasurement/client/Client";
import { BatchClient } from "./batch/BatchClient";
import { StreamClient } from "./streaming/StreamingClient";

export class ExpressionMeasurement extends FernClient {
    protected _batch: BatchClient | undefined;

    // BatchClient here is overridden from the generated version, we wrap expression measurement jobs in
    // a helper that makes it easier to await the result of a job.
    public get batch(): BatchClient {
        return (this._batch ??= new BatchClient(this._options));
    }

    // Streamclient here is an addition -- not present on the base FernClient.
    protected _stream: StreamClient | undefined;

    public get stream(): StreamClient {
        return (this._stream ??= new StreamClient(this._options));
    }
}
