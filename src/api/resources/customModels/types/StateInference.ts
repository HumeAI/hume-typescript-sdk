/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Hume from "../../../index";

export type StateInference =
    | Hume.customModels.StateInference.Queued
    | Hume.customModels.StateInference.InProgress
    | Hume.customModels.StateInference.Completed
    | Hume.customModels.StateInference.Failed;

export declare namespace StateInference {
    interface Queued extends Hume.customModels.StateInferenceQueued {
        status: "QUEUED";
    }

    interface InProgress extends Hume.customModels.StateInferenceInProgress {
        status: "IN_PROGRESS";
    }

    interface Completed extends Hume.customModels.StateInferenceCompletedInference {
        status: "COMPLETED";
    }

    interface Failed extends Hume.customModels.StateInferenceFailed {
        status: "FAILED";
    }
}
