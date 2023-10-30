import { ReadStream } from "fs";

export class StreamSocket {
    constructor(private readonly websocket: WebSocket, private readonly streamWindowMs?: number) {}

    public async sendFile(file: ReadStream) {}
}
