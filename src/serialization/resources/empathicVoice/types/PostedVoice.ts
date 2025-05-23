/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";
import { PostedVoiceProvider } from "./PostedVoiceProvider";
import { PostedCustomVoice } from "./PostedCustomVoice";

export const PostedVoice: core.serialization.ObjectSchema<
    serializers.empathicVoice.PostedVoice.Raw,
    Hume.empathicVoice.PostedVoice
> = core.serialization.object({
    provider: PostedVoiceProvider,
    name: core.serialization.string().optional(),
    customVoice: core.serialization.property("custom_voice", PostedCustomVoice.optional()),
});

export declare namespace PostedVoice {
    export interface Raw {
        provider: PostedVoiceProvider.Raw;
        name?: string | null;
        custom_voice?: PostedCustomVoice.Raw | null;
    }
}
