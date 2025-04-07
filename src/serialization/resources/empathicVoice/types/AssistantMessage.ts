/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";
import { ChatMessage } from "./ChatMessage";
import { Inference } from "./Inference";

export const AssistantMessage: core.serialization.ObjectSchema<
    serializers.empathicVoice.AssistantMessage.Raw,
    Hume.empathicVoice.AssistantMessage
> = core.serialization.object({
    customSessionId: core.serialization.property("custom_session_id", core.serialization.string().optional()),
    fromText: core.serialization.property("from_text", core.serialization.boolean()),
    id: core.serialization.string().optional(),
    message: ChatMessage,
    models: Inference,
    type: core.serialization.stringLiteral("assistant_message"),
});

export declare namespace AssistantMessage {
    export interface Raw {
        custom_session_id?: string | null;
        from_text: boolean;
        id?: string | null;
        message: ChatMessage.Raw;
        models: Inference.Raw;
        type: "assistant_message";
    }
}
