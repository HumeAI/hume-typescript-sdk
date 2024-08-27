/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as Hume from "../../../../../../api/index";
import * as core from "../../../../../../core";
import { Null } from "./Null";
import { GroupedPredictionsFacemeshPrediction } from "./GroupedPredictionsFacemeshPrediction";

export const PredictionsOptionalNullFacemeshPrediction: core.serialization.ObjectSchema<
    serializers.expressionMeasurement.PredictionsOptionalNullFacemeshPrediction.Raw,
    Hume.expressionMeasurement.PredictionsOptionalNullFacemeshPrediction
> = core.serialization.object({
    metadata: Null.optional(),
    groupedPredictions: core.serialization.property(
        "grouped_predictions",
        core.serialization.list(GroupedPredictionsFacemeshPrediction)
    ),
});

export declare namespace PredictionsOptionalNullFacemeshPrediction {
    interface Raw {
        metadata?: Null.Raw | null;
        grouped_predictions: GroupedPredictionsFacemeshPrediction.Raw[];
    }
}