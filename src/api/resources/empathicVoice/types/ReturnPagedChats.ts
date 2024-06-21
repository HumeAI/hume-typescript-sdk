/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Hume from "../../../index";

/**
 * A paginated list of chats returned from the server
 */
export interface ReturnPagedChats {
    /** The page number of the returned results. */
    pageNumber: number;
    /** The number of results returned per page. */
    pageSize: number;
    /** The total number of pages in the collection */
    totalPages: number;
    /** The direction of the pagination (ASC or DESC). */
    paginationDirection: string;
    /** List of chats and their metadata returned for the specified page number and page size. */
    chatsPage: Hume.empathicVoice.ReturnChat[];
}
