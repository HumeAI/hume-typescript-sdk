/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";
import { PostedUtteranceVoiceWithId } from "./PostedUtteranceVoiceWithId";
import { PostedUtteranceVoiceWithName } from "./PostedUtteranceVoiceWithName";

export const PostedUtteranceVoice: core.serialization.Schema<
    serializers.tts.PostedUtteranceVoice.Raw,
    Hume.tts.PostedUtteranceVoice
> = core.serialization.undiscriminatedUnion([PostedUtteranceVoiceWithId, PostedUtteranceVoiceWithName]);

export declare namespace PostedUtteranceVoice {
    type Raw = PostedUtteranceVoiceWithId.Raw | PostedUtteranceVoiceWithName.Raw;
}
