/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Hume from "../../../index";

/**
 * A description of chat status with a paginated list of chat events returned from the server
 */
export interface ReturnChatPagedEvents {
    /** Identifier for a chat. Formatted as a UUID. */
    id: string;
    /** Identifier for the chat group. Any chat resumed from this chat will have the same chat_group_id. Formatted as a UUID. */
    chatGroupId: string;
    /** Optional tag applied to this chat used to group chats by user, application, etc. */
    tag?: string;
    /** The status of the chat. Values from the ChatStatus enum. */
    status: string;
    /** The timestamp when the chat started, formatted as a Unix epoch milliseconds. */
    startTimestamp: number;
    /** The timestamp when the chat ended, formatted as a Unix epoch milliseconds. */
    endTimestamp?: number;
    /** The direction of the pagination (ASC or DESC). */
    paginationDirection: string;
    /** List of chat events with the specified page number and page size. */
    eventsPage: Hume.empathicVoice.ReturnChatEvent[];
    /** Stringified JSON with additional metadata about the chat. */
    metadata?: string;
    /** The page number of the returned results. */
    pageNumber: number;
    /** The number of results returned per page. */
    pageSize: number;
    /** The total number of pages in the collection */
    totalPages: number;
    config?: Hume.empathicVoice.ReturnConfigSpec;
}
