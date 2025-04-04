/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";

export const PostedPromptSpec: core.serialization.ObjectSchema<
    serializers.empathicVoice.PostedPromptSpec.Raw,
    Hume.empathicVoice.PostedPromptSpec
> = core.serialization.object({
    version: core.serialization.unknown().optional(),
});

export declare namespace PostedPromptSpec {
    export interface Raw {
        version?: unknown | null;
    }
}
