/**
 * THIS FILE IS MANUALLY MAINTAINED: see .fernignore
 *
 * @deprecated This module is deprecated. Do not import from `Hume.empathicVoice.chat`.
 * These exports are provided only for backwards compatibility and will be removed in a future version.
 *
 * If you need to reference types, use `typeof` instead:
 *
 * Before:
 * ```typescript
 * import { HumeClient } from "hume";
 * const connectArgs: Hume.empathicVoice.chat.Chat.ConnectArgs = { configId: "..." };
 * ```
 *
 * After:
 * ```typescript
 * import { HumeClient } from "hume";
 * const hume = new HumeClient({ apiKey: "..." });
 * type ConnectArgs = NonNullable<Parameters<typeof hume.empathicVoice.chat.connect>[0]>;
 * const connectArgs: ConnectArgs = { configId: "..." };
 * ```
 *
 * @module
 */

import { ChatSocket as _ChatSocket } from "./Socket.js";
import { ChatClient as _Chat } from "./Client.js";

/**
 * @deprecated Do not use. This export will be removed in a future version.
 */
export const ChatSocket: typeof _ChatSocket = _ChatSocket;

/**
 * @deprecated Do not use. This export will be removed in a future version.
 */
export const Chat: typeof _Chat = _Chat;

/**
 * @deprecated Do not use. Use `typeof` to reference types instead.
 *
 * Before:
 * ```typescript
 * const connectArgs: Hume.empathicVoice.chat.Chat.ConnectArgs = { configId: "..." };
 * ```
 *
 * After:
 * ```typescript
 * const hume = new HumeClient({ apiKey: "..." });
 * type ConnectArgs = NonNullable<Parameters<typeof hume.empathicVoice.chat.connect>[0]>;
 * const connectArgs: ConnectArgs = { configId: "..." };
 * ```
 */
export declare namespace Chat {
    /**
     * @deprecated Do not use. Use `typeof` to reference this type.
     */
    export type Options = _Chat.Options;

    /**
     * @deprecated Do not use. Use `typeof` to reference this type.
     */
    export type ConnectArgs = _Chat.ConnectArgs;
}
