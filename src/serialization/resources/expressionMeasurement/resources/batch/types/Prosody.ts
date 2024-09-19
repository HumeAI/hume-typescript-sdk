/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as Hume from "../../../../../../api/index";
import * as core from "../../../../../../core";
import { Granularity } from "./Granularity";
import { Window } from "./Window";

export const Prosody: core.serialization.ObjectSchema<
    serializers.expressionMeasurement.batch.Prosody.Raw,
    Hume.expressionMeasurement.batch.Prosody
> = core.serialization.object({
    granularity: Granularity.optional(),
    window: Window.optional(),
    identifySpeakers: core.serialization.property("identify_speakers", core.serialization.boolean().optional()),
});

export declare namespace Prosody {
    interface Raw {
        granularity?: Granularity.Raw | null;
        window?: Window.Raw | null;
        identify_speakers?: boolean | null;
    }
}
