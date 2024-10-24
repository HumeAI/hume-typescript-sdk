/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";

export const LanguageModelTag: core.serialization.Schema<
    serializers.empathicVoice.LanguageModelTag.Raw,
    Hume.empathicVoice.LanguageModelTag
> = core.serialization.enum_(["fast", "personable", "recommended"]);

export declare namespace LanguageModelTag {
    type Raw = "fast" | "personable" | "recommended";
}
