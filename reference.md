# Reference

## EmpathicVoice Tools

<details><summary><code>client.empathicVoice.tools.<a href="/src/api/resources/empathicVoice/resources/tools/client/Client.ts">listTools</a>({ ...params }) -> core.Page<Hume.ReturnUserDefinedTool | undefined></code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.tools.listTools({
    pageNumber: 0,
    pageSize: 2,
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

<details><summary><code>client.empathicVoice.tools.<a href="/src/api/resources/empathicVoice/resources/tools/client/Client.ts">listToolVersions</a>(id, { ...params }) -> Hume.ReturnPagedUserDefinedTools</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.tools.listToolVersions("00183a3f-79ba-413d-9f3b-609864268bea");
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

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.prompts.listPrompts({
    pageNumber: 0,
    pageSize: 2,
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

<details><summary><code>client.empathicVoice.prompts.<a href="/src/api/resources/empathicVoice/resources/prompts/client/Client.ts">createPromptVerison</a>(id, { ...params }) -> Hume.ReturnPrompt | undefined</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.prompts.createPromptVerison("af699d45-2985-42cc-91b9-af9e5da3bac5", {
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

<details><summary><code>client.empathicVoice.customVoices.<a href="/src/api/resources/empathicVoice/resources/customVoices/client/Client.ts">getReturnCustomVoicesForUser</a>({ ...params }) -> Hume.ReturnPagedCustomVoices</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.customVoices.getReturnCustomVoicesForUser();
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

**request:** `Hume.empathicVoice.GetReturnCustomVoicesForUserRequest`

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

<details><summary><code>client.empathicVoice.customVoices.<a href="/src/api/resources/empathicVoice/resources/customVoices/client/Client.ts">createNewCustomVoice</a>({ ...params }) -> Hume.ReturnCustomVoice</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.customVoices.createNewCustomVoice({
    name: "name",
    baseVoice: Hume.PostedCustomVoiceBaseVoice.Ito,
    parameterModel: "20240715-4parameter",
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

<details><summary><code>client.empathicVoice.customVoices.<a href="/src/api/resources/empathicVoice/resources/customVoices/client/Client.ts">getReturnCustomVoiceByCustomVoiceId</a>(id) -> Hume.ReturnCustomVoice</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.customVoices.getReturnCustomVoiceByCustomVoiceId("id");
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

<details><summary><code>client.empathicVoice.customVoices.<a href="/src/api/resources/empathicVoice/resources/customVoices/client/Client.ts">addNewCustomVoiceVersion</a>(id, { ...params }) -> Hume.ReturnCustomVoice</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.customVoices.addNewCustomVoiceVersion("id", {
    name: "name",
    baseVoice: Hume.PostedCustomVoiceBaseVoice.Ito,
    parameterModel: "20240715-4parameter",
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

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.customVoices.updateCustomVoiceName("string", {
    name: "string",
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

<details><summary><code>client.empathicVoice.configs.<a href="/src/api/resources/empathicVoice/resources/configs/client/Client.ts">listConfigs</a>({ ...params }) -> Hume.ReturnPagedConfigs</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.configs.listConfigs({
    pageNumber: 0,
    pageSize: 1,
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
        modelProvider: Hume.PostedLanguageModelModelProvider.Anthropic,
        modelResource: "claude-3-5-sonnet-20240620",
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

<details><summary><code>client.empathicVoice.configs.<a href="/src/api/resources/empathicVoice/resources/configs/client/Client.ts">listConfigVersions</a>(id, { ...params }) -> Hume.ReturnPagedConfigs</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.configs.listConfigVersions("1b60e1a0-cc59-424a-8d2c-189d354db3f3");
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
        modelProvider: Hume.PostedLanguageModelModelProvider.Anthropic,
        modelResource: "claude-3-5-sonnet-20240620",
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

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.chats.listChats({
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

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.chats.listChatEvents("470a49f6-1dec-4afe-8b61-035d3b2d63b0", {
    pageNumber: 0,
    pageSize: 3,
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

## EmpathicVoice ChatGroups

<details><summary><code>client.empathicVoice.chatGroups.<a href="/src/api/resources/empathicVoice/resources/chatGroups/client/Client.ts">listChatGroups</a>({ ...params }) -> Hume.ReturnPagedChatGroups</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.chatGroups.listChatGroups({
    pageNumber: 0,
    pageSize: 1,
    ascendingOrder: true,
    configId: "1b60e1a0-cc59-424a-8d2c-189d354db3f3",
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

<details><summary><code>client.empathicVoice.chatGroups.<a href="/src/api/resources/empathicVoice/resources/chatGroups/client/Client.ts">listChatGroupEvents</a>(id, { ...params }) -> Hume.ReturnChatGroupPagedEvents</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.empathicVoice.chatGroups.listChatGroupEvents("697056f0-6c7e-487d-9bd8-9c19df79f05f", {
    pageNumber: 0,
    pageSize: 3,
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

<details><summary><code>client.expressionMeasurement.batch.<a href="/src/api/resources/expressionMeasurement/resources/batch/client/Client.ts">getJobArtifacts</a>(id) -> stream.Readable</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get the artifacts ZIP of a completed inference job.

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
await client.expressionMeasurement.batch.getJobArtifacts("string");
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
    {}
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
