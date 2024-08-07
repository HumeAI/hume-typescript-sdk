/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as environments from '../../../../../../environments';
import * as core from '../../../../../../core';
import * as Hume from '../../../../../index';
import urlJoin from 'url-join';
import * as serializers from '../../../../../../serialization/index';
import * as errors from '../../../../../../errors/index';

export declare namespace Configs {
  interface Options {
    environment?: core.Supplier<environments.HumeEnvironment | string>;
    apiKey?: core.Supplier<string | undefined>;
    fetcher?: core.FetchFunction;
  }

  interface RequestOptions {
    /** The maximum time to wait for a response in seconds. */
    timeoutInSeconds?: number;
    /** The number of times to retry the request. Defaults to 2. */
    maxRetries?: number;
    /** A hook to abort the request. */
    abortSignal?: AbortSignal;
  }
}

export class Configs {
  constructor(protected readonly _options: Configs.Options = {}) {}

  /**
   * @param {Hume.empathicVoice.ConfigsListConfigsRequest} request
   * @param {Configs.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @example
   *     await client.empathicVoice.configs.listConfigs()
   */
  public async listConfigs(
    request: Hume.empathicVoice.ConfigsListConfigsRequest = {},
    requestOptions?: Configs.RequestOptions,
  ): Promise<Hume.empathicVoice.ReturnPagedConfigs> {
    const { pageNumber, pageSize, restrictToMostRecent, name } = request;
    const _queryParams: Record<string, string | string[] | object | object[]> =
      {};
    if (pageNumber != null) {
      _queryParams['page_number'] = pageNumber.toString();
    }

    if (pageSize != null) {
      _queryParams['page_size'] = pageSize.toString();
    }

    if (restrictToMostRecent != null) {
      _queryParams['restrict_to_most_recent'] = restrictToMostRecent.toString();
    }

    if (name != null) {
      _queryParams['name'] = name;
    }

    const _response = await (this._options.fetcher ?? core.fetcher)({
      url: urlJoin(
        (await core.Supplier.get(this._options.environment)) ??
          environments.HumeEnvironment.Production,
        'v0/evi/configs',
      ),
      method: 'GET',
      headers: {
        'X-Fern-Language': 'JavaScript',
        'X-Fern-SDK-Name': 'hume',
        'X-Fern-SDK-Version': '0.8.5',
        'X-Fern-Runtime': core.RUNTIME.type,
        'X-Fern-Runtime-Version': core.RUNTIME.version,
        ...(await this._getCustomAuthorizationHeaders()),
      },
      contentType: 'application/json',
      queryParameters: _queryParams,
      timeoutMs:
        requestOptions?.timeoutInSeconds != null
          ? requestOptions.timeoutInSeconds * 1000
          : 60000,
      maxRetries: requestOptions?.maxRetries,
      abortSignal: requestOptions?.abortSignal,
    });
    if (_response.ok) {
      return serializers.empathicVoice.ReturnPagedConfigs.parseOrThrow(
        _response.body,
        {
          unrecognizedObjectKeys: 'passthrough',
          allowUnrecognizedUnionMembers: true,
          allowUnrecognizedEnumValues: true,
          breadcrumbsPrefix: ['response'],
        },
      );
    }

    if (_response.error.reason === 'status-code') {
      throw new errors.HumeError({
        statusCode: _response.error.statusCode,
        body: _response.error.body,
      });
    }

    switch (_response.error.reason) {
      case 'non-json':
        throw new errors.HumeError({
          statusCode: _response.error.statusCode,
          body: _response.error.rawBody,
        });
      case 'timeout':
        throw new errors.HumeTimeoutError();
      case 'unknown':
        throw new errors.HumeError({
          message: _response.error.errorMessage,
        });
    }
  }

