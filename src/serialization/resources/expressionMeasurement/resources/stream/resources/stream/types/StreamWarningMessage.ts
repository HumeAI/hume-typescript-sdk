/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../../../index";
import * as Hume from "../../../../../../../../api/index";
import * as core from "../../../../../../../../core";
import { StreamWarningMessageJobDetails } from "./StreamWarningMessageJobDetails";

export const StreamWarningMessage: core.serialization.ObjectSchema<
    serializers.expressionMeasurement.stream.StreamWarningMessage.Raw,
    Hume.expressionMeasurement.stream.StreamWarningMessage
> = core.serialization.object({
    warning: core.serialization.string().optional(),
    code: core.serialization.string().optional(),
    payloadId: core.serialization.property("payload_id", core.serialization.string().optional()),
    jobDetails: core.serialization.property("job_details", StreamWarningMessageJobDetails.optional()),
});

export declare namespace StreamWarningMessage {
    export interface Raw {
        warning?: string | null;
        code?: string | null;
        payload_id?: string | null;
        job_details?: StreamWarningMessageJobDetails.Raw | null;
    }
}
