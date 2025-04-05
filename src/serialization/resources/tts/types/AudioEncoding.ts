/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";
import { AudioFormatType } from "./AudioFormatType";

export const AudioEncoding: core.serialization.ObjectSchema<serializers.tts.AudioEncoding.Raw, Hume.tts.AudioEncoding> =
    core.serialization.object({
        format: AudioFormatType,
        sampleRate: core.serialization.property("sample_rate", core.serialization.number()),
    });

export declare namespace AudioEncoding {
    export interface Raw {
        format: AudioFormatType.Raw;
        sample_rate: number;
    }
}