  /**
   * @param {Hume.empathicVoice.PostedConfig} request
   * @param {Configs.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @example
   *     await client.empathicVoice.configs.createConfig({
   *         name: "name"
   *     })
   */
  public async createConfig(
    request: Hume.empathicVoice.PostedConfig,
    requestOptions?: Configs.RequestOptions,
  ): Promise<Hume.empathicVoice.ReturnConfig> {
    const _response = await (this._options.fetcher ?? core.fetcher)({
      url: urlJoin(
        (await core.Supplier.get(this._options.environment)) ??
          environments.HumeEnvironment.Production,
        'v0/evi/configs',
      ),
      method: 'POST',
      headers: {
        'X-Fern-Language': 'JavaScript',
        'X-Fern-SDK-Name': 'hume',
        'X-Fern-SDK-Version': '0.8.5',
        'X-Fern-Runtime': core.RUNTIME.type,
        'X-Fern-Runtime-Version': core.RUNTIME.version,
        ...(await this._getCustomAuthorizationHeaders()),
      },
      contentType: 'application/json',
      body: serializers.empathicVoice.PostedConfig.jsonOrThrow(request, {
        unrecognizedObjectKeys: 'strip',
      }),
      timeoutMs:
        requestOptions?.timeoutInSeconds != null
          ? requestOptions.timeoutInSeconds * 1000
          : 60000,
      maxRetries: requestOptions?.maxRetries,
      abortSignal: requestOptions?.abortSignal,
    });
    if (_response.ok) {
      return serializers.empathicVoice.ReturnConfig.parseOrThrow(
        _response.body,
        {
          unrecognizedObjectKeys: 'passthrough',
          allowUnrecognizedUnionMembers: true,
          allowUnrecognizedEnumValues: true,
          breadcrumbsPrefix: ['response'],
        },
      );
    }

    if (_response.error.reason === 'status-code') {
      throw new errors.HumeError({
        statusCode: _response.error.statusCode,
        body: _response.error.body,
      });
    }

    switch (_response.error.reason) {
      case 'non-json':
        throw new errors.HumeError({
          statusCode: _response.error.statusCode,
          body: _response.error.rawBody,
        });
      case 'timeout':
        throw new errors.HumeTimeoutError();
      case 'unknown':
        throw new errors.HumeError({
          message: _response.error.errorMessage,
        });
    }
  }

  /**
   * @param {string} id - Identifier for a Config. Formatted as a UUID.
   * @param {Hume.empathicVoice.ConfigsListConfigVersionsRequest} request
   * @param {Configs.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @example
   *     await client.empathicVoice.configs.listConfigVersions("id")
   */
  public async listConfigVersions(
    id: string,
    request: Hume.empathicVoice.ConfigsListConfigVersionsRequest = {},
    requestOptions?: Configs.RequestOptions,
  ): Promise<Hume.empathicVoice.ReturnPagedConfigs> {
    const { pageNumber, pageSize, restrictToMostRecent } = request;
    const _queryParams: Record<string, string | string[] | object | object[]> =
      {};
    if (pageNumber != null) {
      _queryParams['page_number'] = pageNumber.toString();
    }

    if (pageSize != null) {
      _queryParams['page_size'] = pageSize.toString();
    }

    if (restrictToMostRecent != null) {
      _queryParams['restrict_to_most_recent'] = restrictToMostRecent.toString();
    }

    const _response = await (this._options.fetcher ?? core.fetcher)({
      url: urlJoin(
        (await core.Supplier.get(this._options.environment)) ??
          environments.HumeEnvironment.Production,
        `v0/evi/configs/${encodeURIComponent(id)}`,
      ),
      method: 'GET',
      headers: {
        'X-Fern-Language': 'JavaScript',
        'X-Fern-SDK-Name': 'hume',
        'X-Fern-SDK-Version': '0.8.5',
        'X-Fern-Runtime': core.RUNTIME.type,
        'X-Fern-Runtime-Version': core.RUNTIME.version,
        ...(await this._getCustomAuthorizationHeaders()),
      },
      contentType: 'application/json',
      queryParameters: _queryParams,
      timeoutMs:
        requestOptions?.timeoutInSeconds != null
          ? requestOptions.timeoutInSeconds * 1000
          : 60000,
      maxRetries: requestOptions?.maxRetries,
      abortSignal: requestOptions?.abortSignal,
    });
    if (_response.ok) {
      return serializers.empathicVoice.ReturnPagedConfigs.parseOrThrow(
        _response.body,
        {
          unrecognizedObjectKeys: 'passthrough',
          allowUnrecognizedUnionMembers: true,
          allowUnrecognizedEnumValues: true,
          breadcrumbsPrefix: ['response'],
        },
      );
    }

    if (_response.error.reason === 'status-code') {
      throw new errors.HumeError({
        statusCode: _response.error.statusCode,
        body: _response.error.body,
      });
    }

    switch (_response.error.reason) {
      case 'non-json':
        throw new errors.HumeError({
          statusCode: _response.error.statusCode,
          body: _response.error.rawBody,
        });
      case 'timeout':
        throw new errors.HumeTimeoutError();
      case 'unknown':
        throw new errors.HumeError({
          message: _response.error.errorMessage,
        });
    }
  }

