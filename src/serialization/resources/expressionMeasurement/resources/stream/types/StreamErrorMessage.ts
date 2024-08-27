/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as Hume from "../../../../../../api/index";
import * as core from "../../../../../../core";
import { StreamErrorMessageJobDetails } from "./StreamErrorMessageJobDetails";

export const StreamErrorMessage: core.serialization.ObjectSchema<
    serializers.expressionMeasurement.StreamErrorMessage.Raw,
    Hume.expressionMeasurement.StreamErrorMessage
> = core.serialization.object({
    error: core.serialization.string().optional(),
    code: core.serialization.string().optional(),
    payloadId: core.serialization.property("payload_id", core.serialization.string().optional()),
    jobDetails: core.serialization.property("job_details", StreamErrorMessageJobDetails.optional()),
});

export declare namespace StreamErrorMessage {
    interface Raw {
        error?: string | null;
        code?: string | null;
        payload_id?: string | null;
        job_details?: StreamErrorMessageJobDetails.Raw | null;
    }
}