/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Hume from "../../../index";

export interface PostedUtterance {
    /**
     * Natural language instructions describing how the synthesized speech should sound, including but not limited to tone, intonation, pacing, and accent.
     *
     * **This field behaves differently depending on whether a voice is specified**:
     * - **Voice specified**: the description will serve as acting directions for delivery. Keep directions concise—100 characters or fewer—for best results. See our guide on [acting instructions](/docs/text-to-speech-tts/acting-instructions).
     * - **Voice not specified**: the description will serve as a voice prompt for generating a voice. See our [prompting guide](/docs/text-to-speech-tts/prompting) for design tips.
     */
    description?: string;
    /** Speed multiplier for the synthesized speech. */
    speed?: number;
    /** The input text to be synthesized into speech. */
    text: string;
    /** Duration of trailing silence (in seconds) to add to this utterance */
    trailingSilence?: number;
    /**
     * The `name` or `id` associated with a **Voice** from the **Voice Library** to be used as the speaker for this and all subsequent `utterances`, until the `voice` field is updated again.
     *
     *  See our [voices guide](/docs/text-to-speech-tts/voices) for more details on generating and specifying **Voices**.
     */
    voice?: Hume.tts.PostedUtteranceVoice;
}
