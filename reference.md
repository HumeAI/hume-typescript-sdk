# Reference

## Tts

<details><summary><code>client.tts.<a href="/src/api/resources/tts/client/Client.ts">synthesizeJson</a>({ ...params }) -> Hume.ReturnTts</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Synthesizes one or more input texts into speech using the specified voice. If no voice is provided, a novel voice will be generated dynamically. Optionally, additional context can be included to influence the speech's style and prosody.

The response includes the base64-encoded audio and metadata in JSON format.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tts.synthesizeJson({
    utterances: [
        {
            text: "Beauty is no quality in things themselves: It exists merely in the mind which contemplates them.",
            description:
                "Middle-aged masculine voice with a clear, rhythmic Scots lilt, rounded vowels, and a warm,  steady tone with an articulate, academic quality.",
        },
    ],
    context: {
        utterances: [
            {
                text: "How can people see beauty so differently?",
                description:
                    "A curious student with a clear and respectful tone, seeking clarification on Hume's  ideas with a straightforward question.",
            },
        ],
    },
    format: {
        type: "mp3",
    },
    numGenerations: 1,
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Hume.PostedTts`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Tts.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.tts.<a href="/src/api/resources/tts/client/Client.ts">synthesizeFile</a>({ ...params }) -> stream.Readable</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Synthesizes one or more input texts into speech using the specified voice. If no voice is provided, a novel voice will be generated dynamically. Optionally, additional context can be included to influence the speech's style and prosody.

The response contains the generated audio file in the requested format.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tts.synthesizeFile({
    utterances: [
        {
            text: "Beauty is no quality in things themselves: It exists merely in the mind which contemplates them.",
            description:
                "Middle-aged masculine voice with a clear, rhythmic Scots lilt, rounded vowels, and a warm,  steady tone with an articulate, academic quality.",
        },
    ],
    context: {
        generationId: "09ad914d-8e7f-40f8-a279-e34f07f7dab2",
    },
    format: {
        type: "mp3",
    },
    numGenerations: 1,
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Hume.PostedTts`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Tts.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.tts.<a href="/src/api/resources/tts/client/Client.ts">synthesizeFileStreaming</a>({ ...params }) -> stream.Readable</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Streams synthesized speech using the specified voice. If no voice is provided, a novel voice will be generated dynamically. Optionally, additional context can be included to influence the speech's style and prosody.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tts.synthesizeFileStreaming({
    utterances: [
        {
            text: "Beauty is no quality in things themselves: It exists merely in the mind which contemplates them.",
            description:
                "Middle-aged masculine voice with a clear, rhythmic Scots lilt, rounded vowels, and a warm,  steady tone with an articulate, academic quality.",
        },
    ],
    context: {
        generationId: "09ad914d-8e7f-40f8-a279-e34f07f7dab2",
    },
    format: {
        type: "mp3",
    },
    numGenerations: 1,
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Hume.PostedTts`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Tts.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.tts.<a href="/src/api/resources/tts/client/Client.ts">synthesizeJsonStreaming</a>({ ...params }) -> core.Stream<Hume.SnippetAudioChunk></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Streams synthesized speech using the specified voice. If no voice is provided, a novel voice will be generated dynamically. Optionally, additional context can be included to influence the speech's style and prosody.

The response is a stream of JSON objects including audio encoded in base64.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.tts.synthesizeJsonStreaming({
    utterances: [
        {
            text: "Beauty is no quality in things themselves: It exists merely in the mind which contemplates them.",
            description:
                "Middle-aged masculine voice with a clear, rhythmic Scots lilt, rounded vowels, and a warm,  steady tone with an articulate, academic quality.",
        },
    ],
    context: {
        utterances: [
            {
                text: "How can people see beauty so differently?",
                description:
                    "A curious student with a clear and respectful tone, seeking clarification on Hume's  ideas with a straightforward question.",
            },
        ],
    },
    format: {
        type: "mp3",
    },
});
for await (const item of response) {
    console.log(item);
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Hume.PostedTts`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Tts.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## Tts Voices

<details><summary><code>client.tts.voices.<a href="/src/api/resources/tts/resources/voices/client/Client.ts">list</a>({ ...params }) -> core.Page<Hume.ReturnVoice></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Lists voices in your **Voice Library**. Set provider to `HUME_AI` to list Hume's preset voices, or to `CUSTOM_VOICE` to a custom voice created in your account.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.tts.voices.list({
    provider: "CUSTOM_VOICE",
});
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.tts.voices.list({
    provider: "CUSTOM_VOICE",
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Hume.tts.VoicesListRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Voices.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.tts.voices.<a href="/src/api/resources/tts/resources/voices/client/Client.ts">create</a>({ ...params }) -> Hume.ReturnVoice</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Creates a new voice from a specified TTS generation ID and saves it to your **Voice Library**. This allows for consistent speech style and prosody across multiple requests.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tts.voices.create({
    generationId: "795c949a-1510-4a80-9646-7d0863b023ab",
    name: "David Hume",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Hume.tts.PostedVoice`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Voices.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.tts.voices.<a href="/src/api/resources/tts/resources/voices/client/Client.ts">delete</a>({ ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Removes a custom voice from your **Voice Library**.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tts.voices.delete({
    name: "David Hume",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Hume.tts.VoicesDeleteRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Voices.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## EmpathicVoice Tools

<details><summary><code>client.empathicVoice.tools.<a href="/src/api/resources/empathicVoice/resources/tools/client/Client.ts">listTools</a>({ ...params }) -> core.Page<Hume.ReturnUserDefinedTool | undefined></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Fetches a paginated list of **Tools**.

Refer to our [tool use](/docs/empathic-voice-interface-evi/features/tool-use#function-calling) guide for comprehensive instructions on defining and integrating tools into EVI.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.empathicVoice.tools.listTools({
    pageNumber: 0,
    pageSize: 2,
});
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.empathicVoice.tools.listTools({
    pageNumber: 0,
    pageSize: 2,
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Hume.empathicVoice.ToolsListToolsRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Tools.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.empathicVoice.tools.<a href="/src/api/resources/empathicVoice/resources/tools/client/Client.ts">createTool</a>({ ...params }) -> Hume.ReturnUserDefinedTool | undefined</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Creates a **Tool** that can be added to an [EVI configuration](/reference/empathic-voice-interface-evi/configs/create-config).

Refer to our [tool use](/docs/empathic-voice-interface-evi/features/tool-use#function-calling) guide for comprehensive instructions on defining and integrating tools into EVI.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.tools.createTool({
    name: "get_current_weather",
    parameters:
        '{ "type": "object", "properties": { "location": { "type": "string", "description": "The city and state, e.g. San Francisco, CA" }, "format": { "type": "string", "enum": ["celsius", "fahrenheit"], "description": "The temperature unit to use. Infer this from the users location." } }, "required": ["location", "format"] }',
    versionDescription: "Fetches current weather and uses celsius or fahrenheit based on location of user.",
    description: "This tool is for getting the current weather.",
    fallbackContent: "Unable to fetch current weather.",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Hume.empathicVoice.PostedUserDefinedTool`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Tools.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.empathicVoice.tools.<a href="/src/api/resources/empathicVoice/resources/tools/client/Client.ts">listToolVersions</a>(id, { ...params }) -> core.Page<Hume.ReturnUserDefinedTool | undefined></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Fetches a list of a **Tool's** versions.

Refer to our [tool use](/docs/empathic-voice-interface-evi/features/tool-use#function-calling) guide for comprehensive instructions on defining and integrating tools into EVI.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.empathicVoice.tools.listToolVersions("00183a3f-79ba-413d-9f3b-609864268bea");
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.empathicVoice.tools.listToolVersions("00183a3f-79ba-413d-9f3b-609864268bea");
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Identifier for a Tool. Formatted as a UUID.

</dd>
</dl>

<dl>
<dd>

**request:** `Hume.empathicVoice.ToolsListToolVersionsRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Tools.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.empathicVoice.tools.<a href="/src/api/resources/empathicVoice/resources/tools/client/Client.ts">createToolVersion</a>(id, { ...params }) -> Hume.ReturnUserDefinedTool | undefined</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Updates a **Tool** by creating a new version of the **Tool**.

Refer to our [tool use](/docs/empathic-voice-interface-evi/features/tool-use#function-calling) guide for comprehensive instructions on defining and integrating tools into EVI.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.tools.createToolVersion("00183a3f-79ba-413d-9f3b-609864268bea", {
    parameters:
        '{ "type": "object", "properties": { "location": { "type": "string", "description": "The city and state, e.g. San Francisco, CA" }, "format": { "type": "string", "enum": ["celsius", "fahrenheit", "kelvin"], "description": "The temperature unit to use. Infer this from the users location." } }, "required": ["location", "format"] }',
    versionDescription: "Fetches current weather and uses celsius, fahrenheit, or kelvin based on location of user.",
    fallbackContent: "Unable to fetch current weather.",
    description: "This tool is for getting the current weather.",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Identifier for a Tool. Formatted as a UUID.

</dd>
</dl>

<dl>
<dd>

**request:** `Hume.empathicVoice.PostedUserDefinedToolVersion`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Tools.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.empathicVoice.tools.<a href="/src/api/resources/empathicVoice/resources/tools/client/Client.ts">deleteTool</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Deletes a **Tool** and its versions.

Refer to our [tool use](/docs/empathic-voice-interface-evi/features/tool-use#function-calling) guide for comprehensive instructions on defining and integrating tools into EVI.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.tools.deleteTool("00183a3f-79ba-413d-9f3b-609864268bea");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Identifier for a Tool. Formatted as a UUID.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Tools.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.empathicVoice.tools.<a href="/src/api/resources/empathicVoice/resources/tools/client/Client.ts">updateToolName</a>(id, { ...params }) -> string</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Updates the name of a **Tool**.

Refer to our [tool use](/docs/empathic-voice-interface-evi/features/tool-use#function-calling) guide for comprehensive instructions on defining and integrating tools into EVI.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.tools.updateToolName("00183a3f-79ba-413d-9f3b-609864268bea", {
    name: "get_current_temperature",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Identifier for a Tool. Formatted as a UUID.

</dd>
</dl>

<dl>
<dd>

**request:** `Hume.empathicVoice.PostedUserDefinedToolName`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Tools.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.empathicVoice.tools.<a href="/src/api/resources/empathicVoice/resources/tools/client/Client.ts">getToolVersion</a>(id, version) -> Hume.ReturnUserDefinedTool | undefined</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Fetches a specified version of a **Tool**.

Refer to our [tool use](/docs/empathic-voice-interface-evi/features/tool-use#function-calling) guide for comprehensive instructions on defining and integrating tools into EVI.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.tools.getToolVersion("00183a3f-79ba-413d-9f3b-609864268bea", 1);
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Identifier for a Tool. Formatted as a UUID.

</dd>
</dl>

<dl>
<dd>

**version:** `number`

Version number for a Tool.

Tools, Configs, Custom Voices, and Prompts are versioned. This versioning system supports iterative development, allowing you to progressively refine tools and revert to previous versions if needed.

Version numbers are integer values representing different iterations of the Tool. Each update to the Tool increments its version number.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Tools.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.empathicVoice.tools.<a href="/src/api/resources/empathicVoice/resources/tools/client/Client.ts">deleteToolVersion</a>(id, version) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Deletes a specified version of a **Tool**.

Refer to our [tool use](/docs/empathic-voice-interface-evi/features/tool-use#function-calling) guide for comprehensive instructions on defining and integrating tools into EVI.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.tools.deleteToolVersion("00183a3f-79ba-413d-9f3b-609864268bea", 1);
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Identifier for a Tool. Formatted as a UUID.

</dd>
</dl>

<dl>
<dd>

**version:** `number`

Version number for a Tool.

Tools, Configs, Custom Voices, and Prompts are versioned. This versioning system supports iterative development, allowing you to progressively refine tools and revert to previous versions if needed.

Version numbers are integer values representing different iterations of the Tool. Each update to the Tool increments its version number.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Tools.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.empathicVoice.tools.<a href="/src/api/resources/empathicVoice/resources/tools/client/Client.ts">updateToolDescription</a>(id, version, { ...params }) -> Hume.ReturnUserDefinedTool | undefined</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Updates the description of a specified **Tool** version.

Refer to our [tool use](/docs/empathic-voice-interface-evi/features/tool-use#function-calling) guide for comprehensive instructions on defining and integrating tools into EVI.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.tools.updateToolDescription("00183a3f-79ba-413d-9f3b-609864268bea", 1, {
    versionDescription:
        "Fetches current temperature, precipitation, wind speed, AQI, and other weather conditions. Uses Celsius, Fahrenheit, or kelvin depending on user's region.",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Identifier for a Tool. Formatted as a UUID.

</dd>
</dl>

<dl>
<dd>

**version:** `number`

Version number for a Tool.

Tools, Configs, Custom Voices, and Prompts are versioned. This versioning system supports iterative development, allowing you to progressively refine tools and revert to previous versions if needed.

Version numbers are integer values representing different iterations of the Tool. Each update to the Tool increments its version number.

</dd>
</dl>

<dl>
<dd>

**request:** `Hume.empathicVoice.PostedUserDefinedToolVersionDescription`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Tools.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## EmpathicVoice Prompts

<details><summary><code>client.empathicVoice.prompts.<a href="/src/api/resources/empathicVoice/resources/prompts/client/Client.ts">listPrompts</a>({ ...params }) -> core.Page<Hume.ReturnPrompt | undefined></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Fetches a paginated list of **Prompts**.

See our [prompting guide](/docs/empathic-voice-interface-evi/guides/phone-calling) for tips on crafting your system prompt.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.empathicVoice.prompts.listPrompts({
    pageNumber: 0,
    pageSize: 2,
});
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.empathicVoice.prompts.listPrompts({
    pageNumber: 0,
    pageSize: 2,
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Hume.empathicVoice.PromptsListPromptsRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Prompts.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.empathicVoice.prompts.<a href="/src/api/resources/empathicVoice/resources/prompts/client/Client.ts">createPrompt</a>({ ...params }) -> Hume.ReturnPrompt | undefined</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Creates a **Prompt** that can be added to an [EVI configuration](/reference/empathic-voice-interface-evi/configs/create-config).

See our [prompting guide](/docs/empathic-voice-interface-evi/guides/phone-calling) for tips on crafting your system prompt.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.prompts.createPrompt({
    name: "Weather Assistant Prompt",
    text: "<role>You are an AI weather assistant providing users with accurate and up-to-date weather information. Respond to user queries concisely and clearly. Use simple language and avoid technical jargon. Provide temperature, precipitation, wind conditions, and any weather alerts. Include helpful tips if severe weather is expected.</role>",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Hume.empathicVoice.PostedPrompt`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Prompts.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.empathicVoice.prompts.<a href="/src/api/resources/empathicVoice/resources/prompts/client/Client.ts">listPromptVersions</a>(id, { ...params }) -> Hume.ReturnPagedPrompts</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Fetches a list of a **Prompt's** versions.

See our [prompting guide](/docs/empathic-voice-interface-evi/guides/phone-calling) for tips on crafting your system prompt.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.prompts.listPromptVersions("af699d45-2985-42cc-91b9-af9e5da3bac5");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Identifier for a Prompt. Formatted as a UUID.

</dd>
</dl>

<dl>
<dd>

**request:** `Hume.empathicVoice.PromptsListPromptVersionsRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Prompts.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.empathicVoice.prompts.<a href="/src/api/resources/empathicVoice/resources/prompts/client/Client.ts">createPromptVersion</a>(id, { ...params }) -> Hume.ReturnPrompt | undefined</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Updates a **Prompt** by creating a new version of the **Prompt**.

See our [prompting guide](/docs/empathic-voice-interface-evi/guides/phone-calling) for tips on crafting your system prompt.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.prompts.createPromptVersion("af699d45-2985-42cc-91b9-af9e5da3bac5", {
    text: "<role>You are an updated version of an AI weather assistant providing users with accurate and up-to-date weather information. Respond to user queries concisely and clearly. Use simple language and avoid technical jargon. Provide temperature, precipitation, wind conditions, and any weather alerts. Include helpful tips if severe weather is expected.</role>",
    versionDescription: "This is an updated version of the Weather Assistant Prompt.",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Identifier for a Prompt. Formatted as a UUID.

</dd>
</dl>

<dl>
<dd>

**request:** `Hume.empathicVoice.PostedPromptVersion`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Prompts.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.empathicVoice.prompts.<a href="/src/api/resources/empathicVoice/resources/prompts/client/Client.ts">deletePrompt</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Deletes a **Prompt** and its versions.

See our [prompting guide](/docs/empathic-voice-interface-evi/guides/phone-calling) for tips on crafting your system prompt.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.prompts.deletePrompt("af699d45-2985-42cc-91b9-af9e5da3bac5");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Identifier for a Prompt. Formatted as a UUID.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Prompts.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.empathicVoice.prompts.<a href="/src/api/resources/empathicVoice/resources/prompts/client/Client.ts">updatePromptName</a>(id, { ...params }) -> string</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Updates the name of a **Prompt**.

See our [prompting guide](/docs/empathic-voice-interface-evi/guides/phone-calling) for tips on crafting your system prompt.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.prompts.updatePromptName("af699d45-2985-42cc-91b9-af9e5da3bac5", {
    name: "Updated Weather Assistant Prompt Name",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Identifier for a Prompt. Formatted as a UUID.

</dd>
</dl>

<dl>
<dd>

**request:** `Hume.empathicVoice.PostedPromptName`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Prompts.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.empathicVoice.prompts.<a href="/src/api/resources/empathicVoice/resources/prompts/client/Client.ts">getPromptVersion</a>(id, version) -> Hume.ReturnPrompt | undefined</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Fetches a specified version of a **Prompt**.

See our [prompting guide](/docs/empathic-voice-interface-evi/guides/phone-calling) for tips on crafting your system prompt.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.prompts.getPromptVersion("af699d45-2985-42cc-91b9-af9e5da3bac5", 0);
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Identifier for a Prompt. Formatted as a UUID.

</dd>
</dl>

<dl>
<dd>

**version:** `number`

Version number for a Prompt.

Prompts, Configs, Custom Voices, and Tools are versioned. This versioning system supports iterative development, allowing you to progressively refine prompts and revert to previous versions if needed.

Version numbers are integer values representing different iterations of the Prompt. Each update to the Prompt increments its version number.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Prompts.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.empathicVoice.prompts.<a href="/src/api/resources/empathicVoice/resources/prompts/client/Client.ts">deletePromptVersion</a>(id, version) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Deletes a specified version of a **Prompt**.

See our [prompting guide](/docs/empathic-voice-interface-evi/guides/phone-calling) for tips on crafting your system prompt.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.prompts.deletePromptVersion("af699d45-2985-42cc-91b9-af9e5da3bac5", 1);
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Identifier for a Prompt. Formatted as a UUID.

</dd>
</dl>

<dl>
<dd>

**version:** `number`

Version number for a Prompt.

Prompts, Configs, Custom Voices, and Tools are versioned. This versioning system supports iterative development, allowing you to progressively refine prompts and revert to previous versions if needed.

Version numbers are integer values representing different iterations of the Prompt. Each update to the Prompt increments its version number.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Prompts.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.empathicVoice.prompts.<a href="/src/api/resources/empathicVoice/resources/prompts/client/Client.ts">updatePromptDescription</a>(id, version, { ...params }) -> Hume.ReturnPrompt | undefined</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Updates the description of a **Prompt**.

See our [prompting guide](/docs/empathic-voice-interface-evi/guides/phone-calling) for tips on crafting your system prompt.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.prompts.updatePromptDescription("af699d45-2985-42cc-91b9-af9e5da3bac5", 1, {
    versionDescription: "This is an updated version_description.",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Identifier for a Prompt. Formatted as a UUID.

</dd>
</dl>

<dl>
<dd>

**version:** `number`

Version number for a Prompt.

Prompts, Configs, Custom Voices, and Tools are versioned. This versioning system supports iterative development, allowing you to progressively refine prompts and revert to previous versions if needed.

Version numbers are integer values representing different iterations of the Prompt. Each update to the Prompt increments its version number.

</dd>
</dl>

<dl>
<dd>

**request:** `Hume.empathicVoice.PostedPromptVersionDescription`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Prompts.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## EmpathicVoice CustomVoices

<details><summary><code>client.empathicVoice.customVoices.<a href="/src/api/resources/empathicVoice/resources/customVoices/client/Client.ts">listCustomVoices</a>({ ...params }) -> core.Page<Hume.ReturnCustomVoice></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Fetches a paginated list of **Custom Voices**.

Refer to our [voices guide](/docs/empathic-voice-interface-evi/configuration/voices) for details on creating a custom voice.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.empathicVoice.customVoices.listCustomVoices();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.empathicVoice.customVoices.listCustomVoices();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Hume.empathicVoice.CustomVoicesListCustomVoicesRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CustomVoices.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.empathicVoice.customVoices.<a href="/src/api/resources/empathicVoice/resources/customVoices/client/Client.ts">createCustomVoice</a>({ ...params }) -> Hume.ReturnCustomVoice</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Creates a **Custom Voice** that can be added to an [EVI configuration](/reference/empathic-voice-interface-evi/configs/create-config).

Refer to our [voices guide](/docs/empathic-voice-interface-evi/configuration/voices) for details on creating a custom voice.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.customVoices.createCustomVoice({
    name: "name",
    baseVoice: "ITO",
    parameterModel: "20241004-11parameter",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Hume.PostedCustomVoice`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CustomVoices.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.empathicVoice.customVoices.<a href="/src/api/resources/empathicVoice/resources/customVoices/client/Client.ts">getCustomVoice</a>(id) -> Hume.ReturnCustomVoice</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Fetches a specific **Custom Voice** by ID.

Refer to our [voices guide](/docs/empathic-voice-interface-evi/configuration/voices) for details on creating a custom voice.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.customVoices.getCustomVoice("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Identifier for a Custom Voice. Formatted as a UUID.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CustomVoices.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.empathicVoice.customVoices.<a href="/src/api/resources/empathicVoice/resources/customVoices/client/Client.ts">createCustomVoiceVersion</a>(id, { ...params }) -> Hume.ReturnCustomVoice</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Updates a **Custom Voice** by creating a new version of the **Custom Voice**.

Refer to our [voices guide](/docs/empathic-voice-interface-evi/configuration/voices) for details on creating a custom voice.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.customVoices.createCustomVoiceVersion("id", {
    name: "name",
    baseVoice: "ITO",
    parameterModel: "20241004-11parameter",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Identifier for a Custom Voice. Formatted as a UUID.

</dd>
</dl>

<dl>
<dd>

**request:** `Hume.PostedCustomVoice`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CustomVoices.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.empathicVoice.customVoices.<a href="/src/api/resources/empathicVoice/resources/customVoices/client/Client.ts">deleteCustomVoice</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Deletes a **Custom Voice** and its versions.

Refer to our [voices guide](/docs/empathic-voice-interface-evi/configuration/voices) for details on creating a custom voice.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.customVoices.deleteCustomVoice("id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Identifier for a Custom Voice. Formatted as a UUID.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CustomVoices.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.empathicVoice.customVoices.<a href="/src/api/resources/empathicVoice/resources/customVoices/client/Client.ts">updateCustomVoiceName</a>(id, { ...params }) -> string</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Updates the name of a **Custom Voice**.

Refer to our [voices guide](/docs/empathic-voice-interface-evi/configuration/voices) for details on creating a custom voice.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.customVoices.updateCustomVoiceName("id", {
    name: "name",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Identifier for a Custom Voice. Formatted as a UUID.

</dd>
</dl>

<dl>
<dd>

**request:** `Hume.empathicVoice.PostedCustomVoiceName`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `CustomVoices.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## EmpathicVoice Configs

<details><summary><code>client.empathicVoice.configs.<a href="/src/api/resources/empathicVoice/resources/configs/client/Client.ts">listConfigs</a>({ ...params }) -> core.Page<Hume.ReturnConfig></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Fetches a paginated list of **Configs**.

For more details on configuration options and how to configure EVI, see our [configuration guide](/docs/empathic-voice-interface-evi/configuration).

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.empathicVoice.configs.listConfigs({
    pageNumber: 0,
    pageSize: 1,
});
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.empathicVoice.configs.listConfigs({
    pageNumber: 0,
    pageSize: 1,
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Hume.empathicVoice.ConfigsListConfigsRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Configs.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.empathicVoice.configs.<a href="/src/api/resources/empathicVoice/resources/configs/client/Client.ts">createConfig</a>({ ...params }) -> Hume.ReturnConfig</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Creates a **Config** which can be applied to EVI.

For more details on configuration options and how to configure EVI, see our [configuration guide](/docs/empathic-voice-interface-evi/configuration).

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.configs.createConfig({
    name: "Weather Assistant Config",
    prompt: {
        id: "af699d45-2985-42cc-91b9-af9e5da3bac5",
        version: 0,
    },
    eviVersion: "2",
    voice: {
        provider: "HUME_AI",
        name: "SAMPLE VOICE",
    },
    languageModel: {
        modelProvider: "ANTHROPIC",
        modelResource: "claude-3-7-sonnet-latest",
        temperature: 1,
    },
    eventMessages: {
        onNewChat: {
            enabled: false,
            text: "",
        },
        onInactivityTimeout: {
            enabled: false,
            text: "",
        },
        onMaxDurationTimeout: {
            enabled: false,
            text: "",
        },
    },
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Hume.empathicVoice.PostedConfig`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Configs.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.empathicVoice.configs.<a href="/src/api/resources/empathicVoice/resources/configs/client/Client.ts">listConfigVersions</a>(id, { ...params }) -> core.Page<Hume.ReturnConfig></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Fetches a list of a **Config's** versions.

For more details on configuration options and how to configure EVI, see our [configuration guide](/docs/empathic-voice-interface-evi/configuration).

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.empathicVoice.configs.listConfigVersions("1b60e1a0-cc59-424a-8d2c-189d354db3f3");
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.empathicVoice.configs.listConfigVersions("1b60e1a0-cc59-424a-8d2c-189d354db3f3");
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Identifier for a Config. Formatted as a UUID.

</dd>
</dl>

<dl>
<dd>

**request:** `Hume.empathicVoice.ConfigsListConfigVersionsRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Configs.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.empathicVoice.configs.<a href="/src/api/resources/empathicVoice/resources/configs/client/Client.ts">createConfigVersion</a>(id, { ...params }) -> Hume.ReturnConfig</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Updates a **Config** by creating a new version of the **Config**.

For more details on configuration options and how to configure EVI, see our [configuration guide](/docs/empathic-voice-interface-evi/configuration).

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.configs.createConfigVersion("1b60e1a0-cc59-424a-8d2c-189d354db3f3", {
    versionDescription: "This is an updated version of the Weather Assistant Config.",
    eviVersion: "2",
    prompt: {
        id: "af699d45-2985-42cc-91b9-af9e5da3bac5",
        version: 0,
    },
    voice: {
        provider: "HUME_AI",
        name: "ITO",
    },
    languageModel: {
        modelProvider: "ANTHROPIC",
        modelResource: "claude-3-7-sonnet-latest",
        temperature: 1,
    },
    ellmModel: {
        allowShortResponses: true,
    },
    eventMessages: {
        onNewChat: {
            enabled: false,
            text: "",
        },
        onInactivityTimeout: {
            enabled: false,
            text: "",
        },
        onMaxDurationTimeout: {
            enabled: false,
            text: "",
        },
    },
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Identifier for a Config. Formatted as a UUID.

</dd>
</dl>

<dl>
<dd>

**request:** `Hume.empathicVoice.PostedConfigVersion`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Configs.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.empathicVoice.configs.<a href="/src/api/resources/empathicVoice/resources/configs/client/Client.ts">deleteConfig</a>(id) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Deletes a **Config** and its versions.

For more details on configuration options and how to configure EVI, see our [configuration guide](/docs/empathic-voice-interface-evi/configuration).

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.configs.deleteConfig("1b60e1a0-cc59-424a-8d2c-189d354db3f3");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Identifier for a Config. Formatted as a UUID.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Configs.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.empathicVoice.configs.<a href="/src/api/resources/empathicVoice/resources/configs/client/Client.ts">updateConfigName</a>(id, { ...params }) -> string</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Updates the name of a **Config**.

For more details on configuration options and how to configure EVI, see our [configuration guide](/docs/empathic-voice-interface-evi/configuration).

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.configs.updateConfigName("1b60e1a0-cc59-424a-8d2c-189d354db3f3", {
    name: "Updated Weather Assistant Config Name",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Identifier for a Config. Formatted as a UUID.

</dd>
</dl>

<dl>
<dd>

**request:** `Hume.empathicVoice.PostedConfigName`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Configs.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.empathicVoice.configs.<a href="/src/api/resources/empathicVoice/resources/configs/client/Client.ts">getConfigVersion</a>(id, version) -> Hume.ReturnConfig</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Fetches a specified version of a **Config**.

For more details on configuration options and how to configure EVI, see our [configuration guide](/docs/empathic-voice-interface-evi/configuration).

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.configs.getConfigVersion("1b60e1a0-cc59-424a-8d2c-189d354db3f3", 1);
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Identifier for a Config. Formatted as a UUID.

</dd>
</dl>

<dl>
<dd>

**version:** `number`

Version number for a Config.

Configs, Prompts, Custom Voices, and Tools are versioned. This versioning system supports iterative development, allowing you to progressively refine configurations and revert to previous versions if needed.

Version numbers are integer values representing different iterations of the Config. Each update to the Config increments its version number.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Configs.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.empathicVoice.configs.<a href="/src/api/resources/empathicVoice/resources/configs/client/Client.ts">deleteConfigVersion</a>(id, version) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Deletes a specified version of a **Config**.

For more details on configuration options and how to configure EVI, see our [configuration guide](/docs/empathic-voice-interface-evi/configuration).

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.configs.deleteConfigVersion("1b60e1a0-cc59-424a-8d2c-189d354db3f3", 1);
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Identifier for a Config. Formatted as a UUID.

</dd>
</dl>

<dl>
<dd>

**version:** `number`

Version number for a Config.

Configs, Prompts, Custom Voices, and Tools are versioned. This versioning system supports iterative development, allowing you to progressively refine configurations and revert to previous versions if needed.

Version numbers are integer values representing different iterations of the Config. Each update to the Config increments its version number.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Configs.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.empathicVoice.configs.<a href="/src/api/resources/empathicVoice/resources/configs/client/Client.ts">updateConfigDescription</a>(id, version, { ...params }) -> Hume.ReturnConfig</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Updates the description of a **Config**.

For more details on configuration options and how to configure EVI, see our [configuration guide](/docs/empathic-voice-interface-evi/configuration).

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.configs.updateConfigDescription("1b60e1a0-cc59-424a-8d2c-189d354db3f3", 1, {
    versionDescription: "This is an updated version_description.",
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Identifier for a Config. Formatted as a UUID.

</dd>
</dl>

<dl>
<dd>

**version:** `number`

Version number for a Config.

Configs, Prompts, Custom Voices, and Tools are versioned. This versioning system supports iterative development, allowing you to progressively refine configurations and revert to previous versions if needed.

Version numbers are integer values representing different iterations of the Config. Each update to the Config increments its version number.

</dd>
</dl>

<dl>
<dd>

**request:** `Hume.empathicVoice.PostedConfigVersionDescription`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Configs.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## EmpathicVoice Chats

<details><summary><code>client.empathicVoice.chats.<a href="/src/api/resources/empathicVoice/resources/chats/client/Client.ts">listChats</a>({ ...params }) -> core.Page<Hume.ReturnChat></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Fetches a paginated list of **Chats**.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.empathicVoice.chats.listChats({
    pageNumber: 0,
    pageSize: 1,
    ascendingOrder: true,
});
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.empathicVoice.chats.listChats({
    pageNumber: 0,
    pageSize: 1,
    ascendingOrder: true,
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Hume.empathicVoice.ChatsListChatsRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Chats.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.empathicVoice.chats.<a href="/src/api/resources/empathicVoice/resources/chats/client/Client.ts">listChatEvents</a>(id, { ...params }) -> core.Page<Hume.ReturnChatEvent></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Fetches a paginated list of **Chat** events.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.empathicVoice.chats.listChatEvents("470a49f6-1dec-4afe-8b61-035d3b2d63b0", {
    pageNumber: 0,
    pageSize: 3,
    ascendingOrder: true,
});
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.empathicVoice.chats.listChatEvents("470a49f6-1dec-4afe-8b61-035d3b2d63b0", {
    pageNumber: 0,
    pageSize: 3,
    ascendingOrder: true,
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Identifier for a Chat. Formatted as a UUID.

</dd>
</dl>

<dl>
<dd>

**request:** `Hume.empathicVoice.ChatsListChatEventsRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Chats.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.empathicVoice.chats.<a href="/src/api/resources/empathicVoice/resources/chats/client/Client.ts">getAudio</a>(id) -> Hume.ReturnChatAudioReconstruction</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Fetches the audio of a previous **Chat**. For more details, see our guide on audio reconstruction [here](/docs/empathic-voice-interface-evi/faq#can-i-access-the-audio-of-previous-conversations-with-evi).

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.chats.getAudio("470a49f6-1dec-4afe-8b61-035d3b2d63b0");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Identifier for a chat. Formatted as a UUID.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Chats.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## EmpathicVoice ChatGroups

<details><summary><code>client.empathicVoice.chatGroups.<a href="/src/api/resources/empathicVoice/resources/chatGroups/client/Client.ts">listChatGroups</a>({ ...params }) -> core.Page<Hume.ReturnChatGroup></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Fetches a paginated list of **Chat Groups**.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.empathicVoice.chatGroups.listChatGroups({
    pageNumber: 0,
    pageSize: 1,
    ascendingOrder: true,
    configId: "1b60e1a0-cc59-424a-8d2c-189d354db3f3",
});
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.empathicVoice.chatGroups.listChatGroups({
    pageNumber: 0,
    pageSize: 1,
    ascendingOrder: true,
    configId: "1b60e1a0-cc59-424a-8d2c-189d354db3f3",
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Hume.empathicVoice.ChatGroupsListChatGroupsRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ChatGroups.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.empathicVoice.chatGroups.<a href="/src/api/resources/empathicVoice/resources/chatGroups/client/Client.ts">getChatGroup</a>(id, { ...params }) -> Hume.ReturnChatGroupPagedChats</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Fetches a **ChatGroup** by ID, including a paginated list of **Chats** associated with the **ChatGroup**.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.chatGroups.getChatGroup("697056f0-6c7e-487d-9bd8-9c19df79f05f", {
    pageNumber: 0,
    pageSize: 1,
    ascendingOrder: true,
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Identifier for a Chat Group. Formatted as a UUID.

</dd>
</dl>

<dl>
<dd>

**request:** `Hume.empathicVoice.ChatGroupsGetChatGroupRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ChatGroups.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.empathicVoice.chatGroups.<a href="/src/api/resources/empathicVoice/resources/chatGroups/client/Client.ts">listChatGroupEvents</a>(id, { ...params }) -> core.Page<Hume.ReturnChatEvent></code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Fetches a paginated list of **Chat** events associated with a **Chat Group**.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.empathicVoice.chatGroups.listChatGroupEvents("697056f0-6c7e-487d-9bd8-9c19df79f05f", {
    pageNumber: 0,
    pageSize: 3,
    ascendingOrder: true,
});
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.empathicVoice.chatGroups.listChatGroupEvents("697056f0-6c7e-487d-9bd8-9c19df79f05f", {
    pageNumber: 0,
    pageSize: 3,
    ascendingOrder: true,
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Identifier for a Chat Group. Formatted as a UUID.

</dd>
</dl>

<dl>
<dd>

**request:** `Hume.empathicVoice.ChatGroupsListChatGroupEventsRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ChatGroups.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.empathicVoice.chatGroups.<a href="/src/api/resources/empathicVoice/resources/chatGroups/client/Client.ts">getAudio</a>(id, { ...params }) -> Hume.ReturnChatGroupPagedAudioReconstructions</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Fetches a paginated list of audio for each **Chat** within the specified **Chat Group**. For more details, see our guide on audio reconstruction [here](/docs/empathic-voice-interface-evi/faq#can-i-access-the-audio-of-previous-conversations-with-evi).

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.chatGroups.getAudio("369846cf-6ad5-404d-905e-a8acb5cdfc78", {
    pageNumber: 0,
    pageSize: 10,
    ascendingOrder: true,
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — Identifier for a Chat Group. Formatted as a UUID.

</dd>
</dl>

<dl>
<dd>

**request:** `Hume.empathicVoice.ChatGroupsGetAudioRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ChatGroups.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

## ExpressionMeasurement Batch

<details><summary><code>client.expressionMeasurement.batch.<a href="/src/api/resources/expressionMeasurement/resources/batch/client/Client.ts">listJobs</a>({ ...params }) -> Hume.UnionJob[]</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Sort and filter jobs.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.expressionMeasurement.batch.listJobs();
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Hume.expressionMeasurement.batch.BatchListJobsRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Batch.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.expressionMeasurement.batch.<a href="/src/api/resources/expressionMeasurement/resources/batch/client/Client.ts">startInferenceJob</a>({ ...params }) -> Hume.JobId</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Start a new measurement inference job.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.expressionMeasurement.batch.startInferenceJob({
    urls: ["https://hume-tutorials.s3.amazonaws.com/faces.zip"],
    notify: true,
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Hume.InferenceBaseRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Batch.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.expressionMeasurement.batch.<a href="/src/api/resources/expressionMeasurement/resources/batch/client/Client.ts">getJobDetails</a>(id) -> Hume.UnionJob</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get the request details and state of a given job.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.expressionMeasurement.batch.getJobDetails("job_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The unique identifier for the job.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Batch.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.expressionMeasurement.batch.<a href="/src/api/resources/expressionMeasurement/resources/batch/client/Client.ts">getJobPredictions</a>(id) -> Hume.UnionPredictResult[]</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get the JSON predictions of a completed inference job.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.expressionMeasurement.batch.getJobPredictions("job_id");
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The unique identifier for the job.

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Batch.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.expressionMeasurement.batch.<a href="/src/api/resources/expressionMeasurement/resources/batch/client/Client.ts">startInferenceJobFromLocalFile</a>(file, { ...params }) -> Hume.JobId</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Start a new batch inference job.

</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.expressionMeasurement.batch.startInferenceJobFromLocalFile(
    [fs.createReadStream("/path/to/your/file")],
    {},
);
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**file:** `File[] | fs.ReadStream[] | Blob[]`

</dd>
</dl>

<dl>
<dd>

**request:** `Hume.expressionMeasurement.batch.BatchStartInferenceJobFromLocalFileRequest`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Batch.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>
