/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Hume from "../../../index";

/**
 * A paginated list of chat events that occurred across chats in this chat_group from the server
 */
export interface ReturnChatGroupPagedEvents {
    /** Identifier for the chat group. Any chat resumed from this chat will have the same chat_group_id. Formatted as a UUID. */
    id: string;
    /** The page number of the returned results. */
    pageNumber: number;
    /** The number of results returned per page. */
    pageSize: number;
    /** The direction of the pagination (ASC or DESC). */
    paginationDirection: string;
    /** List of chat_events returned for the specified page number and page size. */
    eventsPage: Hume.empathicVoice.ReturnChatEvent[];
}
