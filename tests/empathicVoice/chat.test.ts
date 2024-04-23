import { HumeClient } from "../../src/"
import { play } from "../../src/wrapper/empathicVoice/chat/audio/play"

describe("Empathic Voice Interface", () => {
    it("Chat", async () => {
        const hume = new HumeClient({
            apiKey: "<>",
            clientSecret: "<>",
        });

        const socket = await hume.empathicVoice.chat.connect({
            async onMessage(message): Promise<void> {
                if (message.type === "audio_output") {
                    const decodedString = Buffer.from(message.data, 'base64');
                    await play(decodedString)
                }
            }
        });

        await socket.sendRaw({
            type: "user_input",
            text: "Hello, how are you?",
        });

        await socket.sendRaw({
            type: "user_input",
            text: "Nothing much! what about you?",
        });

    }, 100000);
});
