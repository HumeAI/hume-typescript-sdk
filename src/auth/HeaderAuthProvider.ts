/**
 * THIS FILE IS MANUALLY MAINTAINED: see .fernignore
 *
 * Custom HeaderAuthProvider that supports both apiKey and accessToken authentication.
 * When accessToken is provided to HumeClient, the wrapper converts it to an
 * Authorization: Bearer header. This provider checks for both apiKey and the
 * Authorization header to support both auth methods.
 */

import * as core from "../core/index.js";
import * as errors from "../errors/index.js";

export namespace HeaderAuthProvider {
    export type AuthOptions = {
        apiKey?: core.Supplier<string | undefined>;
    }

    export type Options = {
        headers?: Record<string, string | core.Supplier<string | null | undefined> | null | undefined>;
    } & AuthOptions;
}

export class HeaderAuthProvider implements core.AuthProvider {
    private readonly options: HeaderAuthProvider.Options;

    constructor(options: HeaderAuthProvider.Options) {
        this.options = options;
    }

    public static canCreate(options: HeaderAuthProvider.Options): boolean {
        return options.apiKey != null || HeaderAuthProvider.hasAuthorizationHeader(options.headers);
    }

    private static hasAuthorizationHeader(
        headers: Record<string, string | core.Supplier<string | null | undefined> | null | undefined> | undefined
    ): boolean {
        if (!headers) return false;
        return Object.keys(headers).some((key) => key.toLowerCase() === "authorization");
    }

    public async getAuthRequest(
        _arg?: { endpointMetadata?: core.EndpointMetadata }
    ): Promise<core.AuthRequest> {
        // Check apiKey first (preferred method)
        const apiKey = await core.Supplier.get(this.options.apiKey);
        if (apiKey != null) {
            return { headers: { "X-Hume-Api-Key": apiKey } };
        }

        // Check for Authorization header (from accessToken)
        if (this.options.headers) {
            const authKey = Object.keys(this.options.headers).find(
                (key) => key.toLowerCase() === "authorization"
            );
            if (authKey) {
                const authValue = await core.Supplier.get(this.options.headers[authKey]);
                if (authValue != null) {
                    return { headers: { Authorization: authValue } };
                }
            }
        }

        throw new errors.HumeError({
            message: "Please provide either 'apiKey' or 'accessToken' when initializing the client",
        });
    }
}
