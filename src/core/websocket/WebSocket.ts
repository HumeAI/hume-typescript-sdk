export declare namespace WebSocket {
    export interface Options {
        timeout: number;
    }
}

export async function connect(url: string): Promise<any> {
    if (typeof window != "undefined" && typeof window.WebSocket !== 'undefined') {
        return new window.WebSocket(url);
    }
    return new ((await import("ws")).WebSocket)(url);
}