/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";

export const FunctionCallResponseInput: core.serialization.ObjectSchema<
    serializers.empathicVoice.FunctionCallResponseInput.Raw,
    Hume.empathicVoice.FunctionCallResponseInput
> = core.serialization.object({
    type: core.serialization.stringLiteral("function_call_response").optional(),
});

export declare namespace FunctionCallResponseInput {
    interface Raw {
        type?: "function_call_response" | null;
    }
}