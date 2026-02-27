import { HumeClient } from "../../../src/Client";

describe("ChatClient.connect", () => {
    it("logs a warning when systemPrompt exceeds 1000 chars but still connects", () => {
        const client = new HumeClient({ apiKey: "test" });
        const longSystemPrompt = "x".repeat(1001);
        const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

        const socket = client.empathicVoice.chat.connect({
            sessionSettings: { systemPrompt: longSystemPrompt },
        });

        expect(socket).toBeDefined();
        expect(socket.socket).toBeDefined();
        expect(warnSpy).toHaveBeenCalledWith(
            expect.stringContaining("[Hume SDK] systemPrompt (1001 chars) exceeds recommended max of 1000"),
        );
        warnSpy.mockRestore();
    });

    it("succeeds with systemPrompt at max length (1000 chars) without warning", () => {
        const client = new HumeClient({ apiKey: "test" });
        const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

        const socket = client.empathicVoice.chat.connect({
            sessionSettings: { systemPrompt: "x".repeat(1000) },
        });

        expect(socket).toBeDefined();
        expect(socket.socket).toBeDefined();
        expect(warnSpy).not.toHaveBeenCalled();
        warnSpy.mockRestore();
    });

    it("succeeds with short sessionSettings", () => {
        const client = new HumeClient({ apiKey: "test" });

        const socket = client.empathicVoice.chat.connect({
            sessionSettings: { systemPrompt: "You are a helpful assistant." },
        });

        expect(socket).toBeDefined();
        expect(socket.socket).toBeDefined();
    });
});
