/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Hume from "../../../index";

/**
 * A description of chat_group and its status with a paginated list of each chat in the chat_group
 */
export interface ReturnChatGroupPagedChats {
    /** Identifier for the chat group. Any chat resumed from this chat will have the same chat_group_id. Formatted as a UUID. */
    id: string;
    /** The timestamp when the first chat in this chat group started, formatted as a Unix epoch milliseconds. */
    firstStartTimestamp: number;
    /** The timestamp when the most recent chat in this chat group started, formatted as a Unix epoch milliseconds. */
    mostRecentStartTimestamp: number;
    /** The total number of chats in this chat group. */
    numChats: number;
    /** The page number of the returned results. */
    pageNumber: number;
    /** The number of results returned per page. */
    pageSize: number;
    /** List of chats and their metadata returned for the specified page number and page size. */
    chatsPage: Hume.empathicVoice.ReturnChat[];
    active?: boolean;
}
