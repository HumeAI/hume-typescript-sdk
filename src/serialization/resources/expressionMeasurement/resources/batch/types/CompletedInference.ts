/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as Hume from "../../../../../../api/index";
import * as core from "../../../../../../core";

export const CompletedInference: core.serialization.ObjectSchema<
    serializers.expressionMeasurement.batch.CompletedInference.Raw,
    Hume.expressionMeasurement.batch.CompletedInference
> = core.serialization.object({
    createdTimestampMs: core.serialization.property("created_timestamp_ms", core.serialization.number()),
    startedTimestampMs: core.serialization.property("started_timestamp_ms", core.serialization.number()),
    endedTimestampMs: core.serialization.property("ended_timestamp_ms", core.serialization.number()),
    numPredictions: core.serialization.property("num_predictions", core.serialization.number()),
    numErrors: core.serialization.property("num_errors", core.serialization.number()),
});

export declare namespace CompletedInference {
    interface Raw {
        created_timestamp_ms: number;
        started_timestamp_ms: number;
        ended_timestamp_ms: number;
        num_predictions: number;
        num_errors: number;
    }
}