  /**
   * @param {string} id - Identifier for a Config. Formatted as a UUID.
   * @param {Hume.empathicVoice.PostedConfigVersion} request
   * @param {Configs.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @example
   *     await client.empathicVoice.configs.createConfigVersion("id")
   */
  public async createConfigVersion(
    id: string,
    request: Hume.empathicVoice.PostedConfigVersion = {},
    requestOptions?: Configs.RequestOptions,
  ): Promise<Hume.empathicVoice.ReturnConfig> {
    const _response = await (this._options.fetcher ?? core.fetcher)({
      url: urlJoin(
        (await core.Supplier.get(this._options.environment)) ??
          environments.HumeEnvironment.Production,
        `v0/evi/configs/${encodeURIComponent(id)}`,
      ),
      method: 'POST',
      headers: {
        'X-Fern-Language': 'JavaScript',
        'X-Fern-SDK-Name': 'hume',
        'X-Fern-SDK-Version': '0.8.5',
        'X-Fern-Runtime': core.RUNTIME.type,
        'X-Fern-Runtime-Version': core.RUNTIME.version,
        ...(await this._getCustomAuthorizationHeaders()),
      },
      contentType: 'application/json',
      body: serializers.empathicVoice.PostedConfigVersion.jsonOrThrow(request, {
        unrecognizedObjectKeys: 'strip',
      }),
      timeoutMs:
        requestOptions?.timeoutInSeconds != null
          ? requestOptions.timeoutInSeconds * 1000
          : 60000,
      maxRetries: requestOptions?.maxRetries,
      abortSignal: requestOptions?.abortSignal,
    });
    if (_response.ok) {
      return serializers.empathicVoice.ReturnConfig.parseOrThrow(
        _response.body,
        {
          unrecognizedObjectKeys: 'passthrough',
          allowUnrecognizedUnionMembers: true,
          allowUnrecognizedEnumValues: true,
          breadcrumbsPrefix: ['response'],
        },
      );
    }

    if (_response.error.reason === 'status-code') {
      throw new errors.HumeError({
        statusCode: _response.error.statusCode,
        body: _response.error.body,
      });
    }

    switch (_response.error.reason) {
      case 'non-json':
        throw new errors.HumeError({
          statusCode: _response.error.statusCode,
          body: _response.error.rawBody,
        });
      case 'timeout':
        throw new errors.HumeTimeoutError();
      case 'unknown':
        throw new errors.HumeError({
          message: _response.error.errorMessage,
        });
    }
  }

