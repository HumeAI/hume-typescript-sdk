/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from "../../../../../../environments";
import * as core from "../../../../../../core";
import * as Hume from "../../../../../index";
import urlJoin from "url-join";
import * as serializers from "../../../../../../serialization/index";
import * as errors from "../../../../../../errors/index";

export declare namespace ChatGroups {
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

export class ChatGroups {
    constructor(protected readonly _options: ChatGroups.Options = {}) {}

    /**
     * Fetches a paginated list of **Chat Groups**.
     *
     * @param {Hume.empathicVoice.ChatGroupsListChatGroupsRequest} request
     * @param {ChatGroups.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.chatGroups.listChatGroups({
     *         pageNumber: 0,
     *         pageSize: 1,
     *         ascendingOrder: true,
     *         configId: "1b60e1a0-cc59-424a-8d2c-189d354db3f3"
     *     })
     */
    public async listChatGroups(
        request: Hume.empathicVoice.ChatGroupsListChatGroupsRequest = {},
        requestOptions?: ChatGroups.RequestOptions,
    ): Promise<core.Page<Hume.empathicVoice.ReturnChatGroup>> {
        const list = async (
            request: Hume.empathicVoice.ChatGroupsListChatGroupsRequest,
        ): Promise<Hume.empathicVoice.ReturnPagedChatGroups> => {
            const { pageNumber, pageSize, ascendingOrder, configId } = request;
            const _queryParams: Record<string, string | string[] | object | object[] | null> = {};
            if (pageNumber != null) {
                _queryParams["page_number"] = pageNumber.toString();
            }
            if (pageSize != null) {
                _queryParams["page_size"] = pageSize.toString();
            }
            if (ascendingOrder != null) {
                _queryParams["ascending_order"] = ascendingOrder.toString();
            }
            if (configId != null) {
                _queryParams["config_id"] = configId;
            }
            const _response = await (this._options.fetcher ?? core.fetcher)({
                url: urlJoin(
                    (await core.Supplier.get(this._options.baseUrl)) ??
                        (await core.Supplier.get(this._options.environment)) ??
                        environments.HumeEnvironment.Production,
                    "v0/evi/chat_groups",
                ),
                method: "GET",
                headers: {
                    "X-Fern-Language": "JavaScript",
                    "X-Fern-SDK-Name": "hume",
                    "X-Fern-SDK-Version": "0.10.3",
                    "User-Agent": "hume/0.10.3",
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
                return serializers.empathicVoice.ReturnPagedChatGroups.parseOrThrow(_response.body, {
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
                    throw new errors.HumeTimeoutError("Timeout exceeded when calling GET /v0/evi/chat_groups.");
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                    });
            }
        };
        let _offset = request?.pageNumber != null ? request?.pageNumber : 1;
        return new core.Pageable<Hume.empathicVoice.ReturnPagedChatGroups, Hume.empathicVoice.ReturnChatGroup>({
            response: await list(request),
            hasNextPage: (response) => (response?.chatGroupsPage ?? []).length > 0,
            getItems: (response) => response?.chatGroupsPage ?? [],
            loadPage: (_response) => {
                _offset += 1;
                return list(core.setObjectProperty(request, "pageNumber", _offset));
            },
        });
    }

    /**
     * Fetches a **ChatGroup** by ID, including a paginated list of **Chats** associated with the **ChatGroup**.
     *
     * @param {string} id - Identifier for a Chat Group. Formatted as a UUID.
     * @param {Hume.empathicVoice.ChatGroupsGetChatGroupRequest} request
     * @param {ChatGroups.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.chatGroups.getChatGroup("697056f0-6c7e-487d-9bd8-9c19df79f05f", {
     *         pageNumber: 0,
     *         pageSize: 1,
     *         ascendingOrder: true
     *     })
     */
    public async getChatGroup(
        id: string,
        request: Hume.empathicVoice.ChatGroupsGetChatGroupRequest = {},
        requestOptions?: ChatGroups.RequestOptions,
    ): Promise<Hume.empathicVoice.ReturnChatGroupPagedChats> {
        const { pageSize, pageNumber, ascendingOrder } = request;
        const _queryParams: Record<string, string | string[] | object | object[] | null> = {};
        if (pageSize != null) {
            _queryParams["page_size"] = pageSize.toString();
        }

        if (pageNumber != null) {
            _queryParams["page_number"] = pageNumber.toString();
        }

        if (ascendingOrder != null) {
            _queryParams["ascending_order"] = ascendingOrder.toString();
        }

        const _response = await (this._options.fetcher ?? core.fetcher)({
            url: urlJoin(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    (await core.Supplier.get(this._options.environment)) ??
                    environments.HumeEnvironment.Production,
                `v0/evi/chat_groups/${encodeURIComponent(id)}`,
            ),
            method: "GET",
            headers: {
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "hume",
                "X-Fern-SDK-Version": "0.10.3",
                "User-Agent": "hume/0.10.3",
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
            return serializers.empathicVoice.ReturnChatGroupPagedChats.parseOrThrow(_response.body, {
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
                throw new errors.HumeTimeoutError("Timeout exceeded when calling GET /v0/evi/chat_groups/{id}.");
            case "unknown":
                throw new errors.HumeError({
                    message: _response.error.errorMessage,
                });
        }
    }

    /**
     * Fetches a paginated list of **Chat** events associated with a **Chat Group**.
     *
     * @param {string} id - Identifier for a Chat Group. Formatted as a UUID.
     * @param {Hume.empathicVoice.ChatGroupsListChatGroupEventsRequest} request
     * @param {ChatGroups.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.chatGroups.listChatGroupEvents("697056f0-6c7e-487d-9bd8-9c19df79f05f", {
     *         pageNumber: 0,
     *         pageSize: 3,
     *         ascendingOrder: true
     *     })
     */
    public async listChatGroupEvents(
        id: string,
        request: Hume.empathicVoice.ChatGroupsListChatGroupEventsRequest = {},
        requestOptions?: ChatGroups.RequestOptions,
    ): Promise<core.Page<Hume.empathicVoice.ReturnChatEvent>> {
        const list = async (
            request: Hume.empathicVoice.ChatGroupsListChatGroupEventsRequest,
        ): Promise<Hume.empathicVoice.ReturnChatGroupPagedEvents> => {
            const { pageSize, pageNumber, ascendingOrder } = request;
            const _queryParams: Record<string, string | string[] | object | object[] | null> = {};
            if (pageSize != null) {
                _queryParams["page_size"] = pageSize.toString();
            }
            if (pageNumber != null) {
                _queryParams["page_number"] = pageNumber.toString();
            }
            if (ascendingOrder != null) {
                _queryParams["ascending_order"] = ascendingOrder.toString();
            }
            const _response = await (this._options.fetcher ?? core.fetcher)({
                url: urlJoin(
                    (await core.Supplier.get(this._options.baseUrl)) ??
                        (await core.Supplier.get(this._options.environment)) ??
                        environments.HumeEnvironment.Production,
                    `v0/evi/chat_groups/${encodeURIComponent(id)}/events`,
                ),
                method: "GET",
                headers: {
                    "X-Fern-Language": "JavaScript",
                    "X-Fern-SDK-Name": "hume",
                    "X-Fern-SDK-Version": "0.10.3",
                    "User-Agent": "hume/0.10.3",
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
                return serializers.empathicVoice.ReturnChatGroupPagedEvents.parseOrThrow(_response.body, {
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
                        "Timeout exceeded when calling GET /v0/evi/chat_groups/{id}/events.",
                    );
                case "unknown":
                    throw new errors.HumeError({
                        message: _response.error.errorMessage,
                    });
            }
        };
        let _offset = request?.pageNumber != null ? request?.pageNumber : 1;
        return new core.Pageable<Hume.empathicVoice.ReturnChatGroupPagedEvents, Hume.empathicVoice.ReturnChatEvent>({
            response: await list(request),
            hasNextPage: (response) => (response?.eventsPage ?? []).length > 0,
            getItems: (response) => response?.eventsPage ?? [],
            loadPage: (_response) => {
                _offset += 1;
                return list(core.setObjectProperty(request, "pageNumber", _offset));
            },
        });
    }

    /**
     * Fetches a paginated list of audio for each **Chat** within the specified **Chat Group**. For more details, see our guide on audio reconstruction [here](/docs/empathic-voice-interface-evi/faq#can-i-access-the-audio-of-previous-conversations-with-evi).
     *
     * @param {string} id - Identifier for a Chat Group. Formatted as a UUID.
     * @param {Hume.empathicVoice.ChatGroupsGetAudioRequest} request
     * @param {ChatGroups.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Hume.empathicVoice.BadRequestError}
     *
     * @example
     *     await client.empathicVoice.chatGroups.getAudio("369846cf-6ad5-404d-905e-a8acb5cdfc78", {
     *         pageNumber: 0,
     *         pageSize: 10,
     *         ascendingOrder: true
     *     })
     */
    public async getAudio(
        id: string,
        request: Hume.empathicVoice.ChatGroupsGetAudioRequest = {},
        requestOptions?: ChatGroups.RequestOptions,
    ): Promise<Hume.empathicVoice.ReturnChatGroupPagedAudioReconstructions> {
        const { pageNumber, pageSize, ascendingOrder } = request;
        const _queryParams: Record<string, string | string[] | object | object[] | null> = {};
        if (pageNumber != null) {
            _queryParams["page_number"] = pageNumber.toString();
        }

        if (pageSize != null) {
            _queryParams["page_size"] = pageSize.toString();
        }

        if (ascendingOrder != null) {
            _queryParams["ascending_order"] = ascendingOrder.toString();
        }

        const _response = await (this._options.fetcher ?? core.fetcher)({
            url: urlJoin(
                (await core.Supplier.get(this._options.baseUrl)) ??
                    (await core.Supplier.get(this._options.environment)) ??
                    environments.HumeEnvironment.Production,
                `v0/evi/chat_groups/${encodeURIComponent(id)}/audio`,
            ),
            method: "GET",
            headers: {
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "hume",
                "X-Fern-SDK-Version": "0.10.3",
                "User-Agent": "hume/0.10.3",
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
            return serializers.empathicVoice.ReturnChatGroupPagedAudioReconstructions.parseOrThrow(_response.body, {
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
                throw new errors.HumeTimeoutError("Timeout exceeded when calling GET /v0/evi/chat_groups/{id}/audio.");
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
