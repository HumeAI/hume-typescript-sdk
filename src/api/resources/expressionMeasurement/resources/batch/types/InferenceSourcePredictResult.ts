/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Hume from "../../../../../index";

export interface InferenceSourcePredictResult {
    source: Hume.expressionMeasurement.batch.Source;
    results?: Hume.expressionMeasurement.batch.InferenceResults;
    /** An error message. */
    error?: string;
}
