/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * A description of a single event in a chat returned from the server
 */
export interface ReturnChatEvent {
    /** Identifier for a chat event. Formatted as a UUID. */
    id: string;
    /** Identifier for the chat this event occurred in. Formatted as a UUID. */
    chatId: string;
    /** The timestamp when the chat event occurred, formatted as a Unix epoch milliseconds. */
    timestamp: number;
    /** The role of the user who generated the chat event. Values from the Role enum. */
    role: string;
    /** The type of chat event. Values from the ChatEventType enum. */
    type: string;
    /** The text of the chat message, either transcribed from speaker audio or generated by the agent. */
    messageText?: string;
    /** Stringified JSON with data about emotional content/prosody of the event. */
    emotionFeatures?: string;
    /** Stringified JSON with additional metadata about the chat event. */
    metadata?: string;
}
