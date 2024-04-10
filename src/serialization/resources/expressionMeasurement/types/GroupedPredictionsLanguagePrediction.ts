/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as Hume from "../../../../api";
import * as core from "../../../../core";
import { LanguagePrediction } from "./LanguagePrediction";

export const GroupedPredictionsLanguagePrediction: core.serialization.ObjectSchema<
    serializers.expressionMeasurement.GroupedPredictionsLanguagePrediction.Raw,
    Hume.expressionMeasurement.GroupedPredictionsLanguagePrediction
> = core.serialization.object({
    id: core.serialization.string(),
    predictions: core.serialization.list(LanguagePrediction),
});

export declare namespace GroupedPredictionsLanguagePrediction {
    interface Raw {
        id: string;
        predictions: LanguagePrediction.Raw[];
    }
}
