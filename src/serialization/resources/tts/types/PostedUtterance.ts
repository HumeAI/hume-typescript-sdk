/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";
import { PostedUtteranceVoice } from "./PostedUtteranceVoice";

export const PostedUtterance: core.serialization.ObjectSchema<
    serializers.tts.PostedUtterance.Raw,
    Hume.tts.PostedUtterance
> = core.serialization.object({
    description: core.serialization.string().optional(),
    speed: core.serialization.number().optional(),
    text: core.serialization.string(),
    trailingSilence: core.serialization.property("trailing_silence", core.serialization.number().optional()),
    voice: PostedUtteranceVoice.optional(),
});

export declare namespace PostedUtterance {
    interface Raw {
        description?: string | null;
        speed?: number | null;
        text: string;
        trailing_silence?: number | null;
        voice?: PostedUtteranceVoice.Raw | null;
    }
}
