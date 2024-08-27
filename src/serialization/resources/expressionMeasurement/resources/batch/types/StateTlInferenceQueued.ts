/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as Hume from "../../../../../../api/index";
import * as core from "../../../../../../core";
import { Queued } from "./Queued";

export const StateTlInferenceQueued: core.serialization.ObjectSchema<
    serializers.expressionMeasurement.StateTlInferenceQueued.Raw,
    Hume.expressionMeasurement.StateTlInferenceQueued
> = core.serialization.object({}).extend(Queued);

export declare namespace StateTlInferenceQueued {
    interface Raw extends Queued.Raw {}
}