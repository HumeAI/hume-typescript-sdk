/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Hume from "../../../index";

export type StateTlInference =
    | Hume.customModels.StateTlInference.Queued
    | Hume.customModels.StateTlInference.InProgress
    | Hume.customModels.StateTlInference.Completed
    | Hume.customModels.StateTlInference.Failed;

export declare namespace StateTlInference {
    interface Queued extends Hume.customModels.StateTlInferenceQueued {
        status: "QUEUED";
    }

    interface InProgress extends Hume.customModels.StateTlInferenceInProgress {
        status: "IN_PROGRESS";
    }

    interface Completed extends Hume.customModels.StateTlInferenceCompletedTlInference {
        status: "COMPLETED";
    }

    interface Failed extends Hume.customModels.StateTlInferenceFailed {
        status: "FAILED";
    }
}
