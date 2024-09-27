import { Batch as FernClient } from "../../../api/resources/expressionMeasurement/resources/batch/client/Client";
import * as Hume from "../../../api";
import { Job } from "./Job";

export class BatchClient extends FernClient {
    public async startInferenceJob(
        request: Hume.expressionMeasurement.batch.InferenceBaseRequest = {},
        requestOptions?: FernClient.RequestOptions
    ): Promise<Job> {
        const { jobId } = await super.startInferenceJob(request, requestOptions);
        return new Job(jobId, this);
    }
}
