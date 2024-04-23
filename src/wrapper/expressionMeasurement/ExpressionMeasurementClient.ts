import { ExpressionMeasurement as FernClient } from "../../api/resources/expressionMeasurement/client/Client";
import { BatchClient } from "./batch/BatchClient";
import { StreamClient } from "./streaming/StreamingClient";

export class ExpressionMeasurement extends FernClient {
    protected _batch: BatchClient | undefined;

    public get batch(): BatchClient {
        return (this._batch ??= new BatchClient(this._options));
    }

    protected _stream: StreamClient | undefined;

    public get stream(): StreamClient {
        return (this._stream ??= new StreamClient(this._options));
    }
}
