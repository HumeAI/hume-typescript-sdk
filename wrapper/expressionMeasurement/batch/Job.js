var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
import * as errors from "../../../errors";
export class Job {
    constructor(jobId, client) {
        this.jobId = jobId;
        this.client = client;
    }
    awaitCompletion() {
        return __awaiter(this, arguments, void 0, function* (timeoutInSeconds = 300) {
            return new Promise((resolve, reject) => {
                const poller = new JobCompletionPoller(this.jobId, this.client);
                poller.start(resolve);
                setTimeout(() => {
                    poller.stop();
                    reject(new errors.HumeTimeoutError("Timeout exceeded when polling for job completion"));
                }, timeoutInSeconds * 1000);
            });
        });
    }
}
class JobCompletionPoller {
    constructor(jobId, client) {
        this.jobId = jobId;
        this.client = client;
        this.isPolling = true;
    }
    start(onTerminal) {
        this.isPolling = true;
        this.poll(onTerminal);
    }
    stop() {
        this.isPolling = false;
    }
    poll(onTerminal) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jobDetails = yield this.client.getJobDetails(this.jobId);
                if (jobDetails.state.status === "COMPLETED" || jobDetails.state.status === "FAILED") {
                    onTerminal();
                    this.stop();
                }
            } catch (_a) {
                // swallow errors while polling
            }
            if (this.isPolling) {
                setTimeout(() => this.poll(onTerminal), 1000);
            }
        });
    }
}
