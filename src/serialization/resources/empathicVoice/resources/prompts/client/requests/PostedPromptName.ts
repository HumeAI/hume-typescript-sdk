/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../../index";
import * as Hume from "../../../../../../../api/index";
import * as core from "../../../../../../../core";

export const PostedPromptName: core.serialization.Schema<
    serializers.empathicVoice.PostedPromptName.Raw,
    Hume.empathicVoice.PostedPromptName
> = core.serialization.object({
    name: core.serialization.string(),
});

export declare namespace PostedPromptName {
    export interface Raw {
        name: string;
    }
}
