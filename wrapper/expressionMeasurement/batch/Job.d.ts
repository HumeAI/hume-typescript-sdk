import * as Hume from "../../../api";
import { BatchClient } from "./BatchClient";
export declare class Job implements Hume.expressionMeasurement.batch.JobId {
    readonly jobId: string;
    private readonly client;
    constructor(jobId: string, client: BatchClient);
    awaitCompletion(timeoutInSeconds?: number): Promise<void>;
}
