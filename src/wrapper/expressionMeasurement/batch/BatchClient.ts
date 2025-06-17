import { Batch as FernClient } from "../../../api/resources/expressionMeasurement/resources/batch/client/Client";
import * as Hume from "../../../api";
import { Job } from "./Job";
import * as core from "core"

export class BatchClient extends FernClient {
    // This just wraps the return value of the base class's `startInferenceJob` method
    // and returns a `Job` instance (has helper functions to await the job's result) instead of a raw job ID.
    public startInferenceJob(
        request: Hume.expressionMeasurement.batch.InferenceBaseRequest = {},
        requestOptions?: FernClient.RequestOptions,
    ): core.HttpResponsePromise<Job> {
        return core.HttpResponsePromise.fromPromise(super.startInferenceJob(request, requestOptions).withRawResponse().then((result) => {
            return { data: new Job(result.data.jobId, this), rawResponse: result.rawResponse };
        }))
    }
}
