/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../../../index";
import * as Hume from "../../../../../../../../api/index";
import * as core from "../../../../../../../../core";
import { EmotionEmbedding } from "../../../types/EmotionEmbedding";
import { EmotionEmbeddingItem } from "../../../types/EmotionEmbeddingItem";

export const StreamModelPredictionsFacemeshPredictionsItem: core.serialization.ObjectSchema<
    serializers.expressionMeasurement.stream.StreamModelPredictionsFacemeshPredictionsItem.Raw,
    Hume.expressionMeasurement.stream.StreamModelPredictionsFacemeshPredictionsItem
> = core.serialization.object({
    emotions: EmotionEmbedding.optional(),
});

export declare namespace StreamModelPredictionsFacemeshPredictionsItem {
    export interface Raw {
        emotions?: EmotionEmbedding.Raw | null;
    }
}
