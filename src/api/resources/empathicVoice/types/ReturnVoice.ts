/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Hume from "../../../index";

/**
 * A specific voice specification
 */
export interface ReturnVoice {
    /** The provider of the voice to use. Currently, only `HUME_AI` is supported as the voice provider. */
    provider: "HUME_AI";
    /**
     * The name of the specified voice.
     *
     * This will either be the name of a previously created Custom Voice or one of our 7 base voices: `ITO`, `KORA`, `DACHER`, `AURA`, `FINN`, `WHIMSY`, or `STELLA`.
     */
    name?: string;
    customVoice: Hume.empathicVoice.ReturnCustomVoice;
}
