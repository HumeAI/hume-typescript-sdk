/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";
import { VoiceId } from "./VoiceId";
import { VoiceName } from "./VoiceName";

export const VoiceRef: core.serialization.Schema<serializers.empathicVoice.VoiceRef.Raw, Hume.empathicVoice.VoiceRef> =
    core.serialization.undiscriminatedUnion([VoiceId, VoiceName]);

export declare namespace VoiceRef {
    export type Raw = VoiceId.Raw | VoiceName.Raw;
}
