/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";

export const ErrorLevel: core.serialization.Schema<
    serializers.empathicVoice.ErrorLevel.Raw,
    Hume.empathicVoice.ErrorLevel
> = core.serialization.stringLiteral("warn");

export declare namespace ErrorLevel {
    export type Raw = "warn";
}
