/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";
import { ValidationErrorLocItem } from "./ValidationErrorLocItem";

export const ValidationError: core.serialization.ObjectSchema<
    serializers.tts.ValidationError.Raw,
    Hume.tts.ValidationError
> = core.serialization.object({
    loc: core.serialization.list(ValidationErrorLocItem),
    msg: core.serialization.string(),
    type: core.serialization.string(),
});

export declare namespace ValidationError {
    export interface Raw {
        loc: ValidationErrorLocItem.Raw[];
        msg: string;
        type: string;
    }
}
