/**
 * This file was manually added to provide backward compatibility.
 * 
 * @deprecated Use `serialization.empathicVoice.SubscribeEvent` instead.
 * This serializer alias will be removed in a future version.
 */

import { SubscribeEvent as NewSubscribeEvent } from "../../../types/SubscribeEvent.js";

/**
 * @deprecated Use `serialization.empathicVoice.SubscribeEvent` instead.
 * This serializer alias will be removed in a future version.
 */
export const SubscribeEvent = NewSubscribeEvent;

export declare namespace SubscribeEvent {
    /**
     * @deprecated Use `serialization.empathicVoice.SubscribeEvent.Raw` instead.
     * This type alias will be removed in a future version.
     */
    export type Raw = NewSubscribeEvent.Raw;
}

