import { ExpressionMeasurement as FernClient } from "../../api/resources/expressionMeasurement/client/Client";
import { BatchClient } from "./batch/BatchClient";
import { StreamClient } from "./streaming/StreamingClient";
export declare class ExpressionMeasurement extends FernClient {
    protected _batch: BatchClient | undefined;
    get batch(): BatchClient;
    protected _stream: StreamClient | undefined;
    get stream(): StreamClient;
}
