/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";
import { PostedContext } from "./PostedContext";
import { Format } from "./Format";
import { PostedUtterance } from "./PostedUtterance";

export const PostedTts: core.serialization.ObjectSchema<serializers.tts.PostedTts.Raw, Hume.tts.PostedTts> =
    core.serialization.object({
        context: PostedContext.optional(),
        format: Format.optional(),
        numGenerations: core.serialization.property("num_generations", core.serialization.number().optional()),
        splitUtterances: core.serialization.property("split_utterances", core.serialization.boolean().optional()),
        utterances: core.serialization.list(PostedUtterance),
        instantMode: core.serialization.property("instant_mode", core.serialization.boolean().optional()),
    });

export declare namespace PostedTts {
    export interface Raw {
        context?: PostedContext.Raw | null;
        format?: Format.Raw | null;
        num_generations?: number | null;
        split_utterances?: boolean | null;
        utterances: PostedUtterance.Raw[];
        instant_mode?: boolean | null;
    }
}
