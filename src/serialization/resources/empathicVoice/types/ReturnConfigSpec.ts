/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";

export const ReturnConfigSpec: core.serialization.ObjectSchema<
    serializers.empathicVoice.ReturnConfigSpec.Raw,
    Hume.empathicVoice.ReturnConfigSpec
> = core.serialization.object({
    id: core.serialization.string(),
    version: core.serialization.number().optional(),
});

export declare namespace ReturnConfigSpec {
    export interface Raw {
        id: string;
        version?: number | null;
    }
}
