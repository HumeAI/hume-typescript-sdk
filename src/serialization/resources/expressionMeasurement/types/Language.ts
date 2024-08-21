/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";
import { Granularity } from "./Granularity";
import { Unconfigurable } from "./Unconfigurable";

export const Language: core.serialization.ObjectSchema<
    serializers.expressionMeasurement.Language.Raw,
    Hume.expressionMeasurement.Language
> = core.serialization.object({
    granularity: Granularity.optional(),
    sentiment: Unconfigurable.optional(),
    toxicity: Unconfigurable.optional(),
    identifySpeakers: core.serialization.property("identify_speakers", core.serialization.boolean().optional()),
});

export declare namespace Language {
    interface Raw {
        granularity?: Granularity.Raw | null;
        sentiment?: Unconfigurable.Raw | null;
        toxicity?: Unconfigurable.Raw | null;
        identify_speakers?: boolean | null;
    }
}
