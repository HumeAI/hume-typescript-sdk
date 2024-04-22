/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Hume from "../../..";

/**
 * Transcription metadata for your media file.
 */
export interface TranscriptionMetadata {
    /** Value between `0.0` and `1.0` indicating our transcription model's relative confidence in the transcription of your media file. */
    confidence: number;
    detectedLanguage?: Hume.expressionMeasurement.Bcp47Tag;
}
