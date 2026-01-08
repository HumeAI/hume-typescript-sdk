/**
 * Tests for authentication support - both apiKey and accessToken methods.
 */

import { describe, expect, it } from "vitest";

import { HeaderAuthProvider } from "../../../src/auth/HeaderAuthProvider";
import { HumeClient } from "../../../src/wrapper/HumeClient";

describe("Authentication", () => {
    describe("HeaderAuthProvider", () => {
        it("returns X-Hume-Api-Key header when apiKey is provided", async () => {
            const provider = new HeaderAuthProvider({ apiKey: "test-api-key" });
            const result = await provider.getAuthRequest();
            expect(result.headers).toEqual({ "X-Hume-Api-Key": "test-api-key" });
        });

        it("returns Authorization header when accessToken is provided via headers", async () => {
            const provider = new HeaderAuthProvider({
                headers: { Authorization: "Bearer test-token" },
            });
            const result = await provider.getAuthRequest();
            expect(result.headers).toEqual({ Authorization: "Bearer test-token" });
        });

        it("handles case-insensitive Authorization header", async () => {
            const provider = new HeaderAuthProvider({
                headers: { authorization: "Bearer test-token" },
            });
            const result = await provider.getAuthRequest();
            expect(result.headers).toEqual({ Authorization: "Bearer test-token" });
        });

        it("prefers apiKey over Authorization header when both are provided", async () => {
            const provider = new HeaderAuthProvider({
                apiKey: "test-api-key",
                headers: { Authorization: "Bearer test-token" },
            });
            const result = await provider.getAuthRequest();
            expect(result.headers).toEqual({ "X-Hume-Api-Key": "test-api-key" });
        });

        it("throws when neither apiKey nor Authorization header is provided", async () => {
            const provider = new HeaderAuthProvider({});
            await expect(provider.getAuthRequest()).rejects.toThrow(
                "Please provide either 'apiKey' or 'accessToken' when initializing the client"
            );
        });

        it("throws when apiKey is undefined and no Authorization header", async () => {
            const provider = new HeaderAuthProvider({ apiKey: undefined });
            await expect(provider.getAuthRequest()).rejects.toThrow(
                "Please provide either 'apiKey' or 'accessToken'"
            );
        });

        it("supports Supplier function for apiKey", async () => {
            const provider = new HeaderAuthProvider({
                apiKey: () => "dynamic-api-key",
            });
            const result = await provider.getAuthRequest();
            expect(result.headers).toEqual({ "X-Hume-Api-Key": "dynamic-api-key" });
        });

        // Note: The local Supplier type is synchronous, so async functions are not directly supported.
        // However, the await in getAuthRequest() handles values that happen to be Promises.

        it("supports Supplier function for Authorization header", async () => {
            const provider = new HeaderAuthProvider({
                headers: { Authorization: () => "Bearer dynamic-token" },
            });
            const result = await provider.getAuthRequest();
            expect(result.headers).toEqual({ Authorization: "Bearer dynamic-token" });
        });

        describe("canCreate", () => {
            it("returns true when apiKey is provided", () => {
                expect(HeaderAuthProvider.canCreate({ apiKey: "test" })).toBe(true);
            });

            it("returns true when Authorization header is provided", () => {
                expect(
                    HeaderAuthProvider.canCreate({
                        headers: { Authorization: "Bearer token" },
                    })
                ).toBe(true);
            });

            it("returns true when authorization header is provided (case-insensitive)", () => {
                expect(
                    HeaderAuthProvider.canCreate({
                        headers: { authorization: "Bearer token" },
                    })
                ).toBe(true);
            });

            it("returns false when neither is provided", () => {
                expect(HeaderAuthProvider.canCreate({})).toBe(false);
            });

            it("returns false when headers exist but no Authorization", () => {
                expect(
                    HeaderAuthProvider.canCreate({
                        headers: { "X-Custom-Header": "value" },
                    })
                ).toBe(false);
            });
        });
    });

    describe("HumeClient wrapper", () => {
        it("accepts apiKey authentication", () => {
            const client = new HumeClient({ apiKey: "test-api-key" });
            expect(client).toBeDefined();
        });

        it("accepts accessToken authentication", () => {
            const client = new HumeClient({ accessToken: "test-token" });
            expect(client).toBeDefined();
        });

        it("converts accessToken to Authorization header internally", () => {
            const client = new HumeClient({ accessToken: "test-token" });
            // Access the internal options to verify the Authorization header is set
            const options = (client as any)._options;
            expect(options.headers).toBeDefined();
            // The Authorization header is set as a Supplier, so we can't easily check the value directly
            // but we can verify the header key exists
            const hasAuthHeader = Object.keys(options.headers).some(
                (key) => key.toLowerCase() === "authorization"
            );
            expect(hasAuthHeader).toBe(true);
        });

        it("throws when both accessToken and Authorization header are provided", () => {
            expect(
                () =>
                    new HumeClient({
                        accessToken: "token",
                        headers: { Authorization: "Bearer another" },
                    })
            ).toThrow("Cannot provide both 'accessToken' and 'headers.Authorization'");
        });

        it("allows custom headers alongside apiKey", () => {
            const client = new HumeClient({
                apiKey: "test-api-key",
                headers: { "X-Custom-Header": "value" },
            });
            expect(client).toBeDefined();
        });

        it("allows custom headers alongside accessToken", () => {
            const client = new HumeClient({
                accessToken: "test-token",
                headers: { "X-Custom-Header": "value" },
            });
            expect(client).toBeDefined();
        });
    });
});
