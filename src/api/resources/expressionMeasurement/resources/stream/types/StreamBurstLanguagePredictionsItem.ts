/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Hume from '../../../../../index';

export interface StreamBurstLanguagePredictionsItem {
  /** A segment of text (like a word or a sentence). */
  text?: string;
  position?: Hume.expressionMeasurement.TextPosition;
  emotions?: Hume.expressionMeasurement.EmotionEmbedding;
  sentiment?: Hume.expressionMeasurement.Sentiment;
  toxicity?: Hume.expressionMeasurement.Toxicity;
}