  /**
   * @param {string} id - Identifier for a Config. Formatted as a UUID.
   * @param {Configs.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @example
   *     await client.empathicVoice.configs.deleteConfig("id")
   */
  public async deleteConfig(
    id: string,
    requestOptions?: Configs.RequestOptions,
  ): Promise<void> {
    const _response = await (this._options.fetcher ?? core.fetcher)({
      url: urlJoin(
        (await core.Supplier.get(this._options.environment)) ??
          environments.HumeEnvironment.Production,
        `v0/evi/configs/${encodeURIComponent(id)}`,
      ),
      method: 'DELETE',
      headers: {
        'X-Fern-Language': 'JavaScript',
        'X-Fern-SDK-Name': 'hume',
        'X-Fern-SDK-Version': '0.8.5',
        'X-Fern-Runtime': core.RUNTIME.type,
        'X-Fern-Runtime-Version': core.RUNTIME.version,
        ...(await this._getCustomAuthorizationHeaders()),
      },
      contentType: 'application/json',
      timeoutMs:
        requestOptions?.timeoutInSeconds != null
          ? requestOptions.timeoutInSeconds * 1000
          : 60000,
      maxRetries: requestOptions?.maxRetries,
      abortSignal: requestOptions?.abortSignal,
    });
    if (_response.ok) {
      return;
    }

    if (_response.error.reason === 'status-code') {
      throw new errors.HumeError({
        statusCode: _response.error.statusCode,
        body: _response.error.body,
      });
    }

    switch (_response.error.reason) {
      case 'non-json':
        throw new errors.HumeError({
          statusCode: _response.error.statusCode,
          body: _response.error.rawBody,
        });
      case 'timeout':
        throw new errors.HumeTimeoutError();
      case 'unknown':
        throw new errors.HumeError({
          message: _response.error.errorMessage,
        });
    }
  }

  /**
   * @param {string} id - Identifier for a Config. Formatted as a UUID.
   * @param {Hume.empathicVoice.PostedConfigName} request
   * @param {Configs.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @example
   *     await client.empathicVoice.configs.updateConfigName("string", {
   *         name: "string"
   *     })
   */
  public async updateConfigName(
    id: string,
    request: Hume.empathicVoice.PostedConfigName,
    requestOptions?: Configs.RequestOptions,
  ): Promise<string> {
    const _response = await (this._options.fetcher ?? core.fetcher)({
      url: urlJoin(
        (await core.Supplier.get(this._options.environment)) ??
          environments.HumeEnvironment.Production,
        `v0/evi/configs/${encodeURIComponent(id)}`,
      ),
      method: 'PATCH',
      headers: {
        'X-Fern-Language': 'JavaScript',
        'X-Fern-SDK-Name': 'hume',
        'X-Fern-SDK-Version': '0.8.5',
        'X-Fern-Runtime': core.RUNTIME.type,
        'X-Fern-Runtime-Version': core.RUNTIME.version,
        ...(await this._getCustomAuthorizationHeaders()),
      },
      contentType: 'application/json',
      body: serializers.empathicVoice.PostedConfigName.jsonOrThrow(request, {
        unrecognizedObjectKeys: 'strip',
      }),
      responseType: 'text',
      timeoutMs:
        requestOptions?.timeoutInSeconds != null
          ? requestOptions.timeoutInSeconds * 1000
          : 60000,
      maxRetries: requestOptions?.maxRetries,
      abortSignal: requestOptions?.abortSignal,
    });
    if (_response.ok) {
      return _response.body as string;
    }

    if (_response.error.reason === 'status-code') {
      throw new errors.HumeError({
        statusCode: _response.error.statusCode,
        body: _response.error.body,
      });
    }

    switch (_response.error.reason) {
      case 'non-json':
        throw new errors.HumeError({
          statusCode: _response.error.statusCode,
          body: _response.error.rawBody,
        });
      case 'timeout':
        throw new errors.HumeTimeoutError();
      case 'unknown':
        throw new errors.HumeError({
          message: _response.error.errorMessage,
        });
    }
  }

