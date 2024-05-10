import { HumeClient, Hume } from "../../src/"

const samples = [
   "Mary had a little lamb,",
   "Its fleece was white as snow.",
   "Everywhere the child went,",
   "The little lamb was sure to go."
];

describe("Streaming Expression Measurement", () => {
    it.skip("Emotional Language Text", async () => {
       const hume = new HumeClient({
            apiKey: "<>"
       });
         const socket = hume.expressionMeasurement.stream.connect({
            config: {
               language: {}
            }
         })
       for (const sample of samples) {
         const result = await socket.sendText({ text: sample })
         console.log(result)
       }
    }, 100000);
});
