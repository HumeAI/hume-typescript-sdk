/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";

export const ReturnVoice: core.serialization.ObjectSchema<
    serializers.empathicVoice.ReturnVoice.Raw,
    Hume.empathicVoice.ReturnVoice
> = core.serialization.object({
    provider: core.serialization.string(),
    name: core.serialization.string(),
});

export declare namespace ReturnVoice {
    interface Raw {
        provider: string;
        name: string;
    }
}
