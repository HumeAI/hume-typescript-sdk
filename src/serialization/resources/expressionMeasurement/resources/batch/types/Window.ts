/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as Hume from "../../../../../../api/index";
import * as core from "../../../../../../core";

export const Window: core.serialization.ObjectSchema<
    serializers.expressionMeasurement.batch.Window.Raw,
    Hume.expressionMeasurement.batch.Window
> = core.serialization.object({
    length: core.serialization.number().optional(),
    step: core.serialization.number().optional(),
});

export declare namespace Window {
    interface Raw {
        length?: number | null;
        step?: number | null;
    }
}
