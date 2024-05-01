/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as Hume from "../../../../api";
import * as core from "../../../../core";
import { JobTlInference } from "./JobTlInference";

export const UnionJobJobTlInference: core.serialization.ObjectSchema<
    serializers.expressionMeasurement.UnionJobJobTlInference.Raw,
    Hume.expressionMeasurement.UnionJobJobTlInference
> = core.serialization.object({}).extend(JobTlInference);

export declare namespace UnionJobJobTlInference {
    interface Raw extends JobTlInference.Raw {}
}