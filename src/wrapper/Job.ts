import { createWriteStream } from "fs";
import { writeFile } from "fs/promises";
import { pipeline } from "stream/promises";
import * as Hume from "../api";
import * as errors from "../errors";
import { HumeBatchClient } from "./HumeBatchClient";

export class Job implements Hume.JobId {
    constructor(
        public readonly jobId: string,
        private readonly client: HumeBatchClient
    ) {}

    public async awaitCompletion(timeoutInSeconds = 300): Promise<void> {
        return new Promise((resolve, reject) => {
            const poller = new JobCompletionPoller(this.jobId, this.client);
            poller.start(resolve);
            setTimeout(() => {
                poller.stop();
                reject(new errors.HumeTimeoutError());
            }, timeoutInSeconds * 1_000);
        });
    }
}

class JobCompletionPoller {
    private isPolling = true;
    constructor(
        private readonly jobId: string,
        private readonly client: HumeBatchClient
    ) {}

    public start(onTerminal: () => void) {
        this.isPolling = true;
        this.poll(onTerminal);
    }

    public stop() {
        this.isPolling = false;
    }

    private async poll(onTerminal: () => void): Promise<void> {
        try {
            const jobDetails = await this.client.getJobDetails(this.jobId);
            if (
                jobDetails.state.status === "COMPLETED" ||
                jobDetails.state.status === "FAILED"
            ) {
                onTerminal();
                this.stop();
            }
        } catch {
            // swallow errors while polling
        }

        if (this.isPolling) {
            setTimeout(() => this.poll(onTerminal), 1_000);
        }
    }
}
