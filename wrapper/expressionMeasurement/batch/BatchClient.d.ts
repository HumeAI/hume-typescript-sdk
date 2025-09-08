import { Batch as FernClient } from "../../../api/resources/expressionMeasurement/resources/batch/client/Client";
import * as Hume from "../../../api";
import { Job } from "./Job";
import * as core from "../../../core";
export declare class BatchClient extends FernClient {
    startInferenceJob(
        request?: Hume.expressionMeasurement.batch.InferenceBaseRequest,
        requestOptions?: FernClient.RequestOptions,
    ): core.HttpResponsePromise<Job>;
}
