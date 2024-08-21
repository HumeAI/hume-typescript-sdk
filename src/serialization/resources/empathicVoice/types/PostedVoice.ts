/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";
import { PostedVoiceName } from "./PostedVoiceName";

export const PostedVoice: core.serialization.ObjectSchema<
    serializers.empathicVoice.PostedVoice.Raw,
    Hume.empathicVoice.PostedVoice
> = core.serialization.object({
    provider: core.serialization.stringLiteral("HUME_AI"),
    name: PostedVoiceName.optional(),
});

export declare namespace PostedVoice {
    interface Raw {
        provider: "HUME_AI";
        name?: PostedVoiceName.Raw | null;
    }
}
