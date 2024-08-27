/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as Hume from "../../../../../../api/index";
import * as core from "../../../../../../core";
import { FacemeshPrediction } from "./FacemeshPrediction";

export const GroupedPredictionsFacemeshPrediction: core.serialization.ObjectSchema<
    serializers.expressionMeasurement.GroupedPredictionsFacemeshPrediction.Raw,
    Hume.expressionMeasurement.GroupedPredictionsFacemeshPrediction
> = core.serialization.object({
    id: core.serialization.string(),
    predictions: core.serialization.list(FacemeshPrediction),
});

export declare namespace GroupedPredictionsFacemeshPrediction {
    interface Raw {
        id: string;
        predictions: FacemeshPrediction.Raw[];
    }
}