# Hume TypeScript Library

[![fern shield](https://img.shields.io/badge/%F0%9F%8C%BF-Built%20with%20Fern-brightgreen)](https://buildwithfern.com?utm_source=github&utm_medium=github&utm_campaign=readme&utm_source=https%3A%2F%2Fgithub.com%2Fhumeai%2Fhume-typescript-sdk)
[![npm shield](https://img.shields.io/npm/v/hume)](https://www.npmjs.com/package/hume)

The Hume TypeScript library provides convenient access to the Hume APIs from TypeScript.

## Documentation

API reference documentation is available [here](https://dev.hume.ai/reference/).

## Installation

```sh
npm i -s hume
```

## Reference

A full reference for this library is available [here](https://github.com/humeai/hume-typescript-sdk/blob/HEAD/./reference.md).

## Usage

Instantiate and use the client with the following:

```typescript
import { HumeClient } from "hume";

const client = new HumeClient({ apiKey: "YOUR_API_KEY" });
await client.tts.synthesizeJson({
    context: {
        utterances: [{
                text: "How can people see beauty so differently?",
                description: "A curious student with a clear and respectful tone, seeking clarification on Hume's ideas with a straightforward question."
            }]
    },
    format: {
        type: "mp3"
    },
    numGenerations: 1,
    utterances: [{
            text: "Beauty is no quality in things themselves: It exists merely in the mind which contemplates them.",
            description: "Middle-aged masculine voice with a clear, rhythmic Scots lilt, rounded vowels, and a warm, steady tone with an articulate, academic quality."
        }]
});
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

## Request And Response Types

The SDK exports all request and response types as TypeScript interfaces. Simply import them with the
following namespace:

```typescript
import { Hume } from "hume";

const request: Hume.VoicesListRequest = {
    ...
};
```

## Exception Handling

When the API returns a non-success status code (4xx or 5xx response), a subclass of the following error
will be thrown.

```typescript
import { HumeError } from "hume";

try {
    await client.tts.synthesizeJson(...);
} catch (err) {
    if (err instanceof HumeError) {
        console.log(err.statusCode);
        console.log(err.message);
        console.log(err.body);
        console.log(err.rawResponse);
    }
}
```

## Streaming Response

Some endpoints return streaming responses instead of returning the full response at once.
The SDK uses async iterators, so you can consume the responses using a `for await...of` loop.

```typescript
import { HumeClient } from "hume";

const client = new HumeClient({ apiKey: "YOUR_API_KEY" });
const response = await client.tts.synthesizeJsonStreaming({
    utterances: [{
            text: "Beauty is no quality in things themselves: It exists merely in the mind which contemplates them.",
            voice: {
                name: "Male English Actor",
                provider: "HUME_AI"
            }
        }]
});
for await (const item of response) {
    console.log(item);
}
```

## File Uploads

You can upload files using the client:

```typescript
import { createReadStream } from "fs";
import { HumeClient } from "hume";

const client = new HumeClient({ apiKey: "YOUR_API_KEY" });
const response = await client.tts.convertVoiceJson({});
for await (const item of response) {
    console.log(item);
}
```
The client accepts a variety of types for file upload parameters:
* Stream types: `fs.ReadStream`, `stream.Readable`, and `ReadableStream`
* Buffered types: `Buffer`, `Blob`, `File`, `ArrayBuffer`, `ArrayBufferView`, and `Uint8Array`

### Metadata

You can configure metadata when uploading a file:
```typescript
const file: Uploadable.WithMetadata = {
    data: createReadStream("path/to/file"),
    filename: "my-file",       // optional
    contentType: "audio/mpeg", // optional
    contentLength: 1949,       // optional
};
```

Alternatively, you can upload a file directly from a file path:
```typescript
const file : Uploadable.FromPath = {
    path: "path/to/file",
    filename: "my-file",        // optional
    contentType: "audio/mpeg",  // optional
    contentLength: 1949,        // optional
};
```

The metadata is used to set the `Content-Length`, `Content-Type`, and `Content-Disposition` headers. If not provided, the client will attempt to determine them automatically.
For example, `fs.ReadStream` has a `path` property which the SDK uses to retrieve the file size from the filesystem without loading it into memory.


## Binary Response

You can consume binary data from endpoints using the `BinaryResponse` type which lets you choose how to consume the data:

```typescript
const response = await client.tts.synthesizeFile(...);
const stream: ReadableStream<Uint8Array> = response.stream();
// const arrayBuffer: ArrayBuffer = await response.arrayBuffer();
// const blob: Blob = response.blob();
// const bytes: Uint8Array = response.bytes();
// You can only use the response body once, so you must choose one of the above methods.
// If you want to check if the response body has been used, you can use the following property.
const bodyUsed = response.bodyUsed;
```
<details>
<summary>Save binary response to a file</summary>

<blockquote>
<details>
<summary>Node.js</summary>

<blockquote>
<details>
<summary>ReadableStream (most-efficient)</summary>

```ts
import { createWriteStream } from 'fs';
import { Readable } from 'stream';
import { pipeline } from 'stream/promises';

const response = await client.tts.synthesizeFile(...);

const stream = response.stream();
const nodeStream = Readable.fromWeb(stream);
const writeStream = createWriteStream('path/to/file');

await pipeline(nodeStream, writeStream);
```

</details>
</blockquote>

<blockquote>
<details>
<summary>ArrayBuffer</summary>

```ts
import { writeFile } from 'fs/promises';

const response = await client.tts.synthesizeFile(...);

const arrayBuffer = await response.arrayBuffer();
await writeFile('path/to/file', Buffer.from(arrayBuffer));
```

</details>
</blockquote>

<blockquote>
<details>
<summary>Blob</summary>

```ts
import { writeFile } from 'fs/promises';

const response = await client.tts.synthesizeFile(...);

const blob = await response.blob();
const arrayBuffer = await blob.arrayBuffer();
await writeFile('output.bin', Buffer.from(arrayBuffer));
```

</details>
</blockquote>

<blockquote>
<details>
<summary>Bytes (UIntArray8)</summary>

```ts
import { writeFile } from 'fs/promises';

const response = await client.tts.synthesizeFile(...);

const bytes = await response.bytes();
await writeFile('path/to/file', bytes);
```

</details>
</blockquote>

</details>
</blockquote>

<blockquote>
<details>
<summary>Bun</summary>

<blockquote>
<details>
<summary>ReadableStream (most-efficient)</summary>

```ts
const response = await client.tts.synthesizeFile(...);

const stream = response.stream();
await Bun.write('path/to/file', stream);
```

</details>
</blockquote>

<blockquote>
<details>
<summary>ArrayBuffer</summary>

```ts
const response = await client.tts.synthesizeFile(...);

const arrayBuffer = await response.arrayBuffer();
await Bun.write('path/to/file', arrayBuffer);
```

</details>
</blockquote>

<blockquote>
<details>
<summary>Blob</summary>

```ts
const response = await client.tts.synthesizeFile(...);

const blob = await response.blob();
await Bun.write('path/to/file', blob);
```

</details>
</blockquote>

<blockquote>
<details>
<summary>Bytes (UIntArray8)</summary>

```ts
const response = await client.tts.synthesizeFile(...);

const bytes = await response.bytes();
await Bun.write('path/to/file', bytes);
```

</details>
</blockquote>

</details>
</blockquote>

<blockquote>
<details>
<summary>Deno</summary>

<blockquote>
<details>
<summary>ReadableStream (most-efficient)</summary>

```ts
const response = await client.tts.synthesizeFile(...);

const stream = response.stream();
const file = await Deno.open('path/to/file', { write: true, create: true });
await stream.pipeTo(file.writable);
```

</details>
</blockquote>

<blockquote>
<details>
<summary>ArrayBuffer</summary>

```ts
const response = await client.tts.synthesizeFile(...);

const arrayBuffer = await response.arrayBuffer();
await Deno.writeFile('path/to/file', new Uint8Array(arrayBuffer));
```

</details>
</blockquote>

<blockquote>
<details>
<summary>Blob</summary>

```ts
const response = await client.tts.synthesizeFile(...);

const blob = await response.blob();
const arrayBuffer = await blob.arrayBuffer();
await Deno.writeFile('path/to/file', new Uint8Array(arrayBuffer));
```

</details>
</blockquote>

<blockquote>
<details>
<summary>Bytes (UIntArray8)</summary>

```ts
const response = await client.tts.synthesizeFile(...);

const bytes = await response.bytes();
await Deno.writeFile('path/to/file', bytes);
```

</details>
</blockquote>

</details>
</blockquote>

<blockquote>
<details>
<summary>Browser</summary>

<blockquote>
<details>
<summary>Blob (most-efficient)</summary>

```ts
const response = await client.tts.synthesizeFile(...);

const blob = await response.blob();
const url = URL.createObjectURL(blob);

// trigger download
const a = document.createElement('a');
a.href = url;
a.download = 'filename';
a.click();
URL.revokeObjectURL(url);
```

</details>
</blockquote>

<blockquote>
<details>
<summary>ReadableStream</summary>

```ts
const response = await client.tts.synthesizeFile(...);

const stream = response.stream();
const reader = stream.getReader();
const chunks = [];

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  chunks.push(value);
}

const blob = new Blob(chunks);
const url = URL.createObjectURL(blob);

// trigger download
const a = document.createElement('a');
a.href = url;
a.download = 'filename';
a.click();
URL.revokeObjectURL(url);
```

</details>
</blockquote>

<blockquote>
<details>
<summary>ArrayBuffer</summary>

```ts
const response = await client.tts.synthesizeFile(...);

const arrayBuffer = await response.arrayBuffer();
const blob = new Blob([arrayBuffer]);
const url = URL.createObjectURL(blob);

// trigger download
const a = document.createElement('a');
a.href = url;
a.download = 'filename';
a.click();
URL.revokeObjectURL(url);
```

</details>
</blockquote>

<blockquote>
<details>
<summary>Bytes (UIntArray8)</summary>

```ts
const response = await client.tts.synthesizeFile(...);

const bytes = await response.bytes();
const blob = new Blob([bytes]);
const url = URL.createObjectURL(blob);

// trigger download
const a = document.createElement('a');
a.href = url;
a.download = 'filename';
a.click();
URL.revokeObjectURL(url);
```

</details>
</blockquote>

</details>
</blockquote>

</details>
</blockquote>

<details>
<summary>Convert binary response to text</summary>

<blockquote>
<details>
<summary>ReadableStream</summary>

```ts
const response = await client.tts.synthesizeFile(...);

const stream = response.stream();
const text = await new Response(stream).text();
```

</details>
</blockquote>

<blockquote>
<details>
<summary>ArrayBuffer</summary>

```ts
const response = await client.tts.synthesizeFile(...);

const arrayBuffer = await response.arrayBuffer();
const text = new TextDecoder().decode(arrayBuffer);
```

</details>
</blockquote>

<blockquote>
<details>
<summary>Blob</summary>

```ts
const response = await client.tts.synthesizeFile(...);

const blob = await response.blob();
const text = await blob.text();
```

</details>
</blockquote>

<blockquote>
<details>
<summary>Bytes (UIntArray8)</summary>

```ts
const response = await client.tts.synthesizeFile(...);

const bytes = await response.bytes();
const text = new TextDecoder().decode(bytes);
```

</details>
</blockquote>

</details>

## Pagination

List endpoints are paginated. The SDK provides an iterator so that you can simply loop over the items:

```typescript
import { HumeClient } from "hume";

const client = new HumeClient({ apiKey: "YOUR_API_KEY" });
const pageableResponse = await client.tts.voices.list({
    provider: "CUSTOM_VOICE"
});
for await (const item of pageableResponse) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.tts.voices.list({
    provider: "CUSTOM_VOICE"
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}

// You can also access the underlying response
const response = page.response;
```

## Advanced

### Additional Headers

If you would like to send additional headers as part of the request, use the `headers` request option.

```typescript
const response = await client.tts.synthesizeJson(..., {
    headers: {
        'X-Custom-Header': 'custom value'
    }
});
```

### Additional Query String Parameters

If you would like to send additional query string parameters as part of the request, use the `queryParams` request option.

```typescript
const response = await client.tts.synthesizeJson(..., {
    queryParams: {
        'customQueryParamKey': 'custom query param value'
    }
});
```

### Retries

The SDK is instrumented with automatic retries with exponential backoff. A request will be retried as long
as the request is deemed retryable and the number of retry attempts has not grown larger than the configured
retry limit (default: 2).

A request is deemed retryable when any of the following HTTP status codes is returned:

- [408](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/408) (Timeout)
- [429](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429) (Too Many Requests)
- [5XX](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500) (Internal Server Errors)

Use the `maxRetries` request option to configure this behavior.

```typescript
const response = await client.tts.synthesizeJson(..., {
    maxRetries: 0 // override maxRetries at the request level
});
```

### Timeouts

The SDK defaults to a 60 second timeout. Use the `timeoutInSeconds` option to configure this behavior.

```typescript
const response = await client.tts.synthesizeJson(..., {
    timeoutInSeconds: 30 // override timeout to 30s
});
```

### Aborting Requests

The SDK allows users to abort requests at any point by passing in an abort signal.

```typescript
const controller = new AbortController();
const response = await client.tts.synthesizeJson(..., {
    abortSignal: controller.signal
});
controller.abort(); // aborts the request
```

### Access Raw Response Data

The SDK provides access to raw response data, including headers, through the `.withRawResponse()` method.
The `.withRawResponse()` method returns a promise that results to an object with a `data` and a `rawResponse` property.

```typescript
const { data, rawResponse } = await client.tts.synthesizeJson(...).withRawResponse();

console.log(data);
console.log(rawResponse.headers['X-My-Header']);
```

### Logging

The SDK supports logging. You can configure the logger by passing in a `logging` object to the client options.

```typescript
import { HumeClient, logging } from "hume";

const client = new HumeClient({
    ...
    logging: {
        level: logging.LogLevel.Debug, // defaults to logging.LogLevel.Info
        logger: new logging.ConsoleLogger(), // defaults to ConsoleLogger
        silent: false, // defaults to true, set to false to enable logging
    }
});
```
The `logging` object can have the following properties:
- `level`: The log level to use. Defaults to `logging.LogLevel.Info`.
- `logger`: The logger to use. Defaults to a `logging.ConsoleLogger`.
- `silent`: Whether to silence the logger. Defaults to `true`.

The `level` property can be one of the following values:
- `logging.LogLevel.Debug`
- `logging.LogLevel.Info`
- `logging.LogLevel.Warn`
- `logging.LogLevel.Error`

To provide a custom logger, you can pass in an object that implements the `logging.ILogger` interface.

<details>
<summary>Custom logger examples</summary>

Here's an example using the popular `winston` logging library.
```ts
import winston from 'winston';

const winstonLogger = winston.createLogger({...});

const logger: logging.ILogger = {
    debug: (msg, ...args) => winstonLogger.debug(msg, ...args),
    info: (msg, ...args) => winstonLogger.info(msg, ...args),
    warn: (msg, ...args) => winstonLogger.warn(msg, ...args),
    error: (msg, ...args) => winstonLogger.error(msg, ...args),
};
```

Here's an example using the popular `pino` logging library.

```ts
import pino from 'pino';

const pinoLogger = pino({...});

const logger: logging.ILogger = {
  debug: (msg, ...args) => pinoLogger.debug(args, msg),
  info: (msg, ...args) => pinoLogger.info(args, msg),
  warn: (msg, ...args) => pinoLogger.warn(args, msg),
  error: (msg, ...args) => pinoLogger.error(args, msg),
};
```
</details>


### Runtime Compatibility


The SDK works in the following runtimes:



- Node.js 18+
- Vercel
- Cloudflare Workers
- Deno v1.25+
- Bun 1.0+
- React Native

### Customizing Fetch Client

The SDK provides a way for you to customize the underlying HTTP client / Fetch function. If you're running in an
unsupported environment, this provides a way for you to break glass and ensure the SDK works.

```typescript
import { HumeClient } from "hume";

const client = new HumeClient({
    ...
    fetcher: // provide your implementation here
});
```

## Contributing

While we value open-source contributions to this SDK, this library is generated programmatically.
Additions made directly to this library would have to be moved over to our generation code,
otherwise they would be overwritten upon the next generated release. Feel free to open a PR as
a proof of concept, but know that we will not be able to merge it as-is. We suggest opening
an issue first to discuss with us!

On the other hand, contributions to the README are always very welcome!