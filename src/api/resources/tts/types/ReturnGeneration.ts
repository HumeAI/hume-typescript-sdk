/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Hume from "../../../index";

export interface ReturnGeneration {
    /** The generated audio output in the requested format, encoded as a base64 string. */
    audio: string;
    /** Duration of the generated audio in seconds. */
    duration: number;
    encoding: Hume.tts.AudioEncoding;
    /** Size of the generated audio in bytes. */
    fileSize: number;
    /** A unique ID associated with this TTS generation that can be used as context for generating consistent speech style and prosody across multiple requests. */
    generationId: string;
    /** A list of speech segments, each containing a portion of the original text optimized for  natural speech delivery. These segments represent the input text divided into more natural-sounding units. */
    snippets: Hume.tts.Snippet[][];
}
