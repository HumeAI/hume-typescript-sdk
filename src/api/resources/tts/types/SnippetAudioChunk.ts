/**
 * This file was auto-generated by Fern from our API Definition.
 */

export interface SnippetAudioChunk {
    /** The generated audio output chunk in the requested format. */
    audio: string;
    /** The index of the audio chunk in the snippet. */
    chunkIndex: number;
    /** The generation ID of the parent snippet that this chunk corresponds to. */
    generationId: string;
    /** Whether or not this is the last chunk streamed back from the decoder for one input snippet. */
    isLastChunk: boolean;
    /** The ID of the parent snippet that this chunk corresponds to. */
    snippetId: string;
    /** The text of the parent snippet that this chunk corresponds to. */
    text: string;
    /** The transcribed text of the generated audio of the parent snippet that this chunk corresponds to. It is only present if `instant_mode` is set to `false`. */
    transcribedText?: string;
    /** The index of the utterance in the request that the parent snippet of this chunk corresponds to. */
    utteranceIndex?: number;
}
