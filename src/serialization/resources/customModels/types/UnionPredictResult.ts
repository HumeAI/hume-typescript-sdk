/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as Hume from "../../../../api";
import * as core from "../../../../core";
import { InferenceSourcePredictResult } from "./InferenceSourcePredictResult";
import { TlInferenceSourcePredictResult } from "./TlInferenceSourcePredictResult";

export const UnionPredictResult: core.serialization.Schema<
    serializers.customModels.UnionPredictResult.Raw,
    Hume.customModels.UnionPredictResult
> = core.serialization.undiscriminatedUnion([InferenceSourcePredictResult, TlInferenceSourcePredictResult]);

export declare namespace UnionPredictResult {
    type Raw = InferenceSourcePredictResult.Raw | TlInferenceSourcePredictResult.Raw;
}