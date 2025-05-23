/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";
import { VoiceProvider } from "./VoiceProvider";

export const PostedUtteranceVoiceWithName: core.serialization.ObjectSchema<
    serializers.tts.PostedUtteranceVoiceWithName.Raw,
    Hume.tts.PostedUtteranceVoiceWithName
> = core.serialization.object({
    name: core.serialization.string(),
    provider: VoiceProvider.optional(),
});

export declare namespace PostedUtteranceVoiceWithName {
    export interface Raw {
        name: string;
        provider?: VoiceProvider.Raw | null;
    }
}
