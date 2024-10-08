/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Hume from "../../../../../index";

/**
 * Sentiment predictions returned as a distribution. This model predicts the probability that a given text could be interpreted as having each sentiment level from 1 (negative) to 9 (positive).
 *
 * Compared to returning one estimate of sentiment, this enables a more nuanced analysis of a text's meaning. For example, a text with very neutral sentiment would have an average rating of 5. But also a text that could be interpreted as having very positive sentiment or very negative sentiment would also have an average rating of 5. The average sentiment is less informative than the distribution over sentiment, so this API returns a value for each sentiment level.
 */
export type Sentiment = Hume.expressionMeasurement.stream.SentimentItem[];
