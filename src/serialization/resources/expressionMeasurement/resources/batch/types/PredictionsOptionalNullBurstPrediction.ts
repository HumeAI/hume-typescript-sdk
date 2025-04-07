/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as Hume from "../../../../../../api/index";
import * as core from "../../../../../../core";
import { Null } from "./Null";
import { GroupedPredictionsBurstPrediction } from "./GroupedPredictionsBurstPrediction";

export const PredictionsOptionalNullBurstPrediction: core.serialization.ObjectSchema<
    serializers.expressionMeasurement.batch.PredictionsOptionalNullBurstPrediction.Raw,
    Hume.expressionMeasurement.batch.PredictionsOptionalNullBurstPrediction
> = core.serialization.object({
    metadata: Null.optional(),
    groupedPredictions: core.serialization.property(
        "grouped_predictions",
        core.serialization.list(GroupedPredictionsBurstPrediction),
    ),
});

export declare namespace PredictionsOptionalNullBurstPrediction {
    export interface Raw {
        metadata?: Null.Raw | null;
        grouped_predictions: GroupedPredictionsBurstPrediction.Raw[];
    }
}
