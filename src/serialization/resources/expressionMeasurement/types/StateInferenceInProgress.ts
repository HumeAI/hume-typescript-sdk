/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from '../../../index';
import * as Hume from '../../../../api/index';
import * as core from '../../../../core';
import { InProgress } from './InProgress';

export const StateInferenceInProgress: core.serialization.ObjectSchema<
  serializers.expressionMeasurement.StateInferenceInProgress.Raw,
  Hume.expressionMeasurement.StateInferenceInProgress
> = core.serialization.object({}).extend(InProgress);

export declare namespace StateInferenceInProgress {
  interface Raw extends InProgress.Raw {}
}
