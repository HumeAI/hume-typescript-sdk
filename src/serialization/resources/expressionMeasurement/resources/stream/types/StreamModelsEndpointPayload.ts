/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as Hume from "../../../../../../api/index";
import * as core from "../../../../../../core";
import { Config } from "./Config";

export const StreamModelsEndpointPayload: core.serialization.ObjectSchema<
    serializers.expressionMeasurement.stream.StreamModelsEndpointPayload.Raw,
    Hume.expressionMeasurement.stream.StreamModelsEndpointPayload
> = core.serialization.object({
    data: core.serialization.string().optional(),
    models: Config.optional(),
    streamWindowMs: core.serialization.property("stream_window_ms", core.serialization.number().optional()),
    resetStream: core.serialization.property("reset_stream", core.serialization.boolean().optional()),
    rawText: core.serialization.property("raw_text", core.serialization.boolean().optional()),
    jobDetails: core.serialization.property("job_details", core.serialization.boolean().optional()),
    payloadId: core.serialization.property("payload_id", core.serialization.string().optional()),
    face: core.serialization.unknown().optional(),
    language: core.serialization.unknown().optional(),
});

export declare namespace StreamModelsEndpointPayload {
    interface Raw {
        data?: string | null;
        models?: Config.Raw | null;
        stream_window_ms?: number | null;
        reset_stream?: boolean | null;
        raw_text?: boolean | null;
        job_details?: boolean | null;
        payload_id?: string | null;
        face?: unknown | null;
        language?: unknown | null;
    }
}
