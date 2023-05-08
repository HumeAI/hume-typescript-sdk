/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "..";
import * as Hume from "../../api";
import * as core from "../../core";

export const ModelsPredictions: core.serialization.ObjectSchema<
    serializers.ModelsPredictions.Raw,
    Hume.ModelsPredictions
> = core.serialization.object({
    face: core.serialization
        .lazyObject(async () => (await import("..")).PredictionsOptionalNullFacePrediction)
        .optional(),
    burst: core.serialization
        .lazyObject(async () => (await import("..")).PredictionsOptionalNullBurstPrediction)
        .optional(),
    prosody: core.serialization
        .lazyObject(async () => (await import("..")).PredictionsOptionalTranscriptionMetadataProsodyPrediction)
        .optional(),
    language: core.serialization
        .lazyObject(async () => (await import("..")).PredictionsOptionalTranscriptionMetadataLanguagePrediction)
        .optional(),
    ner: core.serialization
        .lazyObject(async () => (await import("..")).PredictionsOptionalTranscriptionMetadataNerPrediction)
        .optional(),
    facemesh: core.serialization
        .lazyObject(async () => (await import("..")).PredictionsOptionalNullFacemeshPrediction)
        .optional(),
});

export declare namespace ModelsPredictions {
    interface Raw {
        face?: serializers.PredictionsOptionalNullFacePrediction.Raw | null;
        burst?: serializers.PredictionsOptionalNullBurstPrediction.Raw | null;
        prosody?: serializers.PredictionsOptionalTranscriptionMetadataProsodyPrediction.Raw | null;
        language?: serializers.PredictionsOptionalTranscriptionMetadataLanguagePrediction.Raw | null;
        ner?: serializers.PredictionsOptionalTranscriptionMetadataNerPrediction.Raw | null;
        facemesh?: serializers.PredictionsOptionalNullFacemeshPrediction.Raw | null;
    }
}