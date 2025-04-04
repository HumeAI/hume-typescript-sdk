/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as Hume from "../../../../../../api/index";
import * as core from "../../../../../../core";
import { QueuedState } from "./QueuedState";
import { InProgressState } from "./InProgressState";
import { CompletedState } from "./CompletedState";
import { FailedState } from "./FailedState";

export const StateInference: core.serialization.Schema<
    serializers.expressionMeasurement.batch.StateInference.Raw,
    Hume.expressionMeasurement.batch.StateInference
> = core.serialization
    .union("status", {
        QUEUED: QueuedState,
        IN_PROGRESS: InProgressState,
        COMPLETED: CompletedState,
        FAILED: FailedState,
    })
    .transform<Hume.expressionMeasurement.batch.StateInference>({
        transform: (value) => value,
        untransform: (value) => value,
    });

export declare namespace StateInference {
    export type Raw =
        | StateInference.Queued
        | StateInference.InProgress
        | StateInference.Completed
        | StateInference.Failed;

    export interface Queued extends QueuedState.Raw {
        status: "QUEUED";
    }

    export interface InProgress extends InProgressState.Raw {
        status: "IN_PROGRESS";
    }

    export interface Completed extends CompletedState.Raw {
        status: "COMPLETED";
    }

    export interface Failed extends FailedState.Raw {
        status: "FAILED";
    }
}
