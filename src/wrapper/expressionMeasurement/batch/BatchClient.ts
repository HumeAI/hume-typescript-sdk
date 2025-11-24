import { Batch as FernClient } from "../../../api/resources/expressionMeasurement/resources/batch/client/Client.js";
import * as Hume from "../../../api/index.js";
import { Job } from "./Job.js";
import * as core from "../../../core/index.js";

export class BatchClient extends FernClient {
    // This just wraps the return value of the base class's `startInferenceJob` and `startInferenceJobFromLocalFile` methods
    // and returns a `Job` instance (has helper functions to await the job's result) instead of a raw job ID.
    public startInferenceJob(
        request: Hume.expressionMeasurement.batch.InferenceBaseRequest = {},
        requestOptions?: FernClient.RequestOptions,
    ): core.HttpResponsePromise<Job> {
        return core.HttpResponsePromise.fromPromise(
            super
                .startInferenceJob(request, requestOptions)
                .withRawResponse()
                .then((result) => {
                    return { data: new Job(result.data.jobId, this), rawResponse: result.rawResponse };
                }),
        );
    }

    public startInferenceJobFromLocalFile(
        request: Hume.expressionMeasurement.batch.BatchStartInferenceJobFromLocalFileRequest,
        requestOptions?: FernClient.RequestOptions,
    ): core.HttpResponsePromise<Job> {
        return core.HttpResponsePromise.fromPromise(
            super
                .startInferenceJobFromLocalFile(request, requestOptions)
                .withRawResponse()
                .then((result) => {
                    return { data: new Job(result.data.jobId, this), rawResponse: result.rawResponse };
                }),
v        );
    }
}
