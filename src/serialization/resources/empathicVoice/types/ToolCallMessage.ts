/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";
import { ToolType } from "./ToolType";

export const ToolCallMessage: core.serialization.ObjectSchema<
    serializers.empathicVoice.ToolCallMessage.Raw,
    Hume.empathicVoice.ToolCallMessage
> = core.serialization.object({
    customSessionId: core.serialization.property("custom_session_id", core.serialization.string().optional()),
    name: core.serialization.string(),
    parameters: core.serialization.string(),
    responseRequired: core.serialization.property("response_required", core.serialization.boolean()),
    toolCallId: core.serialization.property("tool_call_id", core.serialization.string()),
    toolType: core.serialization.property("tool_type", ToolType.optional()),
    type: core.serialization.stringLiteral("tool_call"),
});

export declare namespace ToolCallMessage {
    interface Raw {
        custom_session_id?: string | null;
        name: string;
        parameters: string;
        response_required: boolean;
        tool_call_id: string;
        tool_type?: ToolType.Raw | null;
        type: "tool_call";
    }
}
