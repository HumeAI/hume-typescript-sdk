/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * When provided, the output is an assistant end message.
 */
export interface AssistantEnd {
    /** Used to manage conversational state, correlate frontend and backend data, and persist conversations across EVI sessions. */
    customSessionId?: string;
    /**
     * The type of message sent through the socket; for an Assistant End message, this must be `assistant_end`.
     *
     * This message indicates the conclusion of the assistant’s response, signaling that the assistant has finished speaking for the current conversational turn.
     */
    type: "assistant_end";
}
