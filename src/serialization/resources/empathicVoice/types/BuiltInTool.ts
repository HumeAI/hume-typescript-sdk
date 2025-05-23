/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";

export const BuiltInTool: core.serialization.Schema<
    serializers.empathicVoice.BuiltInTool.Raw,
    Hume.empathicVoice.BuiltInTool
> = core.serialization.enum_(["web_search", "hang_up"]);

export declare namespace BuiltInTool {
    export type Raw = "web_search" | "hang_up";
}
