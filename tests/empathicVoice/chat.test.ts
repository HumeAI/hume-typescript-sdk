import { HumeClient } from "../../src/";

describe("Empathic Voice Interface", () => {
    it.skip("Chat", async () => {
        const hume = new HumeClient({
            apiKey: "<>",
            secretKey: "<>",
        });

        const socket = hume.empathicVoice.chat.connect();

        socket.on("message", (message) => {
            if (message.type === "audio_output") {
                Buffer.from(message.data, "base64");
            }
        });

        await socket.sendUserInput("Hello, how are you?");
    }, 100000);
});
