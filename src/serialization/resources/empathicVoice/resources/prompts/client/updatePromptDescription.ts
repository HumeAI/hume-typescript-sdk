/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as Hume from "../../../../../../api/index";
import * as core from "../../../../../../core";
import { ReturnPrompt } from "../../../types/ReturnPrompt";

export const Response: core.serialization.Schema<
    serializers.empathicVoice.prompts.updatePromptDescription.Response.Raw,
    Hume.empathicVoice.ReturnPrompt | undefined
> = ReturnPrompt.optional();

export declare namespace Response {
    export type Raw = ReturnPrompt.Raw | null | undefined;
}
