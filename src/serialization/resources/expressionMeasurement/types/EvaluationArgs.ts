/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as Hume from "../../../../api";
import * as core from "../../../../core";
import { ValidationArgs } from "./ValidationArgs";

export const EvaluationArgs: core.serialization.ObjectSchema<
    serializers.expressionMeasurement.EvaluationArgs.Raw,
    Hume.expressionMeasurement.EvaluationArgs
> = core.serialization.object({
    validation: ValidationArgs.optional(),
});

export declare namespace EvaluationArgs {
    interface Raw {
        validation?: ValidationArgs.Raw | null;
    }
}
