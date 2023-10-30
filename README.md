# Hume Node Library

[![npm shield](https://img.shields.io/npm/v/@fern-api/hume)](https://www.npmjs.com/package/@fern-api/hume)
[![fern shield](https://img.shields.io/badge/%F0%9F%8C%BF-SDK%20generated%20by%20Fern-brightgreen)](https://github.com/fern-api/fern)

The Hume Node.js library provides access to the Hume API from JavaScript/TypeScript.

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

```typescript
import { HumeBatchClient } from "@fern-api/hume";

const client = new HumeBatchClient({
  apiKey: '<your-api-key',
});

const job = await client.submitJob({
  urls: ['https://tinyurl.com/hume-img'],
  models: {
    face: {},
  },
});

console.log('Running...');
await job.awaitCompletion();
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
