/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Hume from "../../../index";

export interface BurstPrediction {
    time: Hume.expressionMeasurement.TimeInterval;
    /** A high-dimensional embedding in emotion space. */
    emotions: Hume.expressionMeasurement.EmotionScore[];
    /** Modality-specific descriptive features and their scores. */
    descriptions: Hume.expressionMeasurement.DescriptionsScore[];
}
