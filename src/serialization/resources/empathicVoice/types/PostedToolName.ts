/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as Hume from "../../../../api";
import * as core from "../../../../core";

export const PostedToolName: core.serialization.ObjectSchema<
    serializers.empathicVoice.PostedToolName.Raw,
    Hume.empathicVoice.PostedToolName
> = core.serialization.object({
    name: core.serialization.string(),
});

export declare namespace PostedToolName {
    interface Raw {
        name: string;
    }
}
