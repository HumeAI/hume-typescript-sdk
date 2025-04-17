/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "../../../../../../environments";
import * as core from "../../../../../../core";
import * as Hume from "../../../../../index";
import urlJoin from "url-join";
import * as serializers from "../../../../../../serialization/index";
import * as errors from "../../../../../../errors/index";

export declare namespace CustomVoices {
    export interface Options {
        environment?: core.Supplier<environments.HumeEnvironment | string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: core.Supplier<string>;
        apiKey?: core.Supplier<string | undefined>;
        fetcher?: core.FetchFunction;
    }

    export interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Additional headers to include in the request. */
        headers?: Record<string, string>;
    }
}

export class CustomVoices {
    constructor(protected readonly _options: CustomVoices.Options = {}) {}

    /**
     * Fetches a paginated list of **Custom Voices**.
     *
     * Refer to our [voices guide](/docs/empathic-voice-interface-evi/configuration/voices) for details on creating a custom voice.
     *
     * @param {Hume.empathicVoice.CustomVoicesListCustomVoicesRequest} request
     * @param {CustomVoices.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.customVoices.listCustomVoices()
     */
    public async listCustomVoices(
        request: Hume.empathicVoice.CustomVoicesListCustomVoicesRequest = {},
        requestOptions?: CustomVoices.RequestOptions,
    ): Promise<core.Page<Hume.empathicVoice.ReturnCustomVoice>> {
        const list = async (
            request: Hume.empathicVoice.CustomVoicesListCustomVoicesRequest,
        ): Promise<Hume.empathicVoice.ReturnPagedCustomVoices> => {
            const { pageNumber, pageSize, name } = request;
            const _queryParams: Record<string, string | string[] | object | object[] | null> = {};
            if (pageNumber != null) {
                _queryParams["page_number"] = pageNumber.toString();
            }
            if (pageSize != null) {
                _queryParams["page_size"] = pageSize.toString();
            }
            if (name != null) {
                _queryParams["name"] = name;
            }
            const _response = await (this._options.fetcher ?? core.fetcher)({
                url: urlJoin(
                    (await core.Supplier.get(this._options.baseUrl)) ??
                        (await core.Supplier.get(this._options.environment)) ??
                        environments.HumeEnvironment.Production,
                    "v0/evi/custom_voices",
                ),
                method: "GET",
                headers: {
                    "X-Fern-Language": "JavaScript",
                    "X-Fern-SDK-Name": "hume",
                    "X-Fern-SDK-Version": "0.10.2",
                    "User-Agent": "hume/0.10.2",
                    "X-Fern-Runtime": core.RUNTIME.type,
                    "X-Fern-Runtime-Version": core.RUNTIME.version,
                    ...(await this._getCustomAuthorizationHeaders()),
                    ...requestOptions?.headers,
                },
                contentType: "application/json",
                queryParameters: _queryParams,
                requestType: "json",
                timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
                maxRetries: requestOptions?.maxRetries,
                abortSignal: requestOptions?.abortSignal,
            });
            if (_response.ok) {
                return serializers.empathicVoice.ReturnPagedCustomVoices.parseOrThrow(_response.body, {
                    unrecognizedObjectKeys: "passthrough",
                    allowUnrecognizedUnionMembers: true,
                    allowUnrecognizedEnumValues: true,
                    breadcrumbsPrefix: ["response"],
                });
            }
            if (_response.error.reason === "status-code") {
                switch (_response.error.statusCode) {
                    case 400:
                        throw new Hume.empathicVoice.BadRequestError(
                            serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                                unrecognizedObjectKeys: "passthrough",
                                allowUnrecognizedUnionMembers: true,
                                allowUnrecognizedEnumValues: true,
                                breadcrumbsPrefix: ["response"],
                            }),
                        );
                    default:
                        throw new errors.HumeError({
                            statusCode: _response.error.statusCode,
                            body: _response.error.body,
                        });
                }
            }
            switch (_response.error.reason) {
                case "non-json":
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.rawBody,
                    });
                case "timeout":
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling GET /v0/evi/custom_voices.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                    });
            }
        };
        let _offset = request?.pageNumber != null ? request?.pageNumber : 1;
        return new core.Pageable<Hume.empathicVoice.ReturnPagedCustomVoices, Hume.empathicVoice.ReturnCustomVoice>({
            response: await list(request),
            hasNextPage: (response) => (response?.customVoicesPage ?? []).length > 0,
            getItems: (response) => response?.customVoicesPage ?? [],
            loadPage: (_response) => {
                _offset += 1;
                return list(core.setObjectProperty(request, "pageNumber", _offset));
            },
        });
    }

    /**
     * Creates a **Custom Voice** that can be added to an [EVI configuration](/reference/empathic-voice-interface-evi/configs/create-config).
     *
     * Refer to our [voices guide](/docs/empathic-voice-interface-evi/configuration/voices) for details on creating a custom voice.
     *
     * @param {Hume.empathicVoice.PostedCustomVoice} request
     * @param {CustomVoices.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.customVoices.createCustomVoice({
     *         name: "name",
     *         baseVoice: "ITO",
     *         parameterModel: "20241004-11parameter"
     *     })
     */
    public async createCustomVoice(
        request: Hume.empathicVoice.PostedCustomVoice,
        requestOptions?: CustomVoices.RequestOptions,
    ): Promise<Hume.empathicVoice.ReturnCustomVoice> {
        const _response = await (this._options.fetcher ?? core.fetcher)({
            url: urlJoin(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    (await core.Supplier.get(this._options.environment)) ??
                    environments.HumeEnvironment.Production,
                "v0/evi/custom_voices",
            ),
            method: "POST",
            headers: {
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "hume",
                "X-Fern-SDK-Version": "0.10.2",
                "User-Agent": "hume/0.10.2",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
                ...(await this._getCustomAuthorizationHeaders()),
                ...requestOptions?.headers,
            },
            contentType: "application/json",
            requestType: "json",
            body: serializers.empathicVoice.PostedCustomVoice.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" }),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return serializers.empathicVoice.ReturnCustomVoice.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 400:
                    throw new Hume.empathicVoice.BadRequestError(
                        serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            breadcrumbsPrefix: ["response"],
                        }),
                    );
                default:
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.HumeError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.HumeTimeoutError("Timeout exceeded when calling POST /v0/evi/custom_voices.");
            case "unknown":
                throw new errors.HumeError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Fetches a specific **Custom Voice** by ID.
     *
     * Refer to our [voices guide](/docs/empathic-voice-interface-evi/configuration/voices) for details on creating a custom voice.
     *
     * @param {string} id - Identifier for a Custom Voice. Formatted as a UUID.
     * @param {CustomVoices.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.customVoices.getCustomVoice("id")
     */
    public async getCustomVoice(
        id: string,
        requestOptions?: CustomVoices.RequestOptions,
    ): Promise<Hume.empathicVoice.ReturnCustomVoice> {
        const _response = await (this._options.fetcher ?? core.fetcher)({
            url: urlJoin(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    (await core.Supplier.get(this._options.environment)) ??
                    environments.HumeEnvironment.Production,
                `v0/evi/custom_voices/${encodeURIComponent(id)}`,
            ),
            method: "GET",
            headers: {
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "hume",
                "X-Fern-SDK-Version": "0.10.2",
                "User-Agent": "hume/0.10.2",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
                ...(await this._getCustomAuthorizationHeaders()),
                ...requestOptions?.headers,
            },
            contentType: "application/json",
            requestType: "json",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return serializers.empathicVoice.ReturnCustomVoice.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 400:
                    throw new Hume.empathicVoice.BadRequestError(
                        serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            breadcrumbsPrefix: ["response"],
                        }),
                    );
                default:
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.HumeError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.HumeTimeoutError("Timeout exceeded when calling GET /v0/evi/custom_voices/{id}.");
            case "unknown":
                throw new errors.HumeError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Updates a **Custom Voice** by creating a new version of the **Custom Voice**.
     *
     * Refer to our [voices guide](/docs/empathic-voice-interface-evi/configuration/voices) for details on creating a custom voice.
     *
     * @param {string} id - Identifier for a Custom Voice. Formatted as a UUID.
     * @param {Hume.empathicVoice.PostedCustomVoice} request
     * @param {CustomVoices.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.customVoices.createCustomVoiceVersion("id", {
     *         name: "name",
     *         baseVoice: "ITO",
     *         parameterModel: "20241004-11parameter"
     *     })
     */
    public async createCustomVoiceVersion(
        id: string,
        request: Hume.empathicVoice.PostedCustomVoice,
        requestOptions?: CustomVoices.RequestOptions,
    ): Promise<Hume.empathicVoice.ReturnCustomVoice> {
        const _response = await (this._options.fetcher ?? core.fetcher)({
            url: urlJoin(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    (await core.Supplier.get(this._options.environment)) ??
                    environments.HumeEnvironment.Production,
                `v0/evi/custom_voices/${encodeURIComponent(id)}`,
            ),
            method: "POST",
            headers: {
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "hume",
                "X-Fern-SDK-Version": "0.10.2",
                "User-Agent": "hume/0.10.2",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
                ...(await this._getCustomAuthorizationHeaders()),
                ...requestOptions?.headers,
            },
            contentType: "application/json",
            requestType: "json",
            body: serializers.empathicVoice.PostedCustomVoice.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" }),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return serializers.empathicVoice.ReturnCustomVoice.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 400:
                    throw new Hume.empathicVoice.BadRequestError(
                        serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            breadcrumbsPrefix: ["response"],
                        }),
                    );
                default:
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.HumeError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.HumeTimeoutError("Timeout exceeded when calling POST /v0/evi/custom_voices/{id}.");
            case "unknown":
                throw new errors.HumeError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Deletes a **Custom Voice** and its versions.
     *
     * Refer to our [voices guide](/docs/empathic-voice-interface-evi/configuration/voices) for details on creating a custom voice.
     *
     * @param {string} id - Identifier for a Custom Voice. Formatted as a UUID.
     * @param {CustomVoices.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.customVoices.deleteCustomVoice("id")
     */
    public async deleteCustomVoice(id: string, requestOptions?: CustomVoices.RequestOptions): Promise<void> {
        const _response = await (this._options.fetcher ?? core.fetcher)({
            url: urlJoin(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    (await core.Supplier.get(this._options.environment)) ??
                    environments.HumeEnvironment.Production,
                `v0/evi/custom_voices/${encodeURIComponent(id)}`,
            ),
            method: "DELETE",
            headers: {
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "hume",
                "X-Fern-SDK-Version": "0.10.2",
                "User-Agent": "hume/0.10.2",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
                ...(await this._getCustomAuthorizationHeaders()),
                ...requestOptions?.headers,
            },
            contentType: "application/json",
            requestType: "json",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return;
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 400:
                    throw new Hume.empathicVoice.BadRequestError(
                        serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            breadcrumbsPrefix: ["response"],
                        }),
                    );
                default:
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.HumeError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.HumeTimeoutError("Timeout exceeded when calling DELETE /v0/evi/custom_voices/{id}.");
            case "unknown":
                throw new errors.HumeError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Updates the name of a **Custom Voice**.
     *
     * Refer to our [voices guide](/docs/empathic-voice-interface-evi/configuration/voices) for details on creating a custom voice.
     *
     * @param {string} id - Identifier for a Custom Voice. Formatted as a UUID.
     * @param {Hume.empathicVoice.PostedCustomVoiceName} request
     * @param {CustomVoices.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.customVoices.updateCustomVoiceName("id", {
     *         name: "name"
     *     })
     */
    public async updateCustomVoiceName(
        id: string,
        request: Hume.empathicVoice.PostedCustomVoiceName,
        requestOptions?: CustomVoices.RequestOptions,
    ): Promise<string> {
        const _response = await (this._options.fetcher ?? core.fetcher)({
            url: urlJoin(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    (await core.Supplier.get(this._options.environment)) ??
                    environments.HumeEnvironment.Production,
                `v0/evi/custom_voices/${encodeURIComponent(id)}`,
            ),
            method: "PATCH",
            headers: {
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "hume",
                "X-Fern-SDK-Version": "0.10.2",
                "User-Agent": "hume/0.10.2",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
                ...(await this._getCustomAuthorizationHeaders()),
                ...requestOptions?.headers,
            },
            contentType: "application/json",
            requestType: "json",
            body: serializers.empathicVoice.PostedCustomVoiceName.jsonOrThrow(request, {
                unrecognizedObjectKeys: "strip",
            }),
            responseType: "text",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return _response.body as string;
        }

        if (_response.error.reason === "status-code") {
            switch (_response.error.statusCode) {
                case 400:
                    throw new Hume.empathicVoice.BadRequestError(
                        serializers.empathicVoice.ErrorResponse.parseOrThrow(_response.error.body, {
                            unrecognizedObjectKeys: "passthrough",
                            allowUnrecognizedUnionMembers: true,
                            allowUnrecognizedEnumValues: true,
                            breadcrumbsPrefix: ["response"],
                        }),
                    );
                default:
                    throw new errors.HumeError({
                        statusCode: _response.error.statusCode,
                        body: _response.error.body,
                    });
            }
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.HumeError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.HumeTimeoutError("Timeout exceeded when calling PATCH /v0/evi/custom_voices/{id}.");
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
