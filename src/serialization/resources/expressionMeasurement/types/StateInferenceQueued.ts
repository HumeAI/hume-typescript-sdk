/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from '../../../index';
import * as Hume from '../../../../api/index';
import * as core from '../../../../core';
import { Queued } from './Queued';

export const StateInferenceQueued: core.serialization.ObjectSchema<
  serializers.expressionMeasurement.StateInferenceQueued.Raw,
  Hume.expressionMeasurement.StateInferenceQueued
> = core.serialization.object({}).extend(Queued);

export declare namespace StateInferenceQueued {
  interface Raw extends Queued.Raw {}
}
