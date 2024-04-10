/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as Hume from "../../../../api";
import * as core from "../../../../core";
import { Queued } from "./Queued";

export const StateTrainingQueued: core.serialization.ObjectSchema<
    serializers.expressionMeasurement.StateTrainingQueued.Raw,
    Hume.expressionMeasurement.StateTrainingQueued
> = core.serialization.object({}).extend(Queued);

export declare namespace StateTrainingQueued {
    interface Raw extends Queued.Raw {}
}
