<div align="center">
  <img src="https://storage.googleapis.com/hume-public-logos/hume/hume-banner.png">
  <h1>Hume AI TypeScript SDK</h1>

  <p>
    <strong>Integrate Hume APIs directly into your Node application or frontend</strong>
  </p>

  <br>
  <div>
    <a href="https://www.npmjs.com/package/@fern-api/hume"><img src="https://img.shields.io/npm/v/@fern-api/hume">
    <a href="https://buildwithfern.com/"><img src="https://img.shields.io/badge/%F0%9F%8C%BF-SDK%20generated%20by%20Fern-brightgreen">     
  </div>
  <br>
</div>

## Documentation

API reference documentation is available [here](https://docs.hume.ai/doc/batch-api).

## Installation

```
npm install --save @fern-api/hume
# or
yarn add @fern-api/hume
```

## Batch Client

The SDK exports a batch client which you can use to hit our REST APIs.

<a href="https://stackblitz.com/edit/typescript-example-using-sdk-built-with-fern-jlhehr?file=app.ts&view=editor"><img src="https://developer.stackblitz.com/img/open_in_stackblitz.svg">

```typescript
import { HumeBatchClient } from "@fern-api/hume";

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
import { HumeStreamingClient } from "@fern-api/hume";

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
import { HumeError, HumeTimeoutError } from "@fern-api/hume";

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

## Beta status

This SDK is in beta, and there may be breaking changes between versions without a major version update. Therefore, we recommend pinning the package version to a specific version in your package.json file. This way, you can install the same version each time without breaking changes unless you are intentionally looking for the latest version.

## Contributing

While we value open-source contributions to this SDK, this library is generated programmatically. Additions made directly to this library would have to be moved over to our generation code, otherwise they would be overwritten upon the next generated release. Feel free to open a PR as a proof of concept, but know that we will not be able to merge it as-is. We suggest opening an issue first to discuss with us!

On the other hand, contributions to the README are always very welcome!
