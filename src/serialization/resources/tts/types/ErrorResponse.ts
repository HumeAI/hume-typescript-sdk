/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";

export const ErrorResponse: core.serialization.ObjectSchema<serializers.tts.ErrorResponse.Raw, Hume.tts.ErrorResponse> =
    core.serialization.object({
        error: core.serialization.string().optional(),
        message: core.serialization.string().optional(),
        code: core.serialization.string().optional(),
    });

export declare namespace ErrorResponse {
    export interface Raw {
        error?: string | null;
        message?: string | null;
        code?: string | null;
    }
}
