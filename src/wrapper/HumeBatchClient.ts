import { HumeClient as FernClient } from "../Client";
import * as Hume from "../api";
import { Job } from "./Job";

export class HumeBatchClient extends FernClient {
    public async submitJob(request: Hume.BaseRequest = {}): Promise<Job> {
        const { jobId } = await super.submitJob(request);
        return new Job(jobId, this);
    }
}
