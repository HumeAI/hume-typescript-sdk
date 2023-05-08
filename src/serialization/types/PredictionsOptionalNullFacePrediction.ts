/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "..";
import * as Hume from "../../api";
import * as core from "../../core";

export const PredictionsOptionalNullFacePrediction: core.serialization.ObjectSchema<
    serializers.PredictionsOptionalNullFacePrediction.Raw,
    Hume.PredictionsOptionalNullFacePrediction
> = core.serialization.object({
    metadata: core.serialization.lazy(async () => (await import("..")).Null).optional(),
    groupedPredictions: core.serialization.property(
        "grouped_predictions",
        core.serialization.list(
            core.serialization.lazyObject(async () => (await import("..")).GroupedPredictionsFacePrediction)
        )
    ),
});

export declare namespace PredictionsOptionalNullFacePrediction {
    interface Raw {
        metadata?: serializers.Null.Raw | null;
        grouped_predictions: serializers.GroupedPredictionsFacePrediction.Raw[];
    }
}
