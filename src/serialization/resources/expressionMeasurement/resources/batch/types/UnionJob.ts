/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as Hume from "../../../../../../api/index";
import * as core from "../../../../../../core";
import { InferenceJob } from "./InferenceJob";

export const UnionJob: core.serialization.ObjectSchema<
    serializers.expressionMeasurement.batch.UnionJob.Raw,
    Hume.expressionMeasurement.batch.UnionJob
> = InferenceJob;

export declare namespace UnionJob {
    export type Raw = InferenceJob.Raw;
}
