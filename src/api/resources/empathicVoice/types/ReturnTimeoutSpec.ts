/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * A specific timeout configuration to be returned from the server
 */
export interface ReturnTimeoutSpec {
    /** Boolean indicating if this event message is enabled. */
    enabled: boolean;
    /** Duration in seconds for the timeout. */
    durationSecs?: number;
}