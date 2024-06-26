/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";

export const ToxicityScore: core.serialization.ObjectSchema<
    serializers.customModels.ToxicityScore.Raw,
    Hume.customModels.ToxicityScore
> = core.serialization.object({
    name: core.serialization.string(),
    score: core.serialization.string(),
});

export declare namespace ToxicityScore {
    interface Raw {
        name: string;
        score: string;
    }
}