  /**
   * @param {string} id - Identifier for a Config. Formatted as a UUID.
   * @param {number} version - Version number for a Config.
   *
   *                           Configs, as well as Prompts and Tools, are versioned. This versioning system supports iterative development, allowing you to progressively refine configurations and revert to previous versions if needed.
   *
   *                           Version numbers are integer values representing different iterations of the Config. Each update to the Config increments its version number.
   * @param {Configs.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @example
   *     await client.empathicVoice.configs.getConfigVersion("id", 1)
   */
  public async getConfigVersion(
    id: string,
    version: number,
    requestOptions?: Configs.RequestOptions,
  ): Promise<Hume.empathicVoice.ReturnConfig> {
    const _response = await (this._options.fetcher ?? core.fetcher)({
      url: urlJoin(
        (await core.Supplier.get(this._options.environment)) ??
          environments.HumeEnvironment.Production,
        `v0/evi/configs/${encodeURIComponent(id)}/version/${encodeURIComponent(version)}`,
      ),
      method: 'GET',
      headers: {
        'X-Fern-Language': 'JavaScript',
        'X-Fern-SDK-Name': 'hume',
        'X-Fern-SDK-Version': '0.8.5',
        'X-Fern-Runtime': core.RUNTIME.type,
        'X-Fern-Runtime-Version': core.RUNTIME.version,
        ...(await this._getCustomAuthorizationHeaders()),
      },
      contentType: 'application/json',
      timeoutMs:
        requestOptions?.timeoutInSeconds != null
          ? requestOptions.timeoutInSeconds * 1000
          : 60000,
      maxRetries: requestOptions?.maxRetries,
      abortSignal: requestOptions?.abortSignal,
    });
    if (_response.ok) {
      return serializers.empathicVoice.ReturnConfig.parseOrThrow(
        _response.body,
        {
          unrecognizedObjectKeys: 'passthrough',
          allowUnrecognizedUnionMembers: true,
          allowUnrecognizedEnumValues: true,
          breadcrumbsPrefix: ['response'],
        },
      );
    }

    if (_response.error.reason === 'status-code') {
      throw new errors.HumeError({
        statusCode: _response.error.statusCode,
        body: _response.error.body,
      });
    }

    switch (_response.error.reason) {
      case 'non-json':
        throw new errors.HumeError({
          statusCode: _response.error.statusCode,
          body: _response.error.rawBody,
        });
      case 'timeout':
        throw new errors.HumeTimeoutError();
      case 'unknown':
        throw new errors.HumeError({
          message: _response.error.errorMessage,
        });
    }
  }

  /**
   * @param {string} id - Identifier for a Config. Formatted as a UUID.
   * @param {number} version - Version number for a Config.
   *
   *                           Configs, as well as Prompts and Tools, are versioned. This versioning system supports iterative development, allowing you to progressively refine configurations and revert to previous versions if needed.
   *
   *                           Version numbers are integer values representing different iterations of the Config. Each update to the Config increments its version number.
   * @param {Configs.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @example
   *     await client.empathicVoice.configs.deleteConfigVersion("id", 1)
   */
  public async deleteConfigVersion(
    id: string,
    version: number,
    requestOptions?: Configs.RequestOptions,
  ): Promise<void> {
    const _response = await (this._options.fetcher ?? core.fetcher)({
      url: urlJoin(
        (await core.Supplier.get(this._options.environment)) ??
          environments.HumeEnvironment.Production,
        `v0/evi/configs/${encodeURIComponent(id)}/version/${encodeURIComponent(version)}`,
      ),
      method: 'DELETE',
      headers: {
        'X-Fern-Language': 'JavaScript',
        'X-Fern-SDK-Name': 'hume',
        'X-Fern-SDK-Version': '0.8.5',
        'X-Fern-Runtime': core.RUNTIME.type,
        'X-Fern-Runtime-Version': core.RUNTIME.version,
        ...(await this._getCustomAuthorizationHeaders()),
      },
      contentType: 'application/json',
      timeoutMs:
        requestOptions?.timeoutInSeconds != null
          ? requestOptions.timeoutInSeconds * 1000
          : 60000,
      maxRetries: requestOptions?.maxRetries,
      abortSignal: requestOptions?.abortSignal,
    });
    if (_response.ok) {
      return;
    }

    if (_response.error.reason === 'status-code') {
      throw new errors.HumeError({
        statusCode: _response.error.statusCode,
        body: _response.error.body,
      });
    }

    switch (_response.error.reason) {
      case 'non-json':
        throw new errors.HumeError({
          statusCode: _response.error.statusCode,
          body: _response.error.rawBody,
        });
      case 'timeout':
        throw new errors.HumeTimeoutError();
      case 'unknown':
        throw new errors.HumeError({
          message: _response.error.errorMessage,
        });
    }
  }

