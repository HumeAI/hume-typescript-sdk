/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";

export const VoiceNameEnum: core.serialization.Schema<
    serializers.empathicVoice.VoiceNameEnum.Raw,
    Hume.empathicVoice.VoiceNameEnum
> = core.serialization.enum_(["ITO", "KORA", "DACHER"]);

export declare namespace VoiceNameEnum {
    type Raw = "ITO" | "KORA" | "DACHER";
}