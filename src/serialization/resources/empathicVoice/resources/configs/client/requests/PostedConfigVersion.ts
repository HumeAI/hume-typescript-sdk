/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../..";
import * as Hume from "../../../../../../../api";
import * as core from "../../../../../../../core";
import { PostedPromptSpec } from "../../../../types/PostedPromptSpec";
import { PostedLanguageModel } from "../../../../types/PostedLanguageModel";

export const PostedConfigVersion: core.serialization.Schema<
    serializers.empathicVoice.PostedConfigVersion.Raw,
    Hume.empathicVoice.PostedConfigVersion
> = core.serialization.object({
    versionDescription: core.serialization.property("version_description", core.serialization.string().optional()),
    prompt: PostedPromptSpec.optional(),
    languageModel: core.serialization.property("language_model", PostedLanguageModel.optional()),
});

export declare namespace PostedConfigVersion {
    interface Raw {
        version_description?: string | null;
        prompt?: PostedPromptSpec.Raw | null;
        language_model?: PostedLanguageModel.Raw | null;
    }
}
