import { HumeClient } from "../../src/"

describe("Streaming Expression Measurement", () => {
    it.skip("Emotional Language Text", async () => {
       const hume = new HumeClient({
            apiKey: "<>"
       });
       const job = await hume.expressionMeasurement.batch.startInferenceJob({
          models: {
               face: {}
          },
          urls: ["https://hume-tutorials.s3.amazonaws.com/faces.zip"]
       });
       await job.awaitCompletion();
       const predictions = await hume.expressionMeasurement.batch.getJobPredictions(job.jobId);
       console.log(JSON.stringify(predictions, null, 2));
    });
});
