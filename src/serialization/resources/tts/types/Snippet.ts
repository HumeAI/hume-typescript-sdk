/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";

export const Snippet: core.serialization.ObjectSchema<serializers.tts.Snippet.Raw, Hume.tts.Snippet> =
    core.serialization.object({
        audio: core.serialization.string(),
        generationId: core.serialization.property("generation_id", core.serialization.string()),
        id: core.serialization.string(),
        text: core.serialization.string(),
        transcribedText: core.serialization.property("transcribed_text", core.serialization.string().optional()),
        utteranceIndex: core.serialization.property("utterance_index", core.serialization.number().optional()),
    });

export declare namespace Snippet {
    export interface Raw {
        audio: string;
        generation_id: string;
        id: string;
        text: string;
        transcribed_text?: string | null;
        utterance_index?: number | null;
    }
}
