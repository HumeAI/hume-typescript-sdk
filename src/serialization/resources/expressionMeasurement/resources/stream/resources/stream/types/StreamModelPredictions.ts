/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../../../index";
import * as Hume from "../../../../../../../../api/index";
import * as core from "../../../../../../../../core";
import { StreamModelPredictionsJobDetails } from "./StreamModelPredictionsJobDetails";
import { StreamModelPredictionsBurst } from "./StreamModelPredictionsBurst";
import { StreamModelPredictionsFace } from "./StreamModelPredictionsFace";
import { StreamModelPredictionsFacemesh } from "./StreamModelPredictionsFacemesh";
import { StreamModelPredictionsLanguage } from "./StreamModelPredictionsLanguage";
import { StreamModelPredictionsProsody } from "./StreamModelPredictionsProsody";

export const StreamModelPredictions: core.serialization.ObjectSchema<
    serializers.expressionMeasurement.stream.StreamModelPredictions.Raw,
    Hume.expressionMeasurement.stream.StreamModelPredictions
> = core.serialization.object({
    payloadId: core.serialization.property("payload_id", core.serialization.string().optional()),
    jobDetails: core.serialization.property("job_details", StreamModelPredictionsJobDetails.optional()),
    burst: StreamModelPredictionsBurst.optional(),
    face: StreamModelPredictionsFace.optional(),
    facemesh: StreamModelPredictionsFacemesh.optional(),
    language: StreamModelPredictionsLanguage.optional(),
    prosody: StreamModelPredictionsProsody.optional(),
});

export declare namespace StreamModelPredictions {
    export interface Raw {
        payload_id?: string | null;
        job_details?: StreamModelPredictionsJobDetails.Raw | null;
        burst?: StreamModelPredictionsBurst.Raw | null;
        face?: StreamModelPredictionsFace.Raw | null;
        facemesh?: StreamModelPredictionsFacemesh.Raw | null;
        language?: StreamModelPredictionsLanguage.Raw | null;
        prosody?: StreamModelPredictionsProsody.Raw | null;
    }
}
