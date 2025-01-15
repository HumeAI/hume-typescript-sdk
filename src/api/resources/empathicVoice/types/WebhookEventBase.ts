/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * Represents the fields common to all webhook events.
 */
export interface WebhookEventBase {
    /** Unique ID of the **Chat Group** associated with the **Chat** session. */
    chatGroupId: string;
    /** Unique ID of the **Chat** session. */
    chatId: string;
    /** Unique ID of the EVI **Config** used for the session. */
    configId?: string;
}