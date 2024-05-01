import * as WebSocket_ from "ws";
import { RUNTIME } from "../runtime";

export const IsomorphicWebSocket: any = (() => {
    if (typeof WebSocket !== "undefined") {
        return WebSocket;
    }
    if (typeof global?.WebSocket !== "undefined") {
        return global.WebSocket;
    }
    if (RUNTIME.type === "browser" && typeof window?.WebSocket !== "undefined") {
        return window.WebSocket;
    }
    if (WebSocket_.WebSocket) { 
        return WebSocket_.WebSocket;
    }
    return WebSocket_;
})();