# Hume Node Library

[![npm shield](https://img.shields.io/npm/v/@fern-api/hume)](https://www.npmjs.com/package/@fern-api/hume)
[![fern shield](https://img.shields.io/badge/%F0%9F%8C%BF-SDK%20generated%20by%20Fern-brightgreen)](https://github.com/fern-api/fern)

The Hume Node.js library provides access to the Hume API from JavaScript/TypeScript.

## Documentation

API reference documentation is available [here](https://docs.hume.ai/doc/batch-api).

## Usage

[![Try it out](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/typescript-example-using-sdk-built-with-fern-clt8mx?file=package.json&view=editor)

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

await job.downloadPredictions('predictions.json');
console.log('Predictions downloaded to predictions.json');

await job.downloadArtifacts('artifacts.zip');
console.log('Artifacts downloaded to artifacts.zip');
```

## Beta status

This SDK is in beta, and there may be breaking changes between versions without a major version update. Therefore, we recommend pinning the package version to a specific version in your package.json file. This way, you can install the same version each time without breaking changes unless you are intentionally looking for the latest version.

## Contributing

While we value open-source contributions to this SDK, this library is generated programmatically. Additions made directly to this library would have to be moved over to our generation code, otherwise they would be overwritten upon the next generated release. Feel free to open a PR as a proof of concept, but know that we will not be able to merge it as-is. We suggest opening an issue first to discuss with us!

On the other hand, contributions to the README are always very welcome!
