/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * Generate predictions based on time.
 *
 * Setting the `window` field allows for a 'sliding window' approach, where a fixed-size window moves across the audio or video file in defined steps. This enables continuous analysis of prosody within subsets of the file, providing dynamic and localized insights into emotional expression.
 */
export interface Window {
    /** The length of the sliding window. */
    length?: number;
    /** The step size of the sliding window. */
    step?: number;
}