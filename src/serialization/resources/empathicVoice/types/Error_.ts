/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as Hume from "../../../../api";
import * as core from "../../../../core";

export const Error_: core.serialization.ObjectSchema<serializers.empathicVoice.Error_.Raw, Hume.empathicVoice.Error_> =
    core.serialization.object({
        code: core.serialization.string(),
        customSessionId: core.serialization.property("custom_session_id", core.serialization.string().optional()),
        message: core.serialization.string(),
        slug: core.serialization.string(),
        type: core.serialization.stringLiteral("error"),
    });

export declare namespace Error_ {
    interface Raw {
        code: string;
        custom_session_id?: string | null;
        message: string;
        slug: string;
        type: "error";
    }
}