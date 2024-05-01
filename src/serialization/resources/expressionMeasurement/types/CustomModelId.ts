/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as Hume from "../../../../api";
import * as core from "../../../../core";

export const CustomModelId: core.serialization.ObjectSchema<
    serializers.expressionMeasurement.CustomModelId.Raw,
    Hume.expressionMeasurement.CustomModelId
> = core.serialization.object({
    id: core.serialization.string(),
});

export declare namespace CustomModelId {
    interface Raw {
        id: string;
    }
}