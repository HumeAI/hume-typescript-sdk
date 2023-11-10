import { HumeClient as FernClient } from "../Client";
import * as Hume from "../api";
import { Job } from "./Job";

export class HumeBatchClient extends FernClient {
    public async submitJob(request: Hume.BaseRequest = {}, requestOptions?: FernClient.RequestOptions): Promise<Job> {
        const { jobId } = await super.submitJob(request, requestOptions);
        return new Job(jobId, this);
    }
}
