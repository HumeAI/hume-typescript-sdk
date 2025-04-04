/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Hume from "../../../index";

/**
 * A paginated list Octave voices available for text-to-speech
 */
export interface ReturnPagedVoices {
    pageNumber?: number;
    pageSize?: number;
    totalPages?: number;
    voicesPage?: Hume.tts.ReturnVoice[];
}
