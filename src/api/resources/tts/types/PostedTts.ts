/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Hume from "../../../index";

export interface PostedTts {
    /** Utterances to use as context for generating consistent speech style and prosody across multiple requests. These will not be converted to speech output. */
    context?: Hume.tts.PostedContext;
    /** Specifies the output audio file format. */
    format?: Hume.tts.Format;
    /** Number of generations of the audio to produce. */
    numGenerations?: number;
    /**
     * Controls how audio output is segmented in the response.
     *
     * - When **enabled** (`true`),  input utterances are automatically split into natural-sounding speech segments.
     *
     * - When **disabled**  (`false`), the response maintains a strict one-to-one mapping between input utterances and output snippets.
     *
     * This setting affects how the `snippets` array is structured in the response, which may be important  for applications that need to track the relationship between input text and generated audio segments. When  setting to `false`, avoid including utterances with long `text`, as this can result in distorted output.
     */
    splitUtterances?: boolean;
    /** Utterances to be converted to speech output. */
    utterances: Hume.tts.PostedUtterance[];
}
