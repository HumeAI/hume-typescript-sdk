/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Hume from "../../../index";

export interface PostedUtterance {
    /**
     * Natural language instructions describing how the synthesized speech should sound, including  but not limited to tone, intonation, pacing, and accent (e.g., 'a soft, gentle voice with a strong British  accent').
     * - If a Voice is specified in the request, this description serves as acting instructions. For  tips on how to effectively guide speech delivery, see our guide on [Acting instructions](/docs/text-to-speech-tts/acting-instructions).
     *  - If no Voice is specified, a new voice is generated based on this description. See our [prompting guide](/docs/text-to-speech-tts/prompting)  for tips on designing a voice.
     */
    description?: string;
    /** Speed multiplier for the synthesized speech. */
    speed?: number;
    /** The input text to be synthesized into speech. */
    text: string;
    /** Duration of trailing silence (in seconds) to add to this utterance */
    trailingSilence?: number;
    /**
     * The `name` or `id` associated with a **Voice** from the **Voice Library** to be used as the  speaker for this and all subsequent `utterances`, until the `voice` field is updated again.
     *
     *  See our  [voices guide](/docs/text-to-speech-tts/voices) for more details on generating and specifying **Voices**.
     */
    voice?: Hume.tts.PostedUtteranceVoice;
}
