/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";

export const ToolResponseMessage: core.serialization.ObjectSchema<
    serializers.empathicVoice.ToolResponseMessage.Raw,
    Hume.empathicVoice.ToolResponseMessage
> = core.serialization.object({
    type: core.serialization.stringLiteral("tool_response"),
    customSessionId: core.serialization.property("custom_session_id", core.serialization.string().optional()),
    toolCallId: core.serialization.property("tool_call_id", core.serialization.string()),
    content: core.serialization.string(),
});

export declare namespace ToolResponseMessage {
    interface Raw {
        type: "tool_response";
        custom_session_id?: string | null;
        tool_call_id: string;
        content: string;
    }
}