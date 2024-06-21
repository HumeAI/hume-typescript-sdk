## CustomModels Files

<details><summary> <code>client.customModels.files.<a href="./src/api/resources/customModels/resources/files/client/Client.ts">listFiles</a>({ ...params }) -> Hume.FilePage</code> </summary>

<dl>

<dd>

#### 📝 Description

<dl>

<dd>

<dl>

<dd>

Returns 200 if successful

</dd>

</dl>

</dd>

</dl>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.customModels.files.listFiles();
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

**request: `Hume.customModels.FilesListFilesRequest`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Files.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.customModels.files.<a href="./src/api/resources/customModels/resources/files/client/Client.ts">createFiles</a>({ ...params }) -> Hume.FileWithAttributes[]</code> </summary>

<dl>

<dd>

#### 📝 Description

<dl>

<dd>

<dl>

<dd>

Returns 201 if successful

</dd>

</dl>

</dd>

</dl>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.customModels.files.createFiles([
    {
        file: {
            name: "name",
            humeStorage: true,
            dataType: "data_type",
        },
    },
]);
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

**request: `Hume.FileWithAttributesInput[]`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Files.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.customModels.files.<a href="./src/api/resources/customModels/resources/files/client/Client.ts">uploadFile</a>(file, attributes) -> Hume.FileWithAttributes</code> </summary>

<dl>

<dd>

#### 📝 Description

<dl>

<dd>

<dl>

<dd>

Upload a file synchronously. Returns 201 if successful. Files must have a name. Files must specify Content-Type. Request bodies, and therefore files, are limited to 100MB

</dd>

</dl>

</dd>

