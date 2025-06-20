/** THIS FILE IS MANUALLY MAINAINED: see .fernignore */
import { createHostnameWithProtocol } from "../../src/api/resources/empathicVoice/resources/chat/client/Client";
import { HumeClient } from "../../src/";

describe("Empathic Voice Interface", () => {
    it.skip("Chat", async () => {
        const hume = new HumeClient({
            accessToken: "<>",
        });

        const socket = hume.empathicVoice.chat.connect({
            debug: true,
            reconnectAttempts: 30,
        });

        await socket.tillSocketOpen();

        socket.on("message", (message) => {
            if (message.type === "audio_output") {
                Buffer.from(message.data, "base64");
            }
        });

        socket.sendUserInput("Hello, how are you?");
    }, 100000);

    it.each([
        ["https://foo.bar", "wss://foo.bar"],
        ["http://foo.bar", "ws://foo.bar"],
        ["wss://foo.bar", "wss://foo.bar"],
        ["ws://foo.bar", "ws://foo.bar"],
        ["foo.bar", "wss://foo.bar"],
    ])("Generates the correct hostname for %s", (input, expected) => {
        expect(createHostnameWithProtocol(input)).toBe(expected);
    });
});
