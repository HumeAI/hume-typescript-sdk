/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";
import { ReturnGeneration } from "./ReturnGeneration";

export const ReturnTts: core.serialization.ObjectSchema<serializers.tts.ReturnTts.Raw, Hume.tts.ReturnTts> =
    core.serialization.object({
        generations: core.serialization.list(ReturnGeneration),
        requestId: core.serialization.property("request_id", core.serialization.string().optional()),
    });

export declare namespace ReturnTts {
    export interface Raw {
        generations: ReturnGeneration.Raw[];
        request_id?: string | null;
    }
}
