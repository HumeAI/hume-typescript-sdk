/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * The specified attributes of a Custom Voice. If a parameter's value is `0` (default), it will not be included in the response.
 */
export interface ReturnCustomVoiceParameters {
    /**
     * The vocalization of gender, ranging between masculine and feminine.
     *
     * The default value is `0`, with a minimum of `-100` (more masculine) and a maximum of `100` (more feminine). A value of `0` leaves this parameter unchanged from the base voice.
     */
    gender?: number;
    /**
     * The texture of the voice, ranging between bright and husky.
     *
     * The default value is `0`, with a minimum of `-100` (brighter) and a maximum of `100` (huskier). A value of `0` leaves this parameter unchanged from the base voice.
     */
    huskiness?: number;
    /**
     * The openness of the voice, ranging between resonant and nasal.
     *
     * The default value is `0`, with a minimum of `-100` (more resonant) and a maximum of `100` (more nasal). A value of `0` leaves this parameter unchanged from the base voice.
     */
    nasality?: number;
    /**
     * The frequency of the voice, ranging between low and high.
     *
     * The default value is `0`, with a minimum of `-100` (lower) and a maximum of `100` (higher). A value of `0` leaves this parameter unchanged from the base voice.
     */
    pitch?: number;
}
