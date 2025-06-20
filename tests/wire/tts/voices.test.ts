/**
 * This file was auto-generated by Fern from our API Definition.
 */

import { mockServerPool } from "../../mock-server/MockServerPool.js";
import { HumeClient } from "../../../src/Client";

describe("Voices", () => {
    test("create", async () => {
        const server = mockServerPool.createServer();
        const client = new HumeClient({ apiKey: "test", environment: server.baseUrl });
        const rawRequestBody = { generation_id: "795c949a-1510-4a80-9646-7d0863b023ab", name: "David Hume" };
        const rawResponseBody = {
            name: "David Hume",
            id: "c42352c0-4566-455d-b180-0f654b65b525",
            provider: "CUSTOM_VOICE",
        };
        server
            .mockEndpoint()
            .post("/v0/tts/voices")
            .jsonBody(rawRequestBody)
            .respondWith()
            .statusCode(200)
            .jsonBody(rawResponseBody)
            .build();

        const response = await client.tts.voices.create({
            generationId: "795c949a-1510-4a80-9646-7d0863b023ab",
            name: "David Hume",
        });
        expect(response).toEqual({
            name: "David Hume",
            id: "c42352c0-4566-455d-b180-0f654b65b525",
            provider: "CUSTOM_VOICE",
        });
    });

    test("delete", async () => {
        const server = mockServerPool.createServer();
        const client = new HumeClient({ apiKey: "test", environment: server.baseUrl });

        server.mockEndpoint().delete("/v0/tts/voices").respondWith().statusCode(200).build();

        const response = await client.tts.voices.delete({
            name: "David Hume",
        });
        expect(response).toEqual(undefined);
    });
});
