/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../../index";
import * as Hume from "../../../../../../../api/index";
import * as core from "../../../../../../../core";

export const PostedPrompt: core.serialization.Schema<
    serializers.empathicVoice.PostedPrompt.Raw,
    Hume.empathicVoice.PostedPrompt
> = core.serialization.object({
    name: core.serialization.string(),
    versionDescription: core.serialization.property("version_description", core.serialization.string().optional()),
    text: core.serialization.string(),
});

export declare namespace PostedPrompt {
    interface Raw {
        name: string;
        version_description?: string | null;
        text: string;
    }
}
