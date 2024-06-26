/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";

export const JsonObject: core.serialization.ObjectSchema<
    serializers.customModels.JsonObject.Raw,
    Hume.customModels.JsonObject
> = core.serialization.object({
    empty: core.serialization.boolean().optional(),
});

export declare namespace JsonObject {
    interface Raw {
        empty?: boolean | null;
    }
}
