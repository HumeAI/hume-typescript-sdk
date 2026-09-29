import { ChatSocket } from "../../../src/api/resources/empathicVoice/resources/chat/client/Socket.js";
import { ReconnectingWebSocket } from "../../../src/core/websocket/index.js";

class FakeWebSocket {
    static CONNECTING = 0;
    static OPEN = 1;
    static CLOSING = 2;
    static CLOSED = 3;
    static instances: FakeWebSocket[] = [];

    readyState = 0;
    binaryType = "blob";
    bufferedAmount = 0;
    extensions = "";
    protocol = "";
    private listeners: Record<string, Array<(event: unknown) => void>> = {};

    constructor(public url: string) {
        FakeWebSocket.instances.push(this);
    }

    addEventListener(type: string, listener: (event: unknown) => void) {
        this.listeners[type] = [...(this.listeners[type] ?? []), listener];
    }

    removeEventListener(type: string, listener: (event: unknown) => void) {
        this.listeners[type] = (this.listeners[type] ?? []).filter((l) => l !== listener);
    }

    send() {}

    close() {
        this.readyState = 3;
    }

    emit(type: string, event: unknown) {
        for (const listener of this.listeners[type] ?? []) {
            listener(event);
        }
    }
}

const createSocket = () => {
    FakeWebSocket.instances = [];
    const socket = new ReconnectingWebSocket({
        url: "wss://example.test/v0/evi/chat",
        options: { WebSocket: FakeWebSocket, minReconnectionDelay: 0, maxRetries: 0 },
    });
    return new ChatSocket({ socket });
};

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

describe("ChatSocket", () => {
    describe("connect", () => {
        it("delivers each message to a handler once after connect() is called", async () => {
            const chatSocket = createSocket();
            const onMessage = vi.fn();
            const onOpen = vi.fn();
            chatSocket.on("message", onMessage);
            chatSocket.on("open", onOpen);

            chatSocket.connect();
            await flush();

            const ws = FakeWebSocket.instances[FakeWebSocket.instances.length - 1] as FakeWebSocket;
            ws.readyState = 1;
            ws.emit("open", { type: "open" });
            ws.emit("message", { type: "message", data: JSON.stringify({ type: "user_message" }) });

            expect(onOpen).toHaveBeenCalledTimes(1);
            expect(onMessage).toHaveBeenCalledTimes(1);
        });

        it("delivers each message once when connect() is called repeatedly", async () => {
            const chatSocket = createSocket();
            const onMessage = vi.fn();
            chatSocket.on("message", onMessage);

            chatSocket.connect();
            chatSocket.connect();
            await flush();

            const ws = FakeWebSocket.instances[FakeWebSocket.instances.length - 1] as FakeWebSocket;
            ws.readyState = 1;
            ws.emit("message", { type: "message", data: JSON.stringify({ type: "user_message" }) });

            expect(onMessage).toHaveBeenCalledTimes(1);
        });
    });
});
