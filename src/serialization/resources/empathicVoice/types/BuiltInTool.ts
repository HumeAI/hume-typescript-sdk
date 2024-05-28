/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";

export const BuiltInTool: core.serialization.Schema<
    serializers.empathicVoice.BuiltInTool.Raw,
    Hume.empathicVoice.BuiltInTool
> = core.serialization.stringLiteral("web_search");

export declare namespace BuiltInTool {
    type Raw = "web_search";
}