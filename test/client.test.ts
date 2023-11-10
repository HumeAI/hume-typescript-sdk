import { describe, expect, it } from "@jest/globals";
import { HumeBatchClient, HumeStreamingClient } from "../src";
import { WebSocket } from "ws";

describe("fern generate", () => {
    it("batch api", async () => {
        const apiKey = process.env.HUME_API_KEY;

        if (apiKey == null) {
            return;
        }

        const hume = new HumeBatchClient({
            apiKey,
        });

        console.log("Creating job...");
        const job = await hume.submitJob({
            models: {
                face: {},
            },
            urls: ["https://hume-tutorials.s3.amazonaws.com/faces.zip"],
        });
        console.log(`Create job with id ${job.jobId}...`);

        console.log("Awaiting completion...");
        await job.awaitCompletion();

        const details = await hume.getJobDetails(job.jobId);

        console.log("Loaded details", details);
    }, 60_000);

    it("streaming api", async () => {
        const apiKey =
            process.env.HUME_API_KEY ??
            "T7zfGdjbIQgZEbkYpI1U29lk3IA1JnlvCzYax1mu1r0D6dG";

        if (apiKey == null) {
            return;
        }

        const hume = new HumeStreamingClient({
            apiKey,
        });

        const samples = [
            "Mary had a little lamb,",
            "Its fleece was white as snow.",
            "Everywhere the child went,",
            "The little lamb was sure to go.",
        ];

        const stream = await hume.connect({
            config: {
                language: {},
            },
            onMessage: (response) => {
                if (response.language) {
                    console.log("Received language response");
                    console.log(response.language.predictions);
                }
            },
            onError: (error) => {
                console.log(error);
            },
        });

        for (const sample of samples) {
            stream.sendText({
                text: sample,
            });
        }

        await waitForSocketState({
            socket: stream.websocket,
            state: WebSocket.CLOSED,
        });

        setTimeout(() => {}, 60_000);
    }, 60_000);
});

function waitForSocketState({
    socket,
    state,
}: {
    socket: WebSocket;
    state:
        | typeof WebSocket.CONNECTING
        | typeof WebSocket.OPEN
        | typeof WebSocket.CLOSING
        | typeof WebSocket.CLOSED;
}): Promise<void> {
    return new Promise(function (resolve) {
        setTimeout(function () {
            if (socket.readyState === state) {
                resolve();
            } else {
                waitForSocketState({ socket, state }).then(resolve);
            }
        }, 5);
    });
}
