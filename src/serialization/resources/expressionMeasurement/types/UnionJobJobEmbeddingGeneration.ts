/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from '../../../index';
import * as Hume from '../../../../api/index';
import * as core from '../../../../core';
import { JobEmbeddingGeneration } from './JobEmbeddingGeneration';

export const UnionJobJobEmbeddingGeneration: core.serialization.ObjectSchema<
  serializers.expressionMeasurement.UnionJobJobEmbeddingGeneration.Raw,
  Hume.expressionMeasurement.UnionJobJobEmbeddingGeneration
> = core.serialization.object({}).extend(JobEmbeddingGeneration);

export declare namespace UnionJobJobEmbeddingGeneration {
  interface Raw extends JobEmbeddingGeneration.Raw {}
}
