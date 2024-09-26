/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as Hume from "../../../../../../api/index";
import * as core from "../../../../../../core";
import { CustomModelPrediction } from "./CustomModelPrediction";

export const TlInferencePrediction: core.serialization.ObjectSchema<
    serializers.expressionMeasurement.batch.TlInferencePrediction.Raw,
    Hume.expressionMeasurement.batch.TlInferencePrediction
> = core.serialization.object({
    file: core.serialization.string(),
    fileType: core.serialization.property("file_type", core.serialization.string()),
    customModels: core.serialization.property(
        "custom_models",
        core.serialization.record(core.serialization.string(), CustomModelPrediction)
    ),
});

export declare namespace TlInferencePrediction {
    interface Raw {
        file: string;
        file_type: string;
        custom_models: Record<string, CustomModelPrediction.Raw>;
    }
}
