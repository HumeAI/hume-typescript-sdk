/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "../../../../../../environments";
import * as core from "../../../../../../core";
import * as Hume from "../../../../../index";
import urlJoin from "url-join";
import * as serializers from "../../../../../../serialization/index";
import * as errors from "../../../../../../errors/index";

export declare namespace Prompts {
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

export class Prompts {
    constructor(protected readonly _options: Prompts.Options = {}) {}

    /**
     * Fetches a paginated list of **Prompts**.
     *
     * See our [prompting guide](/docs/empathic-voice-interface-evi/guides/phone-calling) for tips on crafting your system prompt.
     *
     * @param {Hume.empathicVoice.PromptsListPromptsRequest} request
     * @param {Prompts.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.prompts.listPrompts({
     *         pageNumber: 0,
     *         pageSize: 2
     *     })
     */
    public async listPrompts(
        request: Hume.empathicVoice.PromptsListPromptsRequest = {},
        requestOptions?: Prompts.RequestOptions,
    ): Promise<core.Page<Hume.empathicVoice.ReturnPrompt | undefined>> {
        const list = async (
            request: Hume.empathicVoice.PromptsListPromptsRequest,
        ): Promise<Hume.empathicVoice.ReturnPagedPrompts> => {
            const { pageNumber, pageSize, restrictToMostRecent, name } = request;
            const _queryParams: Record<string, string | string[] | object | object[] | null> = {};
            if (pageNumber != null) {
                _queryParams["page_number"] = pageNumber.toString();
            }
            if (pageSize != null) {
                _queryParams["page_size"] = pageSize.toString();
            }
            if (restrictToMostRecent != null) {
                _queryParams["restrict_to_most_recent"] = restrictToMostRecent.toString();
            }
            if (name != null) {
                _queryParams["name"] = name;
            }
            const _response = await (this._options.fetcher ?? core.fetcher)({
                url: urlJoin(
                    (await core.Supplier.get(this._options.baseUrl)) ??
                        (await core.Supplier.get(this._options.environment)) ??
                        environments.HumeEnvironment.Production,
                    "v0/evi/prompts",
                ),
                method: "GET",
                headers: {
                    "X-Fern-Language": "JavaScript",
                    "X-Fern-SDK-Name": "hume",
                    "X-Fern-SDK-Version": "0.9.18",
                    "User-Agent": "hume/0.9.18",
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
                return serializers.empathicVoice.ReturnPagedPrompts.parseOrThrow(_response.body, {
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
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling GET /v0/evi/prompts.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                    });
            }
        };
        let _offset = request?.pageNumber != null ? request?.pageNumber : 1;
        return new core.Pageable<Hume.empathicVoice.ReturnPagedPrompts, Hume.empathicVoice.ReturnPrompt | undefined>({
            response: await list(request),
            hasNextPage: (response) => (response?.promptsPage ?? []).length > 0,
            getItems: (response) => response?.promptsPage ?? [],
            loadPage: (_response) => {
                _offset += 1;
                return list(core.setObjectProperty(request, "pageNumber", _offset));
            },
        });
    }

    /**
     * Creates a **Prompt** that can be added to an [EVI configuration](/reference/empathic-voice-interface-evi/configs/create-config).
     *
     * See our [prompting guide](/docs/empathic-voice-interface-evi/guides/phone-calling) for tips on crafting your system prompt.
     *
     * @param {Hume.empathicVoice.PostedPrompt} request
     * @param {Prompts.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.prompts.createPrompt({
     *         name: "Weather Assistant Prompt",
     *         text: "<role>You are an AI weather assistant providing users with accurate and up-to-date weather information. Respond to user queries concisely and clearly. Use simple language and avoid technical jargon. Provide temperature, precipitation, wind conditions, and any weather alerts. Include helpful tips if severe weather is expected.</role>"
     *     })
     */
    public async createPrompt(
        request: Hume.empathicVoice.PostedPrompt,
        requestOptions?: Prompts.RequestOptions,
    ): Promise<Hume.empathicVoice.ReturnPrompt | undefined> {
        const _response = await (this._options.fetcher ?? core.fetcher)({
            url: urlJoin(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    (await core.Supplier.get(this._options.environment)) ??
                    environments.HumeEnvironment.Production,
                "v0/evi/prompts",
            ),
            method: "POST",
            headers: {
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "hume",
                "X-Fern-SDK-Version": "0.9.18",
                "User-Agent": "hume/0.9.18",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
                ...(await this._getCustomAuthorizationHeaders()),
                ...requestOptions?.headers,
            },
            contentType: "application/json",
            requestType: "json",
            body: serializers.empathicVoice.PostedPrompt.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" }),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return serializers.empathicVoice.prompts.createPrompt.Response.parseOrThrow(_response.body, {
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
                throw new errors.HumeTimeoutError("Timeout exceeded when calling POST /v0/evi/prompts.");
            case "unknown":
                throw new errors.HumeError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Fetches a list of a **Prompt's** versions.
     *
     * See our [prompting guide](/docs/empathic-voice-interface-evi/guides/phone-calling) for tips on crafting your system prompt.
     *
     * @param {string} id - Identifier for a Prompt. Formatted as a UUID.
     * @param {Hume.empathicVoice.PromptsListPromptVersionsRequest} request
     * @param {Prompts.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.prompts.listPromptVersions("af699d45-2985-42cc-91b9-af9e5da3bac5")
     */
    public async listPromptVersions(
        id: string,
        request: Hume.empathicVoice.PromptsListPromptVersionsRequest = {},
        requestOptions?: Prompts.RequestOptions,
    ): Promise<Hume.empathicVoice.ReturnPagedPrompts> {
        const { pageNumber, pageSize, restrictToMostRecent } = request;
        const _queryParams: Record<string, string | string[] | object | object[] | null> = {};
        if (pageNumber != null) {
            _queryParams["page_number"] = pageNumber.toString();
        }

        if (pageSize != null) {
            _queryParams["page_size"] = pageSize.toString();
        }

        if (restrictToMostRecent != null) {
            _queryParams["restrict_to_most_recent"] = restrictToMostRecent.toString();
        }

        const _response = await (this._options.fetcher ?? core.fetcher)({
            url: urlJoin(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    (await core.Supplier.get(this._options.environment)) ??
                    environments.HumeEnvironment.Production,
                `v0/evi/prompts/${encodeURIComponent(id)}`,
            ),
            method: "GET",
            headers: {
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "hume",
                "X-Fern-SDK-Version": "0.9.18",
                "User-Agent": "hume/0.9.18",
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
            return serializers.empathicVoice.ReturnPagedPrompts.parseOrThrow(_response.body, {
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
                throw new errors.HumeTimeoutError("Timeout exceeded when calling GET /v0/evi/prompts/{id}.");
            case "unknown":
                throw new errors.HumeError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Updates a **Prompt** by creating a new version of the **Prompt**.
     *
     * See our [prompting guide](/docs/empathic-voice-interface-evi/guides/phone-calling) for tips on crafting your system prompt.
     *
     * @param {string} id - Identifier for a Prompt. Formatted as a UUID.
     * @param {Hume.empathicVoice.PostedPromptVersion} request
     * @param {Prompts.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.prompts.createPromptVersion("af699d45-2985-42cc-91b9-af9e5da3bac5", {
     *         text: "<role>You are an updated version of an AI weather assistant providing users with accurate and up-to-date weather information. Respond to user queries concisely and clearly. Use simple language and avoid technical jargon. Provide temperature, precipitation, wind conditions, and any weather alerts. Include helpful tips if severe weather is expected.</role>",
     *         versionDescription: "This is an updated version of the Weather Assistant Prompt."
     *     })
     */
    public async createPromptVersion(
        id: string,
        request: Hume.empathicVoice.PostedPromptVersion,
        requestOptions?: Prompts.RequestOptions,
    ): Promise<Hume.empathicVoice.ReturnPrompt | undefined> {
        const _response = await (this._options.fetcher ?? core.fetcher)({
            url: urlJoin(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    (await core.Supplier.get(this._options.environment)) ??
                    environments.HumeEnvironment.Production,
                `v0/evi/prompts/${encodeURIComponent(id)}`,
            ),
            method: "POST",
            headers: {
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "hume",
                "X-Fern-SDK-Version": "0.9.18",
                "User-Agent": "hume/0.9.18",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
                ...(await this._getCustomAuthorizationHeaders()),
                ...requestOptions?.headers,
            },
            contentType: "application/json",
            requestType: "json",
            body: serializers.empathicVoice.PostedPromptVersion.jsonOrThrow(request, {
                unrecognizedObjectKeys: "strip",
            }),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return serializers.empathicVoice.prompts.createPromptVersion.Response.parseOrThrow(_response.body, {
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
                throw new errors.HumeTimeoutError("Timeout exceeded when calling POST /v0/evi/prompts/{id}.");
            case "unknown":
                throw new errors.HumeError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Deletes a **Prompt** and its versions.
     *
     * See our [prompting guide](/docs/empathic-voice-interface-evi/guides/phone-calling) for tips on crafting your system prompt.
     *
     * @param {string} id - Identifier for a Prompt. Formatted as a UUID.
     * @param {Prompts.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.prompts.deletePrompt("af699d45-2985-42cc-91b9-af9e5da3bac5")
     */
    public async deletePrompt(id: string, requestOptions?: Prompts.RequestOptions): Promise<void> {
        const _response = await (this._options.fetcher ?? core.fetcher)({
            url: urlJoin(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    (await core.Supplier.get(this._options.environment)) ??
                    environments.HumeEnvironment.Production,
                `v0/evi/prompts/${encodeURIComponent(id)}`,
            ),
            method: "DELETE",
            headers: {
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "hume",
                "X-Fern-SDK-Version": "0.9.18",
                "User-Agent": "hume/0.9.18",
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
                throw new errors.HumeTimeoutError("Timeout exceeded when calling DELETE /v0/evi/prompts/{id}.");
            case "unknown":
                throw new errors.HumeError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Updates the name of a **Prompt**.
     *
     * See our [prompting guide](/docs/empathic-voice-interface-evi/guides/phone-calling) for tips on crafting your system prompt.
     *
     * @param {string} id - Identifier for a Prompt. Formatted as a UUID.
     * @param {Hume.empathicVoice.PostedPromptName} request
     * @param {Prompts.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.prompts.updatePromptName("af699d45-2985-42cc-91b9-af9e5da3bac5", {
     *         name: "Updated Weather Assistant Prompt Name"
     *     })
     */
    public async updatePromptName(
        id: string,
        request: Hume.empathicVoice.PostedPromptName,
        requestOptions?: Prompts.RequestOptions,
    ): Promise<string> {
        const _response = await (this._options.fetcher ?? core.fetcher)({
            url: urlJoin(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    (await core.Supplier.get(this._options.environment)) ??
                    environments.HumeEnvironment.Production,
                `v0/evi/prompts/${encodeURIComponent(id)}`,
            ),
            method: "PATCH",
            headers: {
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "hume",
                "X-Fern-SDK-Version": "0.9.18",
                "User-Agent": "hume/0.9.18",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
                ...(await this._getCustomAuthorizationHeaders()),
                ...requestOptions?.headers,
            },
            contentType: "application/json",
            requestType: "json",
            body: serializers.empathicVoice.PostedPromptName.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" }),
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
                throw new errors.HumeTimeoutError("Timeout exceeded when calling PATCH /v0/evi/prompts/{id}.");
            case "unknown":
                throw new errors.HumeError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Fetches a specified version of a **Prompt**.
     *
     * See our [prompting guide](/docs/empathic-voice-interface-evi/guides/phone-calling) for tips on crafting your system prompt.
     *
     * @param {string} id - Identifier for a Prompt. Formatted as a UUID.
     * @param {number} version - Version number for a Prompt.
     *
     *                           Prompts, Configs, Custom Voices, and Tools are versioned. This versioning system supports iterative development, allowing you to progressively refine prompts and revert to previous versions if needed.
     *
     *                           Version numbers are integer values representing different iterations of the Prompt. Each update to the Prompt increments its version number.
     * @param {Prompts.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.prompts.getPromptVersion("af699d45-2985-42cc-91b9-af9e5da3bac5", 0)
     */
    public async getPromptVersion(
        id: string,
        version: number,
        requestOptions?: Prompts.RequestOptions,
    ): Promise<Hume.empathicVoice.ReturnPrompt | undefined> {
        const _response = await (this._options.fetcher ?? core.fetcher)({
            url: urlJoin(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    (await core.Supplier.get(this._options.environment)) ??
                    environments.HumeEnvironment.Production,
                `v0/evi/prompts/${encodeURIComponent(id)}/version/${encodeURIComponent(version)}`,
            ),
            method: "GET",
            headers: {
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "hume",
                "X-Fern-SDK-Version": "0.9.18",
                "User-Agent": "hume/0.9.18",
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
            return serializers.empathicVoice.prompts.getPromptVersion.Response.parseOrThrow(_response.body, {
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
                throw new errors.HumeTimeoutError(
                    "Timeout exceeded when calling GET /v0/evi/prompts/{id}/version/{version}.",
                );
            case "unknown":
                throw new errors.HumeError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Deletes a specified version of a **Prompt**.
     *
     * See our [prompting guide](/docs/empathic-voice-interface-evi/guides/phone-calling) for tips on crafting your system prompt.
     *
     * @param {string} id - Identifier for a Prompt. Formatted as a UUID.
     * @param {number} version - Version number for a Prompt.
     *
     *                           Prompts, Configs, Custom Voices, and Tools are versioned. This versioning system supports iterative development, allowing you to progressively refine prompts and revert to previous versions if needed.
     *
     *                           Version numbers are integer values representing different iterations of the Prompt. Each update to the Prompt increments its version number.
     * @param {Prompts.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.prompts.deletePromptVersion("af699d45-2985-42cc-91b9-af9e5da3bac5", 1)
     */
    public async deletePromptVersion(
        id: string,
        version: number,
        requestOptions?: Prompts.RequestOptions,
    ): Promise<void> {
        const _response = await (this._options.fetcher ?? core.fetcher)({
            url: urlJoin(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    (await core.Supplier.get(this._options.environment)) ??
                    environments.HumeEnvironment.Production,
                `v0/evi/prompts/${encodeURIComponent(id)}/version/${encodeURIComponent(version)}`,
            ),
            method: "DELETE",
            headers: {
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "hume",
                "X-Fern-SDK-Version": "0.9.18",
                "User-Agent": "hume/0.9.18",
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
                throw new errors.HumeTimeoutError(
                    "Timeout exceeded when calling DELETE /v0/evi/prompts/{id}/version/{version}.",
                );
            case "unknown":
                throw new errors.HumeError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Updates the description of a **Prompt**.
     *
     * See our [prompting guide](/docs/empathic-voice-interface-evi/guides/phone-calling) for tips on crafting your system prompt.
     *
     * @param {string} id - Identifier for a Prompt. Formatted as a UUID.
     * @param {number} version - Version number for a Prompt.
     *
     *                           Prompts, Configs, Custom Voices, and Tools are versioned. This versioning system supports iterative development, allowing you to progressively refine prompts and revert to previous versions if needed.
     *
     *                           Version numbers are integer values representing different iterations of the Prompt. Each update to the Prompt increments its version number.
     * @param {Hume.empathicVoice.PostedPromptVersionDescription} request
     * @param {Prompts.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.prompts.updatePromptDescription("af699d45-2985-42cc-91b9-af9e5da3bac5", 1, {
     *         versionDescription: "This is an updated version_description."
     *     })
     */
    public async updatePromptDescription(
        id: string,
        version: number,
        request: Hume.empathicVoice.PostedPromptVersionDescription = {},
        requestOptions?: Prompts.RequestOptions,
    ): Promise<Hume.empathicVoice.ReturnPrompt | undefined> {
        const _response = await (this._options.fetcher ?? core.fetcher)({
            url: urlJoin(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    (await core.Supplier.get(this._options.environment)) ??
                    environments.HumeEnvironment.Production,
                `v0/evi/prompts/${encodeURIComponent(id)}/version/${encodeURIComponent(version)}`,
            ),
            method: "PATCH",
            headers: {
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "hume",
                "X-Fern-SDK-Version": "0.9.18",
                "User-Agent": "hume/0.9.18",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
                ...(await this._getCustomAuthorizationHeaders()),
                ...requestOptions?.headers,
            },
            contentType: "application/json",
            requestType: "json",
            body: serializers.empathicVoice.PostedPromptVersionDescription.jsonOrThrow(request, {
                unrecognizedObjectKeys: "strip",
            }),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return serializers.empathicVoice.prompts.updatePromptDescription.Response.parseOrThrow(_response.body, {
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
                throw new errors.HumeTimeoutError(
                    "Timeout exceeded when calling PATCH /v0/evi/prompts/{id}/version/{version}.",
                );
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
