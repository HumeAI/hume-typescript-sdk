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

> **Note**
> This TypeScript SDK is under heavy development. It is NOT recommended that anyone uses this SDK in their production workloads. We will continue to publish updates to this SDK and hope to ensure a more stable and reliable release in the future. We encourage you to keep up with our [API changelog](https://dev.hume.ai/changelog) and mailing list to stay up to date with the latest changes.

## Documentation

API reference documentation is available [here](https://docs.hume.ai/doc/batch-api).

## Installation

```
npm i hume
```

## Batch Client

The SDK exports a batch client which you can use to hit our REST APIs.

<a href="https://stackblitz.com/edit/typescript-example-using-sdk-built-with-fern-jlhehr?file=app.ts&view=editor"><img src="https://developer.stackblitz.com/img/open_in_stackblitz.svg">

```typescript
import { HumeBatchClient } from "hume";

const client = new HumeBatchClient({
    apiKey: "YOUR_API_KEY",
});

const job = await client.submitJob({
    urls: ["https://tinyurl.com/hume-img"],
    models: {
        face: {},
    },
});

console.log("Running...");
await job.awaitCompletion();
```

## Streaming Client

The SDK exports a streaming client which you can use to hit our WebSocket APIs.

```typescript
import { HumeStreamingClient } from "hume";

const client = new HumeStreamingClient({
    apiKey: "YOUR_API_KEY",
});

const stream = await client.connect({
    configs: {
        language: {},
    },
    onMessage: (response) => {
        if (response.language != null) {
            console.log(response.language.predictions);
        }
    },
    onError: (err) => {
      console.log(err);
    }
});

stream.sendText({
    text: "Mary had a little lamb,"
});
```

## Errors

When the API returns a non-success status code (4xx or 5xx response),
a subclass of [HumeError](./src/errors/HumeError.ts) will be thrown:

```typescript
import { HumeError, HumeTimeoutError } from "hume";

try {
    await hume.submitJob(/* ... */);
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
await hume.submitJob(..., {
    maxRetries: 0, // disable retries
});
```

## Timeouts

By default, the SDK has a timeout of 60s. You can use the `timeoutInSeconds` option to configure
this behavior

```typescript
await hume.submitJob(..., {
    timeoutInSeconds: 10, // timeout after 10 seconds
});
```
