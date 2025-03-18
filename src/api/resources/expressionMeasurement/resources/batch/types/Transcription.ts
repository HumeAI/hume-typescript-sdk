/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Hume from "../../../../../index";

/**
 * Transcription-related configuration options.
 *
 * To disable transcription, explicitly set this field to `null`.
 */
export interface Transcription {
    /**
     * By default, we use an automated language detection method for our Speech Prosody, Language, and NER models. However, if you know what language is being spoken in your media samples, you can specify it via its BCP-47 tag and potentially obtain more accurate results.
     *
     * You can specify any of the following languages:
     * - Chinese: `zh`
     * - Danish: `da`
     * - Dutch: `nl`
     * - English: `en`
     * - English (Australia): `en-AU`
     * - English (India): `en-IN`
     * - English (New Zealand): `en-NZ`
     * - English (United Kingdom): `en-GB`
     * - French: `fr`
     * - French (Canada): `fr-CA`
     * - German: `de`
     * - Hindi: `hi`
     * - Hindi (Roman Script): `hi-Latn`
     * - Indonesian: `id`
     * - Italian: `it`
     * - Japanese: `ja`
     * - Korean: `ko`
     * - Norwegian: `no`
     * - Polish: `pl`
     * - Portuguese: `pt`
     * - Portuguese (Brazil): `pt-BR`
     * - Portuguese (Portugal): `pt-PT`
     * - Russian: `ru`
     * - Spanish: `es`
     * - Spanish (Latin America): `es-419`
     * - Swedish: `sv`
     * - Tamil: `ta`
     * - Turkish: `tr`
     * - Ukrainian: `uk`
     */
    language?: Hume.expressionMeasurement.batch.Bcp47Tag;
    /** Whether to return identifiers for speakers over time. If `true`, unique identifiers will be assigned to spoken words to differentiate different speakers. If `false`, all speakers will be tagged with an `unknown` ID. */
    identifySpeakers?: boolean;
    /** Transcript confidence threshold. Transcripts generated with a confidence less than this threshold will be considered invalid and not used as an input for model inference. */
    confidenceThreshold?: number;
}
