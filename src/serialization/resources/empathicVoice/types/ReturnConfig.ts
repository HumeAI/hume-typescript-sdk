/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";
import { ReturnPrompt } from "./ReturnPrompt";
import { ReturnVoice } from "./ReturnVoice";
import { ReturnLanguageModel } from "./ReturnLanguageModel";
import { ReturnEllmModel } from "./ReturnEllmModel";
import { ReturnUserDefinedTool } from "./ReturnUserDefinedTool";
import { ReturnBuiltinTool } from "./ReturnBuiltinTool";
import { ReturnEventMessageSpecs } from "./ReturnEventMessageSpecs";
import { ReturnTimeoutSpecs } from "./ReturnTimeoutSpecs";
import { ReturnNudgeSpec } from "./ReturnNudgeSpec";
import { ReturnWebhookSpec } from "./ReturnWebhookSpec";

export const ReturnConfig: core.serialization.ObjectSchema<
    serializers.empathicVoice.ReturnConfig.Raw,
    Hume.empathicVoice.ReturnConfig
> = core.serialization.object({
    id: core.serialization.string().optional(),
    version: core.serialization.number().optional(),
    eviVersion: core.serialization.property("evi_version", core.serialization.string().optional()),
    versionDescription: core.serialization.property("version_description", core.serialization.string().optional()),
    name: core.serialization.string().optional(),
    createdOn: core.serialization.property("created_on", core.serialization.number().optional()),
    modifiedOn: core.serialization.property("modified_on", core.serialization.number().optional()),
    prompt: ReturnPrompt.optional(),
    voice: ReturnVoice.optional(),
    languageModel: core.serialization.property("language_model", ReturnLanguageModel.optional()),
    ellmModel: core.serialization.property("ellm_model", ReturnEllmModel.optional()),
    tools: core.serialization.list(ReturnUserDefinedTool.optional()).optional(),
    builtinTools: core.serialization.property(
        "builtin_tools",
        core.serialization.list(ReturnBuiltinTool.optional()).optional(),
    ),
    eventMessages: core.serialization.property("event_messages", ReturnEventMessageSpecs.optional()),
    timeouts: ReturnTimeoutSpecs.optional(),
    nudges: ReturnNudgeSpec.optional(),
    webhooks: core.serialization.list(ReturnWebhookSpec.optional()).optional(),
});

export declare namespace ReturnConfig {
    export interface Raw {
        id?: string | null;
        version?: number | null;
        evi_version?: string | null;
        version_description?: string | null;
        name?: string | null;
        created_on?: number | null;
        modified_on?: number | null;
        prompt?: ReturnPrompt.Raw | null;
        voice?: ReturnVoice.Raw | null;
        language_model?: ReturnLanguageModel.Raw | null;
        ellm_model?: ReturnEllmModel.Raw | null;
        tools?: (ReturnUserDefinedTool.Raw | null | undefined)[] | null;
        builtin_tools?: (ReturnBuiltinTool.Raw | null | undefined)[] | null;
        event_messages?: ReturnEventMessageSpecs.Raw | null;
        timeouts?: ReturnTimeoutSpecs.Raw | null;
        nudges?: ReturnNudgeSpec.Raw | null;
        webhooks?: (ReturnWebhookSpec.Raw | null | undefined)[] | null;
    }
}
