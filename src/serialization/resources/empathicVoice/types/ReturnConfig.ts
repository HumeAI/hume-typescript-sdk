/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";
import { ReturnTimeoutSpecs } from "./ReturnTimeoutSpecs";
import { ReturnNudgeSpec } from "./ReturnNudgeSpec";
import { ReturnEllmModel } from "./ReturnEllmModel";
import { ReturnPrompt } from "./ReturnPrompt";
import { ReturnUserDefinedTool } from "./ReturnUserDefinedTool";
import { ReturnWebhookSpec } from "./ReturnWebhookSpec";
import { ReturnLanguageModel } from "./ReturnLanguageModel";
import { ReturnBuiltinTool } from "./ReturnBuiltinTool";
import { ReturnEventMessageSpecs } from "./ReturnEventMessageSpecs";

export const ReturnConfig: core.serialization.ObjectSchema<
    serializers.empathicVoice.ReturnConfig.Raw,
    Hume.empathicVoice.ReturnConfig
> = core.serialization.object({
    name: core.serialization.string().optional(),
    id: core.serialization.string().optional(),
    version: core.serialization.number().optional(),
    eviVersion: core.serialization.property("evi_version", core.serialization.string().optional()),
    timeouts: ReturnTimeoutSpecs.optional(),
    nudges: ReturnNudgeSpec.optional(),
    ellmModel: core.serialization.property("ellm_model", ReturnEllmModel.optional()),
    voice: core.serialization.unknown().optional(),
    prompt: ReturnPrompt.optional(),
    tools: core.serialization.list(ReturnUserDefinedTool.optional()).optional(),
    webhooks: core.serialization.list(ReturnWebhookSpec.optional()).optional(),
    createdOn: core.serialization.property("created_on", core.serialization.number().optional()),
    modifiedOn: core.serialization.property("modified_on", core.serialization.number().optional()),
    languageModel: core.serialization.property("language_model", ReturnLanguageModel.optional()),
    builtinTools: core.serialization.property(
        "builtin_tools",
        core.serialization.list(ReturnBuiltinTool.optional()).optional(),
    ),
    eventMessages: core.serialization.property("event_messages", ReturnEventMessageSpecs.optional()),
    versionDescription: core.serialization.property("version_description", core.serialization.string().optional()),
});

export declare namespace ReturnConfig {
    export interface Raw {
        name?: string | null;
        id?: string | null;
        version?: number | null;
        evi_version?: string | null;
        timeouts?: ReturnTimeoutSpecs.Raw | null;
        nudges?: ReturnNudgeSpec.Raw | null;
        ellm_model?: ReturnEllmModel.Raw | null;
        voice?: unknown | null;
        prompt?: ReturnPrompt.Raw | null;
        tools?: (ReturnUserDefinedTool.Raw | null | undefined)[] | null;
        webhooks?: (ReturnWebhookSpec.Raw | null | undefined)[] | null;
        created_on?: number | null;
        modified_on?: number | null;
        language_model?: ReturnLanguageModel.Raw | null;
        builtin_tools?: (ReturnBuiltinTool.Raw | null | undefined)[] | null;
        event_messages?: ReturnEventMessageSpecs.Raw | null;
        version_description?: string | null;
    }
}
