/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../../index";
import * as Hume from "../../../../../../../api/index";
import * as core from "../../../../../../../core";
import { PostedConfigPromptSpec } from "../../../../types/PostedConfigPromptSpec";
import { PostedVoice } from "../../../../types/PostedVoice";
import { PostedLanguageModel } from "../../../../types/PostedLanguageModel";
import { PostedEllmModel } from "../../../../types/PostedEllmModel";
import { PostedUserDefinedToolSpec } from "../../../../types/PostedUserDefinedToolSpec";
import { PostedBuiltinTool } from "../../../../types/PostedBuiltinTool";
import { PostedEventMessageSpecs } from "../../../../types/PostedEventMessageSpecs";
import { PostedTimeoutSpecs } from "../../../../types/PostedTimeoutSpecs";
import { PostedWebhookSpec } from "../../../../types/PostedWebhookSpec";

export const PostedConfig: core.serialization.Schema<
    serializers.empathicVoice.PostedConfig.Raw,
    Hume.empathicVoice.PostedConfig
> = core.serialization.object({
    eviVersion: core.serialization.property("evi_version", core.serialization.string()),
    name: core.serialization.string(),
    versionDescription: core.serialization.property("version_description", core.serialization.string().optional()),
    prompt: PostedConfigPromptSpec.optional(),
    voice: PostedVoice.optional(),
    languageModel: core.serialization.property("language_model", PostedLanguageModel.optional()),
    ellmModel: core.serialization.property("ellm_model", PostedEllmModel.optional()),
    tools: core.serialization.list(PostedUserDefinedToolSpec.optional()).optional(),
    builtinTools: core.serialization.property(
        "builtin_tools",
        core.serialization.list(PostedBuiltinTool.optional()).optional(),
    ),
    eventMessages: core.serialization.property("event_messages", PostedEventMessageSpecs.optional()),
    timeouts: PostedTimeoutSpecs.optional(),
    webhooks: core.serialization.list(PostedWebhookSpec.optional()).optional(),
});

export declare namespace PostedConfig {
    export interface Raw {
        evi_version: string;
        name: string;
        version_description?: string | null;
        prompt?: PostedConfigPromptSpec.Raw | null;
        voice?: PostedVoice.Raw | null;
        language_model?: PostedLanguageModel.Raw | null;
        ellm_model?: PostedEllmModel.Raw | null;
        tools?: (PostedUserDefinedToolSpec.Raw | null | undefined)[] | null;
        builtin_tools?: (PostedBuiltinTool.Raw | null | undefined)[] | null;
        event_messages?: PostedEventMessageSpecs.Raw | null;
        timeouts?: PostedTimeoutSpecs.Raw | null;
        webhooks?: (PostedWebhookSpec.Raw | null | undefined)[] | null;
    }
}
