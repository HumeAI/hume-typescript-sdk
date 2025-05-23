/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../../../index";
import * as Hume from "../../../../../../../../api/index";
import * as core from "../../../../../../../../core";
import { StreamBoundingBox } from "../../../types/StreamBoundingBox";
import { EmotionEmbedding } from "../../../types/EmotionEmbedding";
import { EmotionEmbeddingItem } from "../../../types/EmotionEmbeddingItem";

export const StreamModelPredictionsFacePredictionsItem: core.serialization.ObjectSchema<
    serializers.expressionMeasurement.stream.StreamModelPredictionsFacePredictionsItem.Raw,
    Hume.expressionMeasurement.stream.StreamModelPredictionsFacePredictionsItem
> = core.serialization.object({
    frame: core.serialization.number().optional(),
    time: core.serialization.number().optional(),
    bbox: StreamBoundingBox.optional(),
    prob: core.serialization.number().optional(),
    faceId: core.serialization.property("face_id", core.serialization.string().optional()),
    emotions: EmotionEmbedding.optional(),
    facs: EmotionEmbedding.optional(),
    descriptions: EmotionEmbedding.optional(),
});

export declare namespace StreamModelPredictionsFacePredictionsItem {
    export interface Raw {
        frame?: number | null;
        time?: number | null;
        bbox?: StreamBoundingBox.Raw | null;
        prob?: number | null;
        face_id?: string | null;
        emotions?: EmotionEmbedding.Raw | null;
        facs?: EmotionEmbedding.Raw | null;
        descriptions?: EmotionEmbedding.Raw | null;
    }
}
