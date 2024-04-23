import { HumeClient, ffplay, base64Decode } from "../../src/";

describe("Empathic Voice Interface", () => {
    it.skip("Chat", async () => {
        const hume = new HumeClient({
            apiKey: "<>",
            clientSecret: "<>",
        });

        const socket = await hume.empathicVoice.chat.connect({
            async onMessage(message): Promise<void> {
                if (message.type === "audio_output") {
                    const decoded = Buffer.from(message.data, "base64");
                    await ffplay(decoded);
                }
            }
        });

        await socket.sendRaw({
            type: "user_input",
            text: "Hello, how are you?",
        });

    }, 100000);
});