  /**
   * @param {string} id - Identifier for a Config. Formatted as a UUID.
   * @param {number} version - Version number for a Config.
   *
   *                           Configs, as well as Prompts and Tools, are versioned. This versioning system supports iterative development, allowing you to progressively refine configurations and revert to previous versions if needed.
   *
   *                           Version numbers are integer values representing different iterations of the Config. Each update to the Config increments its version number.
   * @param {Hume.empathicVoice.PostedConfigVersionDescription} request
   * @param {Configs.RequestOptions} requestOptions - Request-specific configuration.
   *
   * @example
   *     await client.empathicVoice.configs.updateConfigDescription("id", 1)
   */
  public async updateConfigDescription(
    id: string,
    version: number,
    request: Hume.empathicVoice.PostedConfigVersionDescription = {},
    requestOptions?: Configs.RequestOptions,
  ): Promise<Hume.empathicVoice.ReturnConfig> {
    const _response = await (this._options.fetcher ?? core.fetcher)({
      url: urlJoin(
        (await core.Supplier.get(this._options.environment)) ??
          environments.HumeEnvironment.Production,
        `v0/evi/configs/${encodeURIComponent(id)}/version/${encodeURIComponent(version)}`,
      ),
      method: 'PATCH',
      headers: {
        'X-Fern-Language': 'JavaScript',
        'X-Fern-SDK-Name': 'hume',
        'X-Fern-SDK-Version': '0.8.5',
        'X-Fern-Runtime': core.RUNTIME.type,
        'X-Fern-Runtime-Version': core.RUNTIME.version,
        ...(await this._getCustomAuthorizationHeaders()),
      },
      contentType: 'application/json',
      body: serializers.empathicVoice.PostedConfigVersionDescription.jsonOrThrow(
        request,
        {
          unrecognizedObjectKeys: 'strip',
        },
      ),
      timeoutMs:
        requestOptions?.timeoutInSeconds != null
          ? requestOptions.timeoutInSeconds * 1000
          : 60000,
      maxRetries: requestOptions?.maxRetries,
      abortSignal: requestOptions?.abortSignal,
    });
    if (_response.ok) {
      return serializers.empathicVoice.ReturnConfig.parseOrThrow(
        _response.body,
        {
          unrecognizedObjectKeys: 'passthrough',
          allowUnrecognizedUnionMembers: true,
          allowUnrecognizedEnumValues: true,
          breadcrumbsPrefix: ['response'],
        },
      );
    }

    if (_response.error.reason === 'status-code') {
      throw new errors.HumeError({
        statusCode: _response.error.statusCode,
        body: _response.error.body,
      });
    }

    switch (_response.error.reason) {
      case 'non-json':
        throw new errors.HumeError({
          statusCode: _response.error.statusCode,
          body: _response.error.rawBody,
        });
      case 'timeout':
        throw new errors.HumeTimeoutError();
      case 'unknown':
        throw new errors.HumeError({
          message: _response.error.errorMessage,
        });
    }
  }

  protected async _getCustomAuthorizationHeaders() {
    const apiKeyValue = await core.Supplier.get(this._options.apiKey);
    return { 'X-Hume-Api-Key': apiKeyValue };
  }
}
