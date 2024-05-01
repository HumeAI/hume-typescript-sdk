import * as WebSocket_ from "ws";

export const IsomorphicWebSocket: any = (() => {
    // Use browser Websocket implementation if present
    if (window != null && typeof window?.WebSocket !== "undefined") {
        return window.WebSocket;
    }
    if (WebSocket_.WebSocket) { 
        return WebSocket_.WebSocket;
    }
    return WebSocket_;
})();