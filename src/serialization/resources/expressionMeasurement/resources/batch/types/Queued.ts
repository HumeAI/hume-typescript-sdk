/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as Hume from "../../../../../../api/index";
import * as core from "../../../../../../core";

export const Queued: core.serialization.ObjectSchema<
    serializers.expressionMeasurement.batch.Queued.Raw,
    Hume.expressionMeasurement.batch.Queued
> = core.serialization.object({
    createdTimestampMs: core.serialization.property("created_timestamp_ms", core.serialization.number()),
});

export declare namespace Queued {
    export interface Raw {
        created_timestamp_ms: number;
    }
}
