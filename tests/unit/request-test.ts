/** THIS FILE IS MANUALLY MAINTAINED: see .fernignore */
import { HumeClient } from "../../src/wrapper/HumeClient";
import { SDK_VERSION } from "../../src/version";

// ============================================================================
// Request Tests for HumeClient Methods
// ============================================================================

describe("HumeClient Request Tests", () => {
    // Monkeypatch the WebSocket constructor to capture URLs
    const capturedUrls: string[] = [];
    const capturedHeaders: HeadersInit[] = [];
    let originalWebSocket: typeof WebSocket;
    let originalFetch: typeof fetch;

    beforeEach(() => {
        // Clear previous captures
        capturedUrls.length = 0;
        capturedHeaders.length = 0;

        // Store original WebSocket and fetch
        originalWebSocket = global.WebSocket;
        originalFetch = global.fetch;

        // Monkeypatch WebSocket constructor
        global.WebSocket = class extends WebSocket {
            constructor(url: string | URL, protocols?: string | string[]) {
                capturedUrls.push(url.toString());
                // Call super with a mock URL to avoid actual connection
                super("ws://localhost:0/mock", protocols);
            }
        } as any;

        // Monkeypatch fetch for TTS and Config tests
        global.fetch = async (input: string | URL | Request, init?: RequestInit) => {
            const url = input.toString();
            capturedUrls.push(url);
            capturedHeaders.push(init?.headers || {});
            if (url.includes("tts")) {
                return new Response('{"generations": []}', { status: 200 });
            }
            return new Response("{}", { status: 200 });
        };
    });

    afterEach(() => {
        // Restore original WebSocket constructor and fetch
        global.WebSocket = originalWebSocket;
        global.fetch = originalFetch;
    });

    // Helper function to normalize URLs by sorting query parameters alphabetically
    function normalizeUrl(url: string): string {
        const urlObj = new URL(url);
        const params = new URLSearchParams(urlObj.search);

        // Sort parameters alphabetically
        const sortedParams = new URLSearchParams();
        Array.from(params.keys())
            .sort()
            .forEach((key) => {
                sortedParams.set(key, params.get(key) || "");
            });

        // Reconstruct URL with sorted parameters
        urlObj.search = sortedParams.toString();
        return urlObj.toString();
    }

    // Helper function to test empathicVoice.chat.connect and return the URL
    async function testEmpathicVoiceConnect(
        clientConfig: Partial<ConstructorParameters<typeof HumeClient>[0]>,
    ): Promise<string> {
        const client = new HumeClient({
            apiKey: "test-key",
            ...clientConfig,
        } as HumeClient.Options);

        const socket = client.empathicVoice.chat.connect();

        // Small delay to ensure WebSocket constructor is called
        await new Promise((resolve) => setTimeout(resolve, 10));

        socket.close();

        // Get the normalized captured URL
        const rawUrl = capturedUrls[capturedUrls.length - 1] || "no-url-captured";
        return normalizeUrl(rawUrl);
    }

    // Helper function to test tts.synthesizeJson and return the URL
    async function testTtsSynthesize(
        clientConfig: Partial<ConstructorParameters<typeof HumeClient>[0]>,
    ): Promise<string> {
        const client = new HumeClient({
            apiKey: "test-key",
            ...clientConfig,
        } as HumeClient.Options);

        await client.tts.synthesizeJson({
            utterances: [{ text: "Hello world" }],
        });

        // Get the normalized captured URL
        const rawUrl = capturedUrls[capturedUrls.length - 1] || "no-url-captured";
        return normalizeUrl(rawUrl);
    }

    // Helper function to test empathicVoice.configs.createConfig and return the URL
    async function testConfigsCreate(
        clientConfig: Partial<ConstructorParameters<typeof HumeClient>[0]>,
    ): Promise<string> {
        const client = new HumeClient({
            apiKey: "test-key",
            ...clientConfig,
        } as HumeClient.Options);

        await client.empathicVoice.configs.createConfig({
            name: "Test Config",
            eviVersion: "3",
            voice: {
                provider: "HUME_AI",
                name: "Test Voice",
            },
        });

        // Get the normalized captured URL
        const rawUrl = capturedUrls[capturedUrls.length - 1] || "no-url-captured";
        return normalizeUrl(rawUrl);
    }

    // ============================================================================
    // empathicVoice.chat.connect Tests
    // ============================================================================

    describe("empathicVoice.chat.connect", () => {
        it("Default configuration", async () => {
            const url = await testEmpathicVoiceConnect({});
            expect(url).toBe(
                `wss://api.hume.ai/v0/evi/chat?apiKey=test-key&fernSdkLanguage=JavaScript&fernSdkVersion=${SDK_VERSION}`,
            );
        });

        it("baseUrl takes precedence over environment", async () => {
            const url = await testEmpathicVoiceConnect({
                environment: "https://foobar.hume.ai",
                baseUrl: "ws://localhost:8080",
            });
            expect(url).toBe(
                `ws://localhost:8080/chat?apiKey=test-key&fernSdkLanguage=JavaScript&fernSdkVersion=${SDK_VERSION}`,
            );
        });

        it("baseUrl with wss", async () => {
            const url = await testEmpathicVoiceConnect({
                baseUrl: "wss://api.hume.ai",
            });
            expect(url).toBe(
                `wss://api.hume.ai/chat?apiKey=test-key&fernSdkLanguage=JavaScript&fernSdkVersion=${SDK_VERSION}`,
            );
        });

        it("Environment only (no baseUrl)", async () => {
            const url = await testEmpathicVoiceConnect({
                environment: "https://foobar.hume.ai",
            });
            expect(url).toBe(
                `wss://foobar.hume.ai/v0/evi/chat?apiKey=test-key&fernSdkLanguage=JavaScript&fernSdkVersion=${SDK_VERSION}`,
            );
        });

        it("INVALID: Environment with ws://", async () => {
            const url = await testEmpathicVoiceConnect({
                environment: "ws://localhost:3000",
            });
            expect(url).toBe(
                `wss://ws//localhost:3000/v0/evi/chat?apiKey=test-key&fernSdkLanguage=JavaScript&fernSdkVersion=${SDK_VERSION}`,
            );
        });

        it("Environment http:// only", async () => {
            const url = await testEmpathicVoiceConnect({
                environment: "http://localhost:3000",
            });
            expect(url).toBe(
                `ws://localhost:3000/v0/evi/chat?apiKey=test-key&fernSdkLanguage=JavaScript&fernSdkVersion=${SDK_VERSION}`,
            );
        });

        it("baseUrl ws:// only", async () => {
            const url = await testEmpathicVoiceConnect({
                baseUrl: "ws://localhost:8080",
            });
            expect(url).toBe(
                `ws://localhost:8080/chat?apiKey=test-key&fernSdkLanguage=JavaScript&fernSdkVersion=${SDK_VERSION}`,
            );
        });

        it("INVALID: baseUrl http:// only", async () => {
            const url = await testEmpathicVoiceConnect({
                baseUrl: "http://localhost:8080",
            });
            expect(url).toBe(
                `http://localhost:8080/chat?apiKey=test-key&fernSdkLanguage=JavaScript&fernSdkVersion=${SDK_VERSION}`,
            );
        });

        it("Should include SDK tracking query params", async () => {
            const url = await testEmpathicVoiceConnect({});
            const urlObj = new URL(url);
            expect(urlObj.searchParams.get("fernSdkLanguage")).toBe("JavaScript");
            expect(urlObj.searchParams.get("fernSdkVersion")).toBe(SDK_VERSION);
        });
    });

    // ============================================================================
    // tts.synthesizeJson Tests
    // ============================================================================

    describe("tts.synthesizeJson", () => {
        it("Default configuration", async () => {
            const url = await testTtsSynthesize({});
            expect(url).toBe("https://api.hume.ai/v0/tts");
        });

        it("baseUrl takes precedence over environment", async () => {
            const url = await testTtsSynthesize({
                environment: "https://foobar.hume.ai",
                baseUrl: "http://localhost:8080",
            });
            expect(url).toBe("http://localhost:8080/v0/tts");
        });

        it("baseUrl with different protocols", async () => {
            const url = await testTtsSynthesize({
                baseUrl: "https://api.hume.ai",
            });
            expect(url).toBe("https://api.hume.ai/v0/tts");
        });

        it("Environment only (no baseUrl)", async () => {
            const url = await testTtsSynthesize({
                environment: "https://foobar.hume.ai",
            });
            expect(url).toBe("https://foobar.hume.ai/v0/tts");
        });

        it("INVALID: Environment ws:// only", async () => {
            const url = await testTtsSynthesize({
                environment: "ws://localhost:3000",
            });
            expect(url).toBe("https://ws//localhost:3000/v0/tts");
        });

        it("Environment http:// only", async () => {
            const url = await testTtsSynthesize({
                environment: "http://localhost:3000",
            });
            expect(url).toBe("http://localhost:3000/v0/tts");
        });

        it("INVALID: baseUrl ws:// only", async () => {
            const url = await testTtsSynthesize({
                baseUrl: "ws://localhost:8080",
            });
            expect(url).toBe("ws://localhost:8080/v0/tts");
        });

        it("baseUrl http:// only", async () => {
            const url = await testTtsSynthesize({
                baseUrl: "http://localhost:8080",
            });
            expect(url).toBe("http://localhost:8080/v0/tts");
        });

        it("Should include telemetry headers", async () => {
            const client = new HumeClient({ apiKey: "test-key" } as HumeClient.Options);
            await client.tts.synthesizeJson({ utterances: [{ text: "Hello" }] });

            const headers = capturedHeaders[capturedHeaders.length - 1] as Record<string, string>;
            expect(headers["X-Hume-Client-Name"]).toBe("typescript_sdk");
            expect(headers["X-Hume-Client-Version"]).toBe(SDK_VERSION);
        });
    });

    // ============================================================================
    // empathicVoice.configs.createConfig Tests
    // ============================================================================

    describe("empathicVoice.configs.createConfig", () => {
        it("Default configuration", async () => {
            const url = await testConfigsCreate({});
            expect(url).toBe("https://api.hume.ai/v0/evi/configs");
        });

        it("baseUrl takes precedence over environment", async () => {
            const url = await testConfigsCreate({
                environment: "https://foobar.hume.ai",
                baseUrl: "http://localhost:8080",
            });
            expect(url).toBe("http://localhost:8080/v0/evi/configs");
        });

        it("baseUrl with different protocols", async () => {
            const url = await testConfigsCreate({
                baseUrl: "https://api.hume.ai",
            });
            expect(url).toBe("https://api.hume.ai/v0/evi/configs");
        });

        it("Environment only (no baseUrl)", async () => {
            const url = await testConfigsCreate({
                environment: "https://foobar.hume.ai",
            });
            expect(url).toBe("https://foobar.hume.ai/v0/evi/configs");
        });

        it("INVALID: Environment ws:// only", async () => {
            const url = await testConfigsCreate({
                environment: "ws://localhost:3000",
            });
            expect(url).toBe("https://ws//localhost:3000/v0/evi/configs");
        });

        it("Environment http:// only", async () => {
            const url = await testConfigsCreate({
                environment: "http://localhost:3000",
            });
            expect(url).toBe("http://localhost:3000/v0/evi/configs");
        });

        it("INVALID: baseUrl ws:// only", async () => {
            const url = await testConfigsCreate({
                baseUrl: "ws://localhost:8080",
            });
            expect(url).toBe("ws://localhost:8080/v0/evi/configs");
        });

        it("baseUrl http:// only", async () => {
            const url = await testConfigsCreate({
                baseUrl: "http://localhost:8080",
            });
            expect(url).toBe("http://localhost:8080/v0/evi/configs");
        });

        it("Should include telemetry headers", async () => {
            const client = new HumeClient({ apiKey: "test-key" } as HumeClient.Options);
            await client.empathicVoice.configs.createConfig({
                name: "Test Config",
                eviVersion: "3",
                voice: { provider: "HUME_AI", name: "Test Voice" },
            });

            const headers = capturedHeaders[capturedHeaders.length - 1] as Record<string, string>;
            expect(headers["X-Hume-Client-Name"]).toBe("typescript_sdk");
            expect(headers["X-Hume-Client-Version"]).toBe(SDK_VERSION);
        });
    });
});
