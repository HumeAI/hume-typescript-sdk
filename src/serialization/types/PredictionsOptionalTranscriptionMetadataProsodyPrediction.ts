/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "..";
import * as Hume from "../../api";
import * as core from "../../core";

export const PredictionsOptionalTranscriptionMetadataProsodyPrediction: core.serialization.ObjectSchema<
    serializers.PredictionsOptionalTranscriptionMetadataProsodyPrediction.Raw,
    Hume.PredictionsOptionalTranscriptionMetadataProsodyPrediction
> = core.serialization.object({
    metadata: core.serialization.lazyObject(async () => (await import("..")).TranscriptionMetadata).optional(),
    groupedPredictions: core.serialization.property(
        "grouped_predictions",
        core.serialization.list(
            core.serialization.lazyObject(async () => (await import("..")).GroupedPredictionsProsodyPrediction)
        )
    ),
});

export declare namespace PredictionsOptionalTranscriptionMetadataProsodyPrediction {
    interface Raw {
        metadata?: serializers.TranscriptionMetadata.Raw | null;
        grouped_predictions: serializers.GroupedPredictionsProsodyPrediction.Raw[];
    }
}
