/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";

export const ValidationErrorLocItem: core.serialization.Schema<
    serializers.tts.ValidationErrorLocItem.Raw,
    Hume.tts.ValidationErrorLocItem
> = core.serialization.undiscriminatedUnion([core.serialization.string(), core.serialization.number()]);

export declare namespace ValidationErrorLocItem {
    export type Raw = string | number;
}
