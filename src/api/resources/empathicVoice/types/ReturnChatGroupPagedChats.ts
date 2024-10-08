/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Hume from "../../../index";

/**
 * A description of chat_group and its status with a paginated list of each chat in the chat_group
 */
export interface ReturnChatGroupPagedChats {
    /** Identifier for the Chat Group. Any Chat resumed from this Chat Group will have the same `chat_group_id`. Formatted as a UUID. */
    id: string;
    /** Time at which the first Chat in this Chat Group was created. Measured in seconds since the Unix epoch. */
    firstStartTimestamp: number;
    /** Time at which the most recent Chat in this Chat Group was created. Measured in seconds since the Unix epoch. */
    mostRecentStartTimestamp: number;
    /** The total number of Chats associated with this Chat Group. */
    numChats: number;
    /**
     * The page number of the returned list.
     *
     * This value corresponds to the `page_number` parameter specified in the request. Pagination uses zero-based indexing.
     */
    pageNumber: number;
    /**
     * The maximum number of items returned per page.
     *
     * This value corresponds to the `page_size` parameter specified in the request.
     */
    pageSize: number;
    /** The total number of pages in the collection. */
    totalPages: number;
    /**
     * Indicates the order in which the paginated results are presented, based on their creation date.
     *
     * It shows `ASC` for ascending order (chronological, with the oldest records first) or `DESC` for descending order (reverse-chronological, with the newest records first). This value corresponds to the `ascending_order` query parameter used in the request.
     */
    paginationDirection: Hume.empathicVoice.ReturnChatGroupPagedChatsPaginationDirection;
    /** List of Chats for the specified `page_number` and `page_size`. */
    chatsPage: Hume.empathicVoice.ReturnChat[];
    /** Denotes whether there is an active Chat associated with this Chat Group. */
    active?: boolean;
}
