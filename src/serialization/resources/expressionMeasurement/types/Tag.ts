/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as Hume from "../../../../api";
import * as core from "../../../../core";

export const Tag: core.serialization.ObjectSchema<
    serializers.expressionMeasurement.Tag.Raw,
    Hume.expressionMeasurement.Tag
> = core.serialization.object({
    key: core.serialization.string(),
    value: core.serialization.string(),
});

export declare namespace Tag {
    interface Raw {
        key: string;
        value: string;
    }
}
