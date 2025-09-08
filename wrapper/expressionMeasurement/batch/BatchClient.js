import { Batch as FernClient } from "../../../api/resources/expressionMeasurement/resources/batch/client/Client";
import { Job } from "./Job";
import * as core from "../../../core";
export class BatchClient extends FernClient {
    // This just wraps the return value of the base class's `startInferenceJob` method
    // and returns a `Job` instance (has helper functions to await the job's result) instead of a raw job ID.
    startInferenceJob(request = {}, requestOptions) {
        return core.HttpResponsePromise.fromPromise(
            super
                .startInferenceJob(request, requestOptions)
                .withRawResponse()
                .then((result) => {
                    return { data: new Job(result.data.jobId, this), rawResponse: result.rawResponse };
                }),
        );
    }
}
