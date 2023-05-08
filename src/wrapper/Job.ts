import { HumeBatchClient } from "./HumeBatchClient";
import * as Hume from "../api";
import * as errors from "../errors";

export class Job implements Hume.JobId {
    constructor(public readonly jobId: string, private readonly client: HumeBatchClient) {}

    async awaitCompletion(timeoutInSeconds = 300): Promise<void> {
        const startTime = Date.now();
       
    }

    private async isJobComplete(): Promise<boolean> {
        const jobDetails = await this.client.getJobDetails(this.jobId);
        return jobDetails.state.type === "COMPLETED" || jobDetails.state.type === "FAILED";
    }

    async downloadPredictions(filepath: string): Promise<void> {
    }

    async downloadArtifacts(): Promise<void> {}
}
