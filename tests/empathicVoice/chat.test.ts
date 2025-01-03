/** THIS FILE IS MANUALLY MAINAINED: see .fernignore */
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
});
