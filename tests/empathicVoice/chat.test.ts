import { HumeClient } from "../../src/";

describe("Empathic Voice Interface", () => {
    it.skip("Chat", async () => {
        const hume = new HumeClient({
            apiKey: "<>",
            secretKey: "<>",
        });

        const socket = await hume.empathicVoice.chat.connect({
            async onMessage(message): Promise<void> {
                if (message.type === "audio_output") {
                    Buffer.from(message.data, "base64");
                }
            },
        });

        await socket.sendTextInput("Hello, how are you?");
    }, 100000);
});
