/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";

export const PostedVoiceProvider: core.serialization.Schema<
    serializers.empathicVoice.PostedVoiceProvider.Raw,
    Hume.empathicVoice.PostedVoiceProvider
> = core.serialization.enum_(["HUME_AI", "CUSTOM_VOICE"]);

export declare namespace PostedVoiceProvider {
    export type Raw = "HUME_AI" | "CUSTOM_VOICE";
}
