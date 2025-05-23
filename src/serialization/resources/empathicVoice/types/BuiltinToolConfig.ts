/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";
import { BuiltInTool } from "./BuiltInTool";

export const BuiltinToolConfig: core.serialization.ObjectSchema<
    serializers.empathicVoice.BuiltinToolConfig.Raw,
    Hume.empathicVoice.BuiltinToolConfig
> = core.serialization.object({
    fallbackContent: core.serialization.property("fallback_content", core.serialization.string().optional()),
    name: BuiltInTool,
});

export declare namespace BuiltinToolConfig {
    export interface Raw {
        fallback_content?: string | null;
        name: BuiltInTool.Raw;
    }
}
