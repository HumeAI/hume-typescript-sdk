<div align="center">
  <img src="https://storage.googleapis.com/hume-public-logos/hume/hume-banner.png">
  <h1>Hume AI TypeScript SDK</h1>

  <p>
    <strong>Integrate Hume APIs directly into your Node application or frontend</strong>
  </p>

  <br>
  <div>
    <a href="https://www.npmjs.com/package/hume"><img src="https://img.shields.io/npm/v/hume">
    <a href="https://buildwithfern.com/"><img src="https://img.shields.io/badge/%F0%9F%8C%BF-SDK%20generated%20by%20Fern-brightgreen">
  </div>
  <br>
</div>

## Documentation

API reference documentation is available [here](https://dev.hume.ai/reference/).

## Installation

```
npm i hume
```

## Usage

```typescript
import { HumeClient } from "hume";

const hume = new HumeClient({
    apiKey: "YOUR_API_KEY",
});

const job = await hume.expressionMeasurement.batch.startInferenceJob({
    models: {
        face: {},
    },
    urls: ["https://hume-tutorials.s3.amazonaws.com/faces.zip"],
});

console.log("Running...");

await job.awaitCompletion();

const predictions = await hume.expressionMeasurement.batch.getJobPredictions(job.jobId);

console.log(predictions);
```

## Namespaces

This SDK contains the APIs for expression measurement, empathic voice and custom models. Even
if you do not plan on using more than one API to start, the SDK provides easy access in
case you find additional APIs in the future.

Each API is namespaced accordingly:

```typescript
import { HumeClient } from "hume";

const hume = new HumeClient({
    apiKey: "YOUR_API_KEY"
});

hume.expressionMeasurement. // APIs specific to Expression Measurement

hume.emapthicVoice. // APIs specific to Empathic Voice
```

## Websockets

The SDK supports interacting with both WebSocket and REST APIs.

### Request-Reply

The SDK supports a request-reply pattern for the streaming expression measurement API.
You'll be able to pass an inference request and `await` till the response is received.

```typescript
import { HumeClient } from "hume";

const hume = new HumeClient({
    apiKey: "YOUR_API_KEY",
});

const socket = hume.expressionMeasurement.stream.connect({
    config: {
        language: {},
    },
});

for (const sample of samples) {
    const result = await socket.sendText({ text: sample });
    console.log(result);
}
```

### Empathic Voice

The SDK supports sending and receiving audio from Empathic Voice.

```typescript
import { HumeClient } from "hume";

const hume = new HumeClient({
    apiKey: "<>",
    secretKey: "<>",
});

const socket = hume.empathicVoice.chat.connect();

socket.on("message", (message) => {
    if (message.type === "audio_output") {
        const decoded = Buffer.from(message.data, "base64");
        // play decoded message
    }
});

// optional utility to wait for socket to be open
await socket.tillSocketOpen();

socket.sendUserInput("Hello, how are you?");
```

## Errors

When the API returns a non-success status code (4xx or 5xx response),
a subclass of [HumeError](./src/errors/HumeError.ts) will be thrown:

```typescript
import { HumeError, HumeTimeoutError } from "hume";

try {
    await hume.expressionMeasurement.batch.startInferenceJob(/* ... */);
} catch (err) {
    if (err instanceof HumeTimeoutError) {
        console.log("Request timed out", err);
    } else if (err instanceof HumeError) {
        // catch all errros
        console.log(err.statusCode);
        console.log(err.message);
        console.log(err.body);
    }
}
```

## Retries

409 Conflict, 429 Rate Limit, and >=500 Internal errors will all be retried twice with exponential bakcoff.
You can use the maxRetries option to configure this behavior:

```typescript
await hume.expressionMeasurement.batch.startInferenceJob(..., {
    maxRetries: 0, // disable retries
});
```

## Timeouts

By default, the SDK has a timeout of 60s. You can use the `timeoutInSeconds` option to configure
this behavior

```typescript
await hume.expressionMeasurement.batch.startInferenceJob(..., {
    timeoutInSeconds: 10, // timeout after 10 seconds
});
```

## Beta Status

This SDK is in beta, and there may be breaking changes between versions without a major
version update. Therefore, we recommend pinning the package version to a specific version.
This way, you can install the same version each time without breaking changes.

## Contributing

While we value open-source contributions to this SDK, this library is generated programmatically.
Additions made directly to this library would have to be moved over to our generation code,
otherwise they would be overwritten upon the next generated release. Feel free to open a PR as a
proof of concept, but know that we will not be able to merge it as-is. We suggest opening an
issue first to discuss with us!

On the other hand, contributions to the README are always very welcome!
