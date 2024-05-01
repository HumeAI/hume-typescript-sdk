/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * When provided, the input is audio.
 */
export interface AudioInput {
    customSessionId?: string;
    /** Base64 encoded audio input. */
    data: string;
    type: "audio_input";
}