/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as Hume from "../../../../api";
import * as core from "../../../../core";

export const ReturnChatEvent: core.serialization.ObjectSchema<
    serializers.empathicVoice.ReturnChatEvent.Raw,
    Hume.empathicVoice.ReturnChatEvent
> = core.serialization.object({
    id: core.serialization.string(),
    timestamp: core.serialization.number(),
    role: core.serialization.string(),
    type: core.serialization.string(),
    messageText: core.serialization.property("message_text", core.serialization.string().optional()),
    emotionFeatures: core.serialization.property("emotion_features", core.serialization.string().optional()),
    metadata: core.serialization.string().optional(),
});

export declare namespace ReturnChatEvent {
    interface Raw {
        id: string;
        timestamp: number;
        role: string;
        type: string;
        message_text?: string | null;
        emotion_features?: string | null;
        metadata?: string | null;
    }
}