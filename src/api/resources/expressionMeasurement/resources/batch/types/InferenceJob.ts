/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Hume from "../../../../../index";

export interface InferenceJob extends Hume.expressionMeasurement.batch.JobInference {
    /**
     * Denotes the job type.
     *
     * Jobs created with the Expression Measurement API will have this field set to `INFERENCE`.
     */
    type: string;
}
