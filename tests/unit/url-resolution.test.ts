/** THIS FILE IS MANUALLY MAINTAINED: see .fernignore */
import { HumeClient } from "../../src/wrapper/HumeClient";

// ============================================================================
// URL Resolution Tests for HumeClient Methods
// ============================================================================

describe("HumeClient URL Resolution", () => {
  // Monkeypatch the WebSocket constructor to capture URLs
  const capturedUrls: string[] = [];
  let originalWebSocket: typeof WebSocket;
  let originalFetch: typeof fetch;

  beforeEach(() => {
    // Clear previous captures
    capturedUrls.length = 0;

    // Store original WebSocket and fetch
    originalWebSocket = global.WebSocket;
    originalFetch = global.fetch;

    // Monkeypatch WebSocket constructor
    global.WebSocket = class extends WebSocket {
      constructor(url: string | URL, protocols?: string | string[]) {
        console.log(`🔍 WebSocket constructor called with URL: ${url}`);
        capturedUrls.push(url.toString());
        // Call super with a mock URL to avoid actual connection
        super("ws://localhost:0/mock", protocols);
      }
    } as any;

    // Monkeypatch fetch for TTS tests
    global.fetch = async (input: string | URL | Request, init?: RequestInit) => {
      console.log(`🔍 Fetch called with URL: ${input}`);
      capturedUrls.push(input.toString());
      return new Response('{"mock": "response"}', { status: 200 });
    };
  });

  afterEach(() => {
    // Restore original WebSocket constructor and fetch
    global.WebSocket = originalWebSocket;
    global.fetch = originalFetch;
  });

  // Helper function to normalize URLs by sorting query parameters alphabetically
  function normalizeUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      const params = new URLSearchParams(urlObj.search);

      // Sort parameters alphabetically
      const sortedParams = new URLSearchParams();
      Array.from(params.keys()).sort().forEach(key => {
        sortedParams.set(key, params.get(key) || '');
      });

      // Reconstruct URL with sorted parameters
      urlObj.search = sortedParams.toString();
      return urlObj.toString();
    } catch (error) {
      // If URL parsing fails, return original
      return url;
    }
  }

  // Helper function to test empathicVoice.chat.connect and return the URL
  async function testEmpathicVoiceConnect(
    clientConfig: Partial<ConstructorParameters<typeof HumeClient>[0]>
  ): Promise<string> {
    const client = new HumeClient({
      apiKey: "test-key",
      environment: "Prod",
      ...clientConfig,
    });

    try {
      const socket = client.empathicVoice.chat.connect({});

      // Small delay to ensure WebSocket constructor is called
      await new Promise((resolve) => setTimeout(resolve, 10));

      socket.close();

      // Get the normalized captured URL
      const rawUrl = capturedUrls[capturedUrls.length - 1] || "no-url-captured";
      return normalizeUrl(rawUrl);
    } catch (error) {
      return `connection-failed: ${(error as Error).message}`;
    }
  }

  // Helper function to test tts.synthesizeJson and return the URL
  async function testTtsSynthesize(
    clientConfig: Partial<ConstructorParameters<typeof HumeClient>[0]>
  ): Promise<string> {
    const client = new HumeClient({
      apiKey: "test-key",
      environment: "Prod",
      ...clientConfig,
    });

    try {
      await client.tts.synthesizeJson({
        utterances: [{ text: "Hello world" }]
      });

      // Get the normalized captured URL
      const rawUrl = capturedUrls[capturedUrls.length - 1] || "no-url-captured";
      return normalizeUrl(rawUrl);
    } catch (error) {
      return `request-failed: ${(error as Error).message}`;
    }
  }

  // ============================================================================
  // empathicVoice.chat.connect Tests
  // ============================================================================

  describe("empathicVoice.chat.connect", () => {
    it("Default configuration", async () => {
      const url = await testEmpathicVoiceConnect({});
      expect(url).toMatchInlineSnapshot(`"wss://prod/v0/evi/chat?apiKey=test-key&fernSdkLanguage=JavaScript&fernSdkVersion=0.14.2"`);
    });

    it("baseUrl takes precedence over environment", async () => {
      const url = await testEmpathicVoiceConnect({
        environment: "https://staging.hume.ai",
        baseUrl: "ws://localhost:8080"
      });
      expect(url).toMatchInlineSnapshot(`"ws://localhost:8080/v0/evi/chat?apiKey=test-key&fernSdkLanguage=JavaScript&fernSdkVersion=0.14.2"`);
    });

    it("baseUrl with different protocols", async () => {
      const url = await testEmpathicVoiceConnect({
        baseUrl: "wss://api.hume.ai"
      });
      expect(url).toMatchInlineSnapshot(`"wss://api.hume.ai/v0/evi/chat?apiKey=test-key&fernSdkLanguage=JavaScript&fernSdkVersion=0.14.2"`);
    });

    it("Environment only (no baseUrl)", async () => {
      const url = await testEmpathicVoiceConnect({
        environment: "https://staging.hume.ai"
      });
      expect(url).toMatchInlineSnapshot(`"wss://staging.hume.ai/v0/evi/chat?apiKey=test-key&fernSdkLanguage=JavaScript&fernSdkVersion=0.14.2"`);
    });

    it("Environment ws:// only", async () => {
      const url = await testEmpathicVoiceConnect({
        environment: "ws://localhost:3000"
      });
      expect(url).toMatchInlineSnapshot(`"wss://ws//localhost:3000/v0/evi/chat?apiKey=test-key&fernSdkLanguage=JavaScript&fernSdkVersion=0.14.2"`);
    });

    it("Environment http:// only", async () => {
      const url = await testEmpathicVoiceConnect({
        environment: "http://localhost:3000"
      });
      expect(url).toMatchInlineSnapshot(`"ws://localhost:3000/v0/evi/chat?apiKey=test-key&fernSdkLanguage=JavaScript&fernSdkVersion=0.14.2"`);
    });

    it("baseUrl ws:// only", async () => {
      const url = await testEmpathicVoiceConnect({
        baseUrl: "ws://localhost:8080"
      });
      expect(url).toMatchInlineSnapshot(`"ws://localhost:8080/v0/evi/chat?apiKey=test-key&fernSdkLanguage=JavaScript&fernSdkVersion=0.14.2"`);
    });

    it("baseUrl http:// only", async () => {
      const url = await testEmpathicVoiceConnect({
        baseUrl: "http://localhost:8080"
      });
      expect(url).toMatchInlineSnapshot(`"ws://localhost:8080/v0/evi/chat?apiKey=test-key&fernSdkLanguage=JavaScript&fernSdkVersion=0.14.2"`);
    });
  });

  // ============================================================================
  // tts.synthesizeJson Tests
  // ============================================================================

  describe("tts.synthesizeJson", () => {
    it("Default configuration", async () => {
      const url = await testTtsSynthesize({});
      expect(url).toMatchInlineSnapshot(`"https://prod/v0/tts"`);
    });

    it("baseUrl takes precedence over environment", async () => {
      const url = await testTtsSynthesize({
        environment: "https://staging.hume.ai",
        baseUrl: "http://localhost:8080"
      });
      expect(url).toMatchInlineSnapshot(`"http://localhost:8080/v0/tts"`);
    });

    it("baseUrl with different protocols", async () => {
      const url = await testTtsSynthesize({
        baseUrl: "https://api.hume.ai"
      });
      expect(url).toMatchInlineSnapshot(`"https://api.hume.ai/v0/tts"`);
    });

    it("Environment only (no baseUrl)", async () => {
      const url = await testTtsSynthesize({
        environment: "https://staging.hume.ai"
      });
      expect(url).toMatchInlineSnapshot(`"https://staging.hume.ai/v0/tts"`);
    });

    it("Environment ws:// only", async () => {
      const url = await testTtsSynthesize({
        environment: "ws://localhost:3000"
      });
      expect(url).toMatchInlineSnapshot(`"https://ws//localhost:3000/v0/tts"`);
    });

    it("Environment http:// only", async () => {
      const url = await testTtsSynthesize({
        environment: "http://localhost:3000"
      });
      expect(url).toMatchInlineSnapshot(`"http://localhost:3000/v0/tts"`);
    });

    it("baseUrl ws:// only", async () => {
      const url = await testTtsSynthesize({
        baseUrl: "ws://localhost:8080"
      });
      expect(url).toMatchInlineSnapshot(`"ws://localhost:8080/v0/tts"`);
    });

    it("baseUrl http:// only", async () => {
      const url = await testTtsSynthesize({
        baseUrl: "http://localhost:8080"
      });
      expect(url).toMatchInlineSnapshot(`"http://localhost:8080/v0/tts"`);
    });
  });
});
