/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";

export const WebSocketError: core.serialization.ObjectSchema<
    serializers.empathicVoice.WebSocketError.Raw,
    Hume.empathicVoice.WebSocketError
> = core.serialization.object({
    type: core.serialization.stringLiteral("error"),
    customSessionId: core.serialization.property("custom_session_id", core.serialization.string().optional()),
    code: core.serialization.string(),
    slug: core.serialization.string(),
    message: core.serialization.string(),
});

export declare namespace WebSocketError {
    interface Raw {
        type: "error";
        custom_session_id?: string | null;
        code: string;
        slug: string;
        message: string;
    }
}