</dl>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.customModels.files.uploadFile(
    fs.createReadStream("/path/to/your/file"),
    fs.createReadStream("/path/to/your/file")
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

**file: `File | fs.ReadStream`**

</dd>

</dl>

<dl>

<dd>

**attributes: `File | fs.ReadStream | undefined`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Files.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.customModels.files.<a href="./src/api/resources/customModels/resources/files/client/Client.ts">getFile</a>(id) -> Hume.FileWithAttributes</code> </summary>

<dl>

<dd>

#### 📝 Description

<dl>

<dd>

<dl>

<dd>

Returns 200 if successful

</dd>

</dl>

</dd>

</dl>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.customModels.files.getFile("id");
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

**id: `string`** — Hume-generated ID of a File

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Files.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.customModels.files.<a href="./src/api/resources/customModels/resources/files/client/Client.ts">deleteFile</a>(id) -> void</code> </summary>

<dl>

<dd>

#### 📝 Description

<dl>

<dd>

<dl>

<dd>

Returns 204 if successful

</dd>

</dl>

</dd>

</dl>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.customModels.files.deleteFile("id");
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

**id: `string`** — Hume-generated ID of a File

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Files.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.customModels.files.<a href="./src/api/resources/customModels/resources/files/client/Client.ts">updateFileName</a>(id, { ...params }) -> Hume.FileWithAttributes</code> </summary>

<dl>

<dd>

#### 📝 Description

<dl>

<dd>

<dl>

<dd>

Returns 200 if successful

</dd>

</dl>

</dd>

</dl>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.customModels.files.updateFileName("id", {
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

**id: `string`** — Hume-generated ID of a File

</dd>

</dl>

<dl>

<dd>

**request: `Hume.customModels.FilesUpdateFileNameRequest`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Files.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.customModels.files.<a href="./src/api/resources/customModels/resources/files/client/Client.ts">getFilePredictions</a>(id) -> void</code> </summary>

<dl>

<dd>

#### 📝 Description

<dl>

<dd>

<dl>

<dd>

Returns 200 if successful

</dd>

</dl>

</dd>

</dl>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.customModels.files.getFilePredictions("id");
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

**id: `string`** — Hume-generated ID of a File

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Files.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

## CustomModels Datasets

<details><summary> <code>client.customModels.datasets.<a href="./src/api/resources/customModels/resources/datasets/client/Client.ts">listDatasets</a>({ ...params }) -> Hume.DatasetPage</code> </summary>

<dl>

<dd>

#### 📝 Description

<dl>

<dd>

<dl>

<dd>

Returns 200 if successful

</dd>

</dl>

</dd>

</dl>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.customModels.datasets.listDatasets();
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

**request: `Hume.customModels.DatasetsListDatasetsRequest`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Datasets.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.customModels.datasets.<a href="./src/api/resources/customModels/resources/datasets/client/Client.ts">createDataset</a>(featureTypes, labelsFile, { ...params }) -> Hume.ReturnDataset</code> </summary>

<dl>

<dd>

#### 📝 Description

<dl>

<dd>

<dl>

<dd>

Returns 201 if successful

</dd>

</dl>

</dd>

</dl>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.customModels.datasets.createDataset(
    fs.createReadStream("/path/to/your/file"),
    fs.createReadStream("/path/to/your/file"),
    {
        name: "name",
    }
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

**featureTypes: `File | fs.ReadStream | undefined`**

</dd>

</dl>

<dl>

<dd>

**labelsFile: `File | fs.ReadStream`**

</dd>

</dl>

<dl>

<dd>

**request: `Hume.customModels.DatasetsCreateDatasetRequest`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Datasets.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.customModels.datasets.<a href="./src/api/resources/customModels/resources/datasets/client/Client.ts">getDataset</a>(id) -> Hume.ReturnDataset</code> </summary>

<dl>

<dd>

#### 📝 Description

<dl>

<dd>

<dl>

<dd>

Returns 200 if successful

</dd>

</dl>

</dd>

</dl>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.customModels.datasets.getDataset("id");
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

**id: `string`** — Hume-generated ID of a Dataset

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Datasets.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.customModels.datasets.<a href="./src/api/resources/customModels/resources/datasets/client/Client.ts">createDatasetVersion</a>(featureTypes, labelsFile, id) -> Hume.ReturnDataset[]</code> </summary>

<dl>

<dd>

#### 📝 Description

<dl>

<dd>

<dl>

<dd>

Returns 200 if successful

</dd>

</dl>

</dd>

</dl>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.customModels.datasets.createDatasetVersion(
    fs.createReadStream("/path/to/your/file"),
    fs.createReadStream("/path/to/your/file"),
    "id"
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

**featureTypes: `File | fs.ReadStream | undefined`**

</dd>

</dl>

<dl>

<dd>

**labelsFile: `File | fs.ReadStream`**

</dd>

</dl>

<dl>

<dd>

**id: `string`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Datasets.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.customModels.datasets.<a href="./src/api/resources/customModels/resources/datasets/client/Client.ts">deleteDataset</a>(id) -> void</code> </summary>

<dl>

<dd>

#### 📝 Description

<dl>

<dd>

<dl>

<dd>

Returns 204 if successful

</dd>

</dl>

</dd>

</dl>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.customModels.datasets.deleteDataset("id");
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

**id: `string`** — Hume-generated ID of a Dataset

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Datasets.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.customModels.datasets.<a href="./src/api/resources/customModels/resources/datasets/client/Client.ts">listDatasetVersions</a>(id, { ...params }) -> Hume.DatasetVersionPage</code> </summary>

<dl>

<dd>

#### 📝 Description

<dl>

<dd>

<dl>

<dd>

Returns 200 if successful

</dd>

</dl>

</dd>

</dl>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.customModels.datasets.listDatasetVersions("id");
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

**id: `string`** — Hume-generated ID of a Dataset

</dd>

</dl>

<dl>

<dd>

**request: `Hume.customModels.DatasetsListDatasetVersionsRequest`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Datasets.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.customModels.datasets.<a href="./src/api/resources/customModels/resources/datasets/client/Client.ts">listDatasetFiles</a>(id, { ...params }) -> Hume.FilePage[]</code> </summary>

<dl>

<dd>

#### 📝 Description

<dl>

<dd>

<dl>

<dd>

Returns 200 if successful

</dd>

</dl>

</dd>

</dl>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.customModels.datasets.listDatasetFiles("id");
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

**id: `string`** — Hume-generated ID of a Dataset

</dd>

</dl>

<dl>

<dd>

**request: `Hume.customModels.DatasetsListDatasetFilesRequest`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Datasets.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.customModels.datasets.<a href="./src/api/resources/customModels/resources/datasets/client/Client.ts">getDatasetVersion</a>(id) -> Hume.DatasetLabels</code> </summary>

<dl>

<dd>

#### 📝 Description

<dl>

<dd>

<dl>

<dd>

Returns 200 if successful

</dd>

</dl>

</dd>

</dl>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.customModels.datasets.getDatasetVersion("id");
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

**id: `string`** — Hume-generated ID of a Dataset version

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Datasets.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.customModels.datasets.<a href="./src/api/resources/customModels/resources/datasets/client/Client.ts">listDatasetVersionFiles</a>(id, { ...params }) -> Hume.FilePage[]</code> </summary>

<dl>

<dd>

#### 📝 Description

<dl>

<dd>

<dl>

<dd>

Returns 200 if successful

</dd>

</dl>

</dd>

</dl>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.customModels.datasets.listDatasetVersionFiles("id");
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

**id: `string`** — Hume-generated ID of a Dataset version

</dd>

</dl>

<dl>

<dd>

**request: `Hume.customModels.DatasetsListDatasetVersionFilesRequest`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Datasets.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

## CustomModels Models

<details><summary> <code>client.customModels.models.<a href="./src/api/resources/customModels/resources/models/client/Client.ts">listModels</a>({ ...params }) -> Hume.ModelPage</code> </summary>

<dl>

<dd>

#### 📝 Description

<dl>

<dd>

<dl>

<dd>

Returns 200 if successful

</dd>

</dl>

</dd>

</dl>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.customModels.models.listModels();
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

**request: `Hume.customModels.ModelsListModelsRequest`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Models.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.customModels.models.<a href="./src/api/resources/customModels/resources/models/client/Client.ts">getModelDetails</a>(id) -> Hume.ExternalModel</code> </summary>

<dl>

<dd>

#### 📝 Description

<dl>

<dd>

<dl>

<dd>

Returns 200 if successful

</dd>

</dl>

</dd>

</dl>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.customModels.models.getModelDetails("id");
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

**id: `string`** — Hume-generated ID of a Model

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Models.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.customModels.models.<a href="./src/api/resources/customModels/resources/models/client/Client.ts">updateModelName</a>(id, { ...params }) -> Hume.ExternalModel</code> </summary>

<dl>

<dd>

#### 📝 Description

<dl>

<dd>

<dl>

<dd>

Returns 200 if successful

</dd>

</dl>

</dd>

</dl>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.customModels.models.updateModelName("id", {
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

**id: `string`** — Hume-generated ID of a Model

</dd>

</dl>

<dl>

<dd>

**request: `Hume.customModels.ModelsUpdateModelNameRequest`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Models.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.customModels.models.<a href="./src/api/resources/customModels/resources/models/client/Client.ts">listModelVersions</a>({ ...params }) -> Hume.ExternalModelVersion[]</code> </summary>

<dl>

<dd>

#### 📝 Description

<dl>

<dd>

<dl>

<dd>

Returns 200 if successful

</dd>

</dl>

</dd>

</dl>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.customModels.models.listModelVersions();
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

**request: `Hume.customModels.ModelsListModelVersionsRequest`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Models.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.customModels.models.<a href="./src/api/resources/customModels/resources/models/client/Client.ts">getModelVersion</a>(id, { ...params }) -> Hume.ExternalModelVersion</code> </summary>

<dl>

<dd>

#### 📝 Description

<dl>

<dd>

<dl>

<dd>

Returns 200 if successful

</dd>

</dl>

</dd>

</dl>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.customModels.models.getModelVersion("id");
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

**id: `string`** — Hume-generated ID of a Model version

</dd>

</dl>

<dl>

<dd>

**request: `Hume.customModels.ModelsGetModelVersionRequest`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Models.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.customModels.models.<a href="./src/api/resources/customModels/resources/models/client/Client.ts">updateModelDescription</a>(id, { ...params }) -> Hume.ExternalModelVersion</code> </summary>

<dl>

<dd>

#### 📝 Description

<dl>

<dd>

<dl>

<dd>

Returns 200 if successful

</dd>

</dl>

</dd>

</dl>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.customModels.models.updateModelDescription("id", "string");
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

**id: `string`** — Hume-generated ID of a Model Version

</dd>

</dl>

<dl>

<dd>

**request: `string`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Models.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

## CustomModels Jobs

<details><summary> <code>client.customModels.jobs.<a href="./src/api/resources/customModels/resources/jobs/client/Client.ts">startTrainingJob</a>({ ...params }) -> Hume.JobId</code> </summary>

<dl>

<dd>

#### 📝 Description

<dl>

<dd>

<dl>

<dd>

Start a new custom models training job.

</dd>

</dl>

</dd>

</dl>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.customModels.jobs.startTrainingJob({
    customModel: {
        name: "name",
    },
    dataset: {
        id: "id",
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

**request: `Hume.TrainingBaseRequest`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Jobs.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.customModels.jobs.<a href="./src/api/resources/customModels/resources/jobs/client/Client.ts">startCustomModelsInferenceJob</a>({ ...params }) -> Hume.JobId</code> </summary>

<dl>

<dd>

#### 📝 Description

<dl>

<dd>

<dl>

<dd>

Start a new custom models inference job.

</dd>

</dl>

</dd>

</dl>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.customModels.jobs.startCustomModelsInferenceJob({
    customModel: {
        id: "id",
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

**request: `Hume.TlInferenceBaseRequest`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Jobs.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

## EmpathicVoice Tools

<details><summary> <code>client.empathicVoice.tools.<a href="./src/api/resources/empathicVoice/resources/tools/client/Client.ts">listTools</a>({ ...params }) -> Hume.ReturnPagedUserDefinedTools</code> </summary>

<dl>

<dd>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
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

**request: `Hume.empathicVoice.ToolsListToolsRequest`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Tools.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.empathicVoice.tools.<a href="./src/api/resources/empathicVoice/resources/tools/client/Client.ts">createTool</a>({ ...params }) -> Hume.ReturnUserDefinedTool | undefined</code> </summary>

<dl>

<dd>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
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

**request: `Hume.empathicVoice.PostedUserDefinedTool`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Tools.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.empathicVoice.tools.<a href="./src/api/resources/empathicVoice/resources/tools/client/Client.ts">listToolVersions</a>(id, { ...params }) -> Hume.ReturnPagedUserDefinedTools</code> </summary>

<dl>

<dd>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
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

**id: `string`** — Identifier for a tool. Formatted as a UUID.

</dd>

</dl>

<dl>

<dd>

**request: `Hume.empathicVoice.ToolsListToolVersionsRequest`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Tools.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.empathicVoice.tools.<a href="./src/api/resources/empathicVoice/resources/tools/client/Client.ts">createToolVersion</a>(id, { ...params }) -> Hume.ReturnUserDefinedTool | undefined</code> </summary>

<dl>

<dd>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
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

**id: `string`** — Identifier for a tool. Formatted as a UUID.

</dd>

</dl>

<dl>

<dd>

**request: `Hume.empathicVoice.PostedUserDefinedToolVersion`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Tools.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.empathicVoice.tools.<a href="./src/api/resources/empathicVoice/resources/tools/client/Client.ts">deleteTool</a>(id) -> void</code> </summary>

<dl>

<dd>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
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

**id: `string`** — Identifier for a tool. Formatted as a UUID.

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Tools.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.empathicVoice.tools.<a href="./src/api/resources/empathicVoice/resources/tools/client/Client.ts">updateToolName</a>(id, { ...params }) -> string</code> </summary>

<dl>

<dd>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
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

**id: `string`** — Identifier for a tool. Formatted as a UUID.

</dd>

</dl>

<dl>

<dd>

**request: `Hume.empathicVoice.PostedUserDefinedToolName`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Tools.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.empathicVoice.tools.<a href="./src/api/resources/empathicVoice/resources/tools/client/Client.ts">getToolVersion</a>(id, version) -> Hume.ReturnUserDefinedTool | undefined</code> </summary>

<dl>

<dd>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
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

**id: `string`** — Identifier for a tool. Formatted as a UUID.

</dd>

</dl>

<dl>

<dd>

**version: `number`** — Version number for a tool. Version numbers should be integers.

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Tools.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.empathicVoice.tools.<a href="./src/api/resources/empathicVoice/resources/tools/client/Client.ts">deleteToolVersion</a>(id, version) -> void</code> </summary>

<dl>

<dd>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
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

**id: `string`** — Identifier for a tool. Formatted as a UUID.

</dd>

</dl>

<dl>

<dd>

**version: `number`** — Version number for a tool. Version numbers should be integers.

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Tools.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.empathicVoice.tools.<a href="./src/api/resources/empathicVoice/resources/tools/client/Client.ts">updateToolDescription</a>(id, version, { ...params }) -> Hume.ReturnUserDefinedTool | undefined</code> </summary>

<dl>

<dd>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
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

**id: `string`** — Identifier for a tool. Formatted as a UUID.

</dd>

</dl>

<dl>

<dd>

**version: `number`** — Version number for a tool. Version numbers should be integers.

</dd>

</dl>

<dl>

<dd>

**request: `Hume.empathicVoice.PostedUserDefinedToolVersionDescription`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Tools.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

## EmpathicVoice Prompts

<details><summary> <code>client.empathicVoice.prompts.<a href="./src/api/resources/empathicVoice/resources/prompts/client/Client.ts">listPrompts</a>({ ...params }) -> Hume.ReturnPagedPrompts</code> </summary>

<dl>

<dd>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.empathicVoice.prompts.listPrompts();
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

**request: `Hume.empathicVoice.PromptsListPromptsRequest`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Prompts.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.empathicVoice.prompts.<a href="./src/api/resources/empathicVoice/resources/prompts/client/Client.ts">createPrompt</a>({ ...params }) -> Hume.ReturnPrompt | undefined</code> </summary>

<dl>

<dd>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.empathicVoice.prompts.createPrompt({
    name: "name",
    text: "text",
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

**request: `Hume.empathicVoice.PostedPrompt`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Prompts.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.empathicVoice.prompts.<a href="./src/api/resources/empathicVoice/resources/prompts/client/Client.ts">listPromptVersions</a>(id, { ...params }) -> Hume.ReturnPagedPrompts</code> </summary>

<dl>

<dd>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.empathicVoice.prompts.listPromptVersions("id");
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

**id: `string`** — Identifier for a tool. Formatted as a UUID.

</dd>

</dl>

<dl>

<dd>

**request: `Hume.empathicVoice.PromptsListPromptVersionsRequest`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Prompts.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.empathicVoice.prompts.<a href="./src/api/resources/empathicVoice/resources/prompts/client/Client.ts">createPromptVerison</a>(id, { ...params }) -> Hume.ReturnPrompt | undefined</code> </summary>

<dl>

<dd>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.empathicVoice.prompts.createPromptVerison("id", {
    text: "text",
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

**id: `string`** — Identifier for a prompt. Formatted as a UUID.

</dd>

</dl>

<dl>

<dd>

**request: `Hume.empathicVoice.PostedPromptVersion`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Prompts.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.empathicVoice.prompts.<a href="./src/api/resources/empathicVoice/resources/prompts/client/Client.ts">deletePrompt</a>(id) -> void</code> </summary>

<dl>

<dd>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.empathicVoice.prompts.deletePrompt("id");
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

**id: `string`** — Identifier for a prompt. Formatted as a UUID.

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Prompts.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.empathicVoice.prompts.<a href="./src/api/resources/empathicVoice/resources/prompts/client/Client.ts">updatePromptName</a>(id, { ...params }) -> string</code> </summary>

<dl>

<dd>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.empathicVoice.prompts.updatePromptName("string", {
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

**id: `string`** — Identifier for a prompt. Formatted as a UUID.

</dd>

</dl>

<dl>

<dd>

**request: `Hume.empathicVoice.PostedPromptName`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Prompts.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.empathicVoice.prompts.<a href="./src/api/resources/empathicVoice/resources/prompts/client/Client.ts">getPromptVersion</a>(id, version) -> Hume.ReturnPrompt | undefined</code> </summary>

<dl>

<dd>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.empathicVoice.prompts.getPromptVersion("id", 1);
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

**id: `string`** — Identifier for a prompt. Formatted as a UUID.

</dd>

</dl>

<dl>

<dd>

**version: `number`** — Version number for a prompt. Version numbers should be integers.

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Prompts.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.empathicVoice.prompts.<a href="./src/api/resources/empathicVoice/resources/prompts/client/Client.ts">deletePromptVersion</a>(id, version) -> void</code> </summary>

<dl>

<dd>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.empathicVoice.prompts.deletePromptVersion("id", 1);
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

**id: `string`** — Identifier for a prompt. Formatted as a UUID.

</dd>

</dl>

<dl>

<dd>

**version: `number`** — Version number for a prompt. Version numbers should be integers.

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Prompts.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.empathicVoice.prompts.<a href="./src/api/resources/empathicVoice/resources/prompts/client/Client.ts">updatePromptDescription</a>(id, version, { ...params }) -> Hume.ReturnPrompt | undefined</code> </summary>

<dl>

<dd>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.empathicVoice.prompts.updatePromptDescription("id", 1);
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

**id: `string`** — Identifier for a prompt. Formatted as a UUID.

</dd>

</dl>

<dl>

<dd>

**version: `number`** — Version number for a prompt. Version numbers should be integers.

</dd>

</dl>

<dl>

<dd>

**request: `Hume.empathicVoice.PostedPromptVersionDescription`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Prompts.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

## EmpathicVoice Configs

<details><summary> <code>client.empathicVoice.configs.<a href="./src/api/resources/empathicVoice/resources/configs/client/Client.ts">listConfigs</a>({ ...params }) -> Hume.ReturnPagedConfigs</code> </summary>

<dl>

<dd>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.empathicVoice.configs.listConfigs();
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

**request: `Hume.empathicVoice.ConfigsListConfigsRequest`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Configs.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.empathicVoice.configs.<a href="./src/api/resources/empathicVoice/resources/configs/client/Client.ts">createConfig</a>({ ...params }) -> Hume.ReturnConfig</code> </summary>

<dl>

<dd>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.empathicVoice.configs.createConfig({
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

**request: `Hume.empathicVoice.PostedConfig`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Configs.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.empathicVoice.configs.<a href="./src/api/resources/empathicVoice/resources/configs/client/Client.ts">listConfigVersions</a>(id, { ...params }) -> Hume.ReturnPagedConfigs</code> </summary>

<dl>

<dd>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.empathicVoice.configs.listConfigVersions("id");
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

**id: `string`** — Identifier for a config. Formatted as a UUID.

</dd>

</dl>

<dl>

<dd>

**request: `Hume.empathicVoice.ConfigsListConfigVersionsRequest`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Configs.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.empathicVoice.configs.<a href="./src/api/resources/empathicVoice/resources/configs/client/Client.ts">createConfigVersion</a>(id, { ...params }) -> Hume.ReturnConfig</code> </summary>

<dl>

<dd>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.empathicVoice.configs.createConfigVersion("id");
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

**id: `string`** — Identifier for a config. Formatted as a UUID.

</dd>

</dl>

<dl>

<dd>

**request: `Hume.empathicVoice.PostedConfigVersion`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Configs.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.empathicVoice.configs.<a href="./src/api/resources/empathicVoice/resources/configs/client/Client.ts">deleteConfig</a>(id) -> void</code> </summary>

<dl>

<dd>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.empathicVoice.configs.deleteConfig("id");
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

**id: `string`** — Identifier for a config. Formatted as a UUID.

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Configs.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.empathicVoice.configs.<a href="./src/api/resources/empathicVoice/resources/configs/client/Client.ts">updateConfigName</a>(id, { ...params }) -> string</code> </summary>

<dl>

<dd>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.empathicVoice.configs.updateConfigName("string", {
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

**id: `string`** — Identifier for a config. Formatted as a UUID.

</dd>

</dl>

<dl>

<dd>

**request: `Hume.empathicVoice.PostedConfigName`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Configs.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.empathicVoice.configs.<a href="./src/api/resources/empathicVoice/resources/configs/client/Client.ts">getConfigVersion</a>(id, version) -> Hume.ReturnConfig</code> </summary>

<dl>

<dd>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.empathicVoice.configs.getConfigVersion("id", 1);
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

**id: `string`** — Identifier for a config. Formatted as a UUID.

</dd>

</dl>

<dl>

<dd>

**version: `number`** — Version number for a config. Version numbers should be integers.

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Configs.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.empathicVoice.configs.<a href="./src/api/resources/empathicVoice/resources/configs/client/Client.ts">deleteConfigVersion</a>(id, version) -> void</code> </summary>

<dl>

<dd>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.empathicVoice.configs.deleteConfigVersion("id", 1);
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

**id: `string`** — Identifier for a config. Formatted as a UUID.

</dd>

</dl>

<dl>

<dd>

**version: `number`** — Version number for a config. Version numbers should be integers.

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Configs.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.empathicVoice.configs.<a href="./src/api/resources/empathicVoice/resources/configs/client/Client.ts">updateConfigDescription</a>(id, version, { ...params }) -> Hume.ReturnConfig</code> </summary>

<dl>

<dd>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.empathicVoice.configs.updateConfigDescription("id", 1);
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

**id: `string`** — Identifier for a config. Formatted as a UUID.

</dd>

</dl>

<dl>

<dd>

**version: `number`** — Version number for a config. Version numbers should be integers.

</dd>

</dl>

<dl>

<dd>

**request: `Hume.empathicVoice.PostedConfigVersionDescription`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Configs.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

## EmpathicVoice Chats

<details><summary> <code>client.empathicVoice.chats.<a href="./src/api/resources/empathicVoice/resources/chats/client/Client.ts">listChats</a>({ ...params }) -> Hume.ReturnPagedChats</code> </summary>

<dl>

<dd>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.empathicVoice.chats.listChats();
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

**request: `Hume.empathicVoice.ChatsListChatsRequest`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Chats.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.empathicVoice.chats.<a href="./src/api/resources/empathicVoice/resources/chats/client/Client.ts">listChatEvents</a>(id, { ...params }) -> Hume.ReturnChatPagedEvents</code> </summary>

<dl>

<dd>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.empathicVoice.chats.listChatEvents("id");
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

**id: `string`** — Identifier for a chat. Formatted as a UUID.

</dd>

</dl>

<dl>

<dd>

**request: `Hume.empathicVoice.ChatsListChatEventsRequest`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Chats.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

## EmpathicVoice ChatGroups

<details><summary> <code>client.empathicVoice.chatGroups.<a href="./src/api/resources/empathicVoice/resources/chatGroups/client/Client.ts">listChatGroups</a>({ ...params }) -> Hume.ReturnPagedChatGroups</code> </summary>

<dl>

<dd>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.empathicVoice.chatGroups.listChatGroups();
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

**request: `Hume.empathicVoice.ChatGroupsListChatGroupsRequest`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `ChatGroups.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.empathicVoice.chatGroups.<a href="./src/api/resources/empathicVoice/resources/chatGroups/client/Client.ts">listChatGroupEvents</a>(id, { ...params }) -> Hume.ReturnChatGroupPagedEvents</code> </summary>

<dl>

<dd>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
await client.empathicVoice.chatGroups.listChatGroupEvents("id");
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

**id: `string`** — Identifier for a chat. Formatted as a UUID.

</dd>

</dl>

<dl>

<dd>

**request: `Hume.empathicVoice.ChatGroupsListChatGroupEventsRequest`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `ChatGroups.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

## ExpressionMeasurement Batch

<details><summary> <code>client.expressionMeasurement.batch.<a href="./src/api/resources/expressionMeasurement/resources/batch/client/Client.ts">listJobs</a>({ ...params }) -> Hume.UnionJob[]</code> </summary>

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

```ts
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

**request: `Hume.expressionMeasurement.BatchListJobsRequest`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Batch.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.expressionMeasurement.batch.<a href="./src/api/resources/expressionMeasurement/resources/batch/client/Client.ts">startInferenceJob</a>({ ...params }) -> Hume.JobId</code> </summary>

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

```ts
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

**request: `Hume.InferenceBaseRequest`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Batch.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.expressionMeasurement.batch.<a href="./src/api/resources/expressionMeasurement/resources/batch/client/Client.ts">getJobDetails</a>(id) -> Hume.UnionJob</code> </summary>

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

```ts
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

**id: `string`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Batch.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.expressionMeasurement.batch.<a href="./src/api/resources/expressionMeasurement/resources/batch/client/Client.ts">getJobDetails</a>(id) -> Hume.UnionJob</code> </summary>

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

```ts
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

**id: `string`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Batch.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.expressionMeasurement.batch.<a href="./src/api/resources/expressionMeasurement/resources/batch/client/Client.ts">getJobPredictions</a>(id) -> Hume.UnionPredictResult[]</code> </summary>

<dl>

<dd>

#### 📝 Description

<dl>

<dd>

<dl>

<dd>

Get the JSON predictions of a completed measurement or custom models inference job.

</dd>

</dl>

</dd>

</dl>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
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

**id: `string`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Batch.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.expressionMeasurement.batch.<a href="./src/api/resources/expressionMeasurement/resources/batch/client/Client.ts">getJobArtifacts</a>(id) -> stream.Readable</code> </summary>

<dl>

<dd>

#### 📝 Description

<dl>

<dd>

<dl>

<dd>

Get the artifacts ZIP of a completed measurement or custom models inference job.

</dd>

</dl>

</dd>

</dl>

#### 🔌 Usage

<dl>

<dd>

<dl>

<dd>

```ts
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

**id: `string`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Batch.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>

<details><summary> <code>client.expressionMeasurement.batch.<a href="./src/api/resources/expressionMeasurement/resources/batch/client/Client.ts">startInferenceJobFromLocalFile</a>(file, { ...params }) -> Hume.JobId</code> </summary>

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

```ts
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

**file: `File[] | fs.ReadStream[]`**

</dd>

</dl>

<dl>

<dd>

**request: `Hume.expressionMeasurement.BatchStartInferenceJobFromLocalFileRequest`**

</dd>

</dl>

<dl>

<dd>

**requestOptions: `Batch.RequestOptions`**

</dd>

</dl>

</dd>

</dl>

</dd>

</dl>
</details>
