/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";

export const ChatMetadata: core.serialization.ObjectSchema<
    serializers.empathicVoice.ChatMetadata.Raw,
    Hume.empathicVoice.ChatMetadata
> = core.serialization.object({
    chatGroupId: core.serialization.property("chat_group_id", core.serialization.string()),
    chatId: core.serialization.property("chat_id", core.serialization.string()),
    customSessionId: core.serialization.property("custom_session_id", core.serialization.string().optional()),
    requestId: core.serialization.property("request_id", core.serialization.string().optional()),
    type: core.serialization.stringLiteral("chat_metadata"),
});

export declare namespace ChatMetadata {
    interface Raw {
        chat_group_id: string;
        chat_id: string;
        custom_session_id?: string | null;
        request_id?: string | null;
        type: "chat_metadata";
    }
}
