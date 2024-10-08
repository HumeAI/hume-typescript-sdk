/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * A specific event message configuration to be returned from the server
 */
export interface ReturnEventMessageSpec {
    /**
     * Boolean indicating if this event message is enabled.
     *
     * If set to `true`, a message will be sent when the circumstances for the specific event are met.
     */
    enabled: boolean;
    /** Text to use as the event message when the corresponding event occurs. If no text is specified, EVI will generate an appropriate message based on its current context and the system prompt. */
    text?: string;
}
