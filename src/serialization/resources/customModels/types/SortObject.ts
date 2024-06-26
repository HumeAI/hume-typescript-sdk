/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";

export const SortObject: core.serialization.ObjectSchema<
    serializers.customModels.SortObject.Raw,
    Hume.customModels.SortObject
> = core.serialization.object({
    empty: core.serialization.boolean().optional(),
    sorted: core.serialization.boolean().optional(),
    unsorted: core.serialization.boolean().optional(),
});

export declare namespace SortObject {
    interface Raw {
        empty?: boolean | null;
        sorted?: boolean | null;
        unsorted?: boolean | null;
    }
}
