/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "../../../../../../environments";
import * as core from "../../../../../../core";
import * as Hume from "../../../../..";
import urlJoin from "url-join";
import * as serializers from "../../../../../../serialization";
import * as errors from "../../../../../../errors";
import * as fs from "fs";
import { default as FormData } from "form-data";

export declare namespace Datasets {
    interface Options {
        environment?: core.Supplier<environments.HumeEnvironment | string>;
        apiKey?: core.Supplier<string | undefined>;
        accountToken?: core.Supplier<string | undefined>;
        fetcher?: core.FetchFunction;
    }

    interface RequestOptions {
        timeoutInSeconds?: number;
        maxRetries?: number;
    }
}

export class Datasets {
    constructor(protected readonly _options: Datasets.Options = {}) {}

    /**
     * Returns 200 if successful
     *
     * @example
     *     await hume.customModels.datasets.listDatasets()
     */
    public async listDatasets(
        request: Hume.customModels.DatasetsListDatasetsRequest = {},
        requestOptions?: Datasets.RequestOptions
    ): Promise<Hume.customModels.DatasetPage> {
        const { name, pageNumber, pageSize, sharedAssets } = request;
        const _queryParams: Record<string, string | string[] | object | object[]> = {};
        if (name != null) {
            _queryParams["name"] = name;
        }

        if (pageNumber != null) {
            _queryParams["page_number"] = pageNumber.toString();
        }

        if (pageSize != null) {
            _queryParams["page_size"] = pageSize.toString();
        }

        if (sharedAssets != null) {
            _queryParams["shared_assets"] = sharedAssets.toString();
        }

        const _response = await (this._options.fetcher ?? core.fetcher)({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.HumeEnvironment.Production,
                "datasets"
            ),
            method: "GET",
            headers: {
                "X-Account-Token":
                    (await core.Supplier.get(this._options.accountToken)) != null
                        ? await core.Supplier.get(this._options.accountToken)
                        : undefined,
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "hume",
                "X-Fern-SDK-Version": "0.5.5",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
                ...(await this._getCustomAuthorizationHeaders()),
            },
            contentType: "application/json",
            queryParameters: _queryParams,
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return await serializers.customModels.DatasetPage.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            throw new errors.HumeError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
            });
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.HumeError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.HumeTimeoutError();
            case "unknown":
                throw new errors.HumeError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Returns 201 if successful
     */
    public async createDataset1(
        featureTypes: File | fs.ReadStream | undefined,
        labelsFile: File | fs.ReadStream,
        request: Hume.customModels.DatasetsCreateDataset1Request,
        requestOptions?: Datasets.RequestOptions
    ): Promise<Hume.customModels.ReturnDataset> {
        const _request = new FormData();
        _request.append("name", request.name);
        if (featureTypes != null) {
            _request.append("feature_types", featureTypes);
        }

        _request.append("labels_file", labelsFile);
        const _response = await (this._options.fetcher ?? core.fetcher)({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.HumeEnvironment.Production,
                "datasets"
            ),
            method: "POST",
            headers: {
                "X-Account-Token":
                    (await core.Supplier.get(this._options.accountToken)) != null
                        ? await core.Supplier.get(this._options.accountToken)
                        : undefined,
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "hume",
                "X-Fern-SDK-Version": "0.5.5",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
                ...(await this._getCustomAuthorizationHeaders()),
            },
            contentType: "multipart/form-data; boundary=" + _request.getBoundary(),
            body: _request,
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return await serializers.customModels.ReturnDataset.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            throw new errors.HumeError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
            });
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.HumeError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.HumeTimeoutError();
            case "unknown":
                throw new errors.HumeError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Returns 200 if successful
     *
     * @example
     *     await hume.customModels.datasets.getDatasetById("id")
     */
    public async getDatasetById(
        id: string,
        requestOptions?: Datasets.RequestOptions
    ): Promise<Hume.customModels.ReturnDataset> {
        const _response = await (this._options.fetcher ?? core.fetcher)({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.HumeEnvironment.Production,
                `datasets/${id}`
            ),
            method: "GET",
            headers: {
                "X-Account-Token":
                    (await core.Supplier.get(this._options.accountToken)) != null
                        ? await core.Supplier.get(this._options.accountToken)
                        : undefined,
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "hume",
                "X-Fern-SDK-Version": "0.5.5",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
                ...(await this._getCustomAuthorizationHeaders()),
            },
            contentType: "application/json",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return await serializers.customModels.ReturnDataset.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            throw new errors.HumeError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
            });
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.HumeError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.HumeTimeoutError();
            case "unknown":
                throw new errors.HumeError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Returns 200 if successful
     */
    public async updateDataset(
        featureTypes: File | fs.ReadStream | undefined,
        labelsFile: File | fs.ReadStream,
        id: string,
        requestOptions?: Datasets.RequestOptions
    ): Promise<Hume.customModels.ReturnDataset[]> {
        const _request = new FormData();
        if (featureTypes != null) {
            _request.append("feature_types", featureTypes);
        }

        _request.append("labels_file", labelsFile);
        const _response = await (this._options.fetcher ?? core.fetcher)({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.HumeEnvironment.Production,
                `datasets/${id}`
            ),
            method: "POST",
            headers: {
                "X-Account-Token":
                    (await core.Supplier.get(this._options.accountToken)) != null
                        ? await core.Supplier.get(this._options.accountToken)
                        : undefined,
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "hume",
                "X-Fern-SDK-Version": "0.5.5",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
                ...(await this._getCustomAuthorizationHeaders()),
            },
            contentType: "multipart/form-data; boundary=" + _request.getBoundary(),
            body: _request,
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return await serializers.customModels.datasets.updateDataset.Response.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            throw new errors.HumeError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
            });
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.HumeError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.HumeTimeoutError();
            case "unknown":
                throw new errors.HumeError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Returns 204 if successful
     *
     * @example
     *     await hume.customModels.datasets.deleteDataset("id")
     */
    public async deleteDataset(id: string, requestOptions?: Datasets.RequestOptions): Promise<void> {
        const _response = await (this._options.fetcher ?? core.fetcher)({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.HumeEnvironment.Production,
                `datasets/${id}`
            ),
            method: "DELETE",
            headers: {
                "X-Account-Token":
                    (await core.Supplier.get(this._options.accountToken)) != null
                        ? await core.Supplier.get(this._options.accountToken)
                        : undefined,
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "hume",
                "X-Fern-SDK-Version": "0.5.5",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
                ...(await this._getCustomAuthorizationHeaders()),
            },
            contentType: "application/json",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return;
        }

        if (_response.error.reason === "status-code") {
            throw new errors.HumeError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
            });
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.HumeError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.HumeTimeoutError();
            case "unknown":
                throw new errors.HumeError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Returns 200 if successful
     *
     * @example
     *     await hume.customModels.datasets.listDatasetVersions("id")
     */
    public async listDatasetVersions(
        id: string,
        request: Hume.customModels.DatasetsListDatasetVersionsRequest = {},
        requestOptions?: Datasets.RequestOptions
    ): Promise<Hume.customModels.DatasetVersionPage> {
        const { pageNumber, pageSize, sharedAssets } = request;
        const _queryParams: Record<string, string | string[] | object | object[]> = {};
        if (pageNumber != null) {
            _queryParams["page_number"] = pageNumber.toString();
        }

        if (pageSize != null) {
            _queryParams["page_size"] = pageSize.toString();
        }

        if (sharedAssets != null) {
            _queryParams["shared_assets"] = sharedAssets.toString();
        }

        const _response = await (this._options.fetcher ?? core.fetcher)({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.HumeEnvironment.Production,
                `datasets/${id}/versions`
            ),
            method: "GET",
            headers: {
                "X-Account-Token":
                    (await core.Supplier.get(this._options.accountToken)) != null
                        ? await core.Supplier.get(this._options.accountToken)
                        : undefined,
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "hume",
                "X-Fern-SDK-Version": "0.5.5",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
                ...(await this._getCustomAuthorizationHeaders()),
            },
            contentType: "application/json",
            queryParameters: _queryParams,
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return await serializers.customModels.DatasetVersionPage.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            throw new errors.HumeError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
            });
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.HumeError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.HumeTimeoutError();
            case "unknown":
                throw new errors.HumeError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Returns 200 if successful
     *
     * @example
     *     await hume.customModels.datasets.getFilesFromDatasetLatestVersion("id")
     */
    public async getFilesFromDatasetLatestVersion(
        id: string,
        request: Hume.customModels.DatasetsGetFilesFromDatasetLatestVersionRequest = {},
        requestOptions?: Datasets.RequestOptions
    ): Promise<Hume.customModels.FilePage[]> {
        const { pageNumber, pageSize, sharedAssets } = request;
        const _queryParams: Record<string, string | string[] | object | object[]> = {};
        if (pageNumber != null) {
            _queryParams["page_number"] = pageNumber.toString();
        }

        if (pageSize != null) {
            _queryParams["page_size"] = pageSize.toString();
        }

        if (sharedAssets != null) {
            _queryParams["shared_assets"] = sharedAssets.toString();
        }

        const _response = await (this._options.fetcher ?? core.fetcher)({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.HumeEnvironment.Production,
                `datasets/${id}/files`
            ),
            method: "GET",
            headers: {
                "X-Account-Token":
                    (await core.Supplier.get(this._options.accountToken)) != null
                        ? await core.Supplier.get(this._options.accountToken)
                        : undefined,
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "hume",
                "X-Fern-SDK-Version": "0.5.5",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
                ...(await this._getCustomAuthorizationHeaders()),
            },
            contentType: "application/json",
            queryParameters: _queryParams,
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return await serializers.customModels.datasets.getFilesFromDatasetLatestVersion.Response.parseOrThrow(
                _response.body,
                {
                    unrecognizedObjectKeys: "passthrough",
                    allowUnrecognizedUnionMembers: true,
                    allowUnrecognizedEnumValues: true,
                    skipValidation: true,
                    breadcrumbsPrefix: ["response"],
                }
            );
        }

        if (_response.error.reason === "status-code") {
            throw new errors.HumeError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
            });
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.HumeError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.HumeTimeoutError();
            case "unknown":
                throw new errors.HumeError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Returns 200 if successful
     *
     * @example
     *     await hume.customModels.datasets.getDatasetVersionById("id")
     */
    public async getDatasetVersionById(
        id: string,
        requestOptions?: Datasets.RequestOptions
    ): Promise<Hume.customModels.DatasetLabels> {
        const _response = await (this._options.fetcher ?? core.fetcher)({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.HumeEnvironment.Production,
                `datasets/version/${id}`
            ),
            method: "GET",
            headers: {
                "X-Account-Token":
                    (await core.Supplier.get(this._options.accountToken)) != null
                        ? await core.Supplier.get(this._options.accountToken)
                        : undefined,
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "hume",
                "X-Fern-SDK-Version": "0.5.5",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
                ...(await this._getCustomAuthorizationHeaders()),
            },
            contentType: "application/json",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return await serializers.customModels.DatasetLabels.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                skipValidation: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            throw new errors.HumeError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
            });
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.HumeError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.HumeTimeoutError();
            case "unknown":
                throw new errors.HumeError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Returns 200 if successful
     *
     * @example
     *     await hume.customModels.datasets.getFilesFromDatasetVersion("id")
     */
    public async getFilesFromDatasetVersion(
        id: string,
        request: Hume.customModels.DatasetsGetFilesFromDatasetVersionRequest = {},
        requestOptions?: Datasets.RequestOptions
    ): Promise<Hume.customModels.FilePage[]> {
        const { pageNumber, pageSize, sharedAssets } = request;
        const _queryParams: Record<string, string | string[] | object | object[]> = {};
        if (pageNumber != null) {
            _queryParams["page_number"] = pageNumber.toString();
        }

        if (pageSize != null) {
            _queryParams["page_size"] = pageSize.toString();
        }

        if (sharedAssets != null) {
            _queryParams["shared_assets"] = sharedAssets.toString();
        }

        const _response = await (this._options.fetcher ?? core.fetcher)({
            url: urlJoin(
                (await core.Supplier.get(this._options.environment)) ?? environments.HumeEnvironment.Production,
                `datasets/version/${id}/files`
            ),
            method: "GET",
            headers: {
                "X-Account-Token":
                    (await core.Supplier.get(this._options.accountToken)) != null
                        ? await core.Supplier.get(this._options.accountToken)
                        : undefined,
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "hume",
                "X-Fern-SDK-Version": "0.5.5",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
                ...(await this._getCustomAuthorizationHeaders()),
            },
            contentType: "application/json",
            queryParameters: _queryParams,
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return await serializers.customModels.datasets.getFilesFromDatasetVersion.Response.parseOrThrow(
                _response.body,
                {
                    unrecognizedObjectKeys: "passthrough",
                    allowUnrecognizedUnionMembers: true,
                    allowUnrecognizedEnumValues: true,
                    skipValidation: true,
                    breadcrumbsPrefix: ["response"],
                }
            );
        }

        if (_response.error.reason === "status-code") {
            throw new errors.HumeError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
            });
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.HumeError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.HumeTimeoutError();
            case "unknown":
                throw new errors.HumeError({
                    message: _response.error.errorMessage,
                });
        }
    }

    protected async _getCustomAuthorizationHeaders() {
        const apiKeyValue = await core.Supplier.get(this._options.apiKey);
        return { "X-Hume-Api-Key": apiKeyValue };
    }
}
