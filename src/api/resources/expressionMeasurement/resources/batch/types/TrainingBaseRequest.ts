/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Hume from "../../../../../index";

export interface TrainingBaseRequest {
    customModel: Hume.expressionMeasurement.batch.CustomModelRequest;
    dataset: Hume.expressionMeasurement.batch.Dataset;
    targetFeature?: string;
    task?: Hume.expressionMeasurement.batch.Task;
    evaluation?: Hume.expressionMeasurement.batch.EvaluationArgs;
    alternatives?: Hume.expressionMeasurement.batch.Alternative[];
    callbackUrl?: string;
    notify?: boolean;
}
