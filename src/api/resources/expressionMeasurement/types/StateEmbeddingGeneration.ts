/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Hume from '../../../index';

export type StateEmbeddingGeneration =
  | Hume.expressionMeasurement.StateEmbeddingGeneration.Queued
  | Hume.expressionMeasurement.StateEmbeddingGeneration.InProgress
  | Hume.expressionMeasurement.StateEmbeddingGeneration.Completed
  | Hume.expressionMeasurement.StateEmbeddingGeneration.Failed;

export declare namespace StateEmbeddingGeneration {
  interface Queued
    extends Hume.expressionMeasurement.StateEmbeddingGenerationQueued {
    status: 'QUEUED';
  }

  interface InProgress
    extends Hume.expressionMeasurement.StateEmbeddingGenerationInProgress {
    status: 'IN_PROGRESS';
  }

  interface Completed
    extends Hume.expressionMeasurement
      .StateEmbeddingGenerationCompletedEmbeddingGeneration {
    status: 'COMPLETED';
  }

  interface Failed
    extends Hume.expressionMeasurement.StateEmbeddingGenerationFailed {
    status: 'FAILED';
  }
}
