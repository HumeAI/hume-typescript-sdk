/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Hume from "../../../../../../index";

/**
 * @example
 *     {
 *         provider: Hume.tts.VoicesListRequestProvider.CustomVoice
 *     }
 */
export interface VoicesListRequest {
    /**
     * Specifies whether to return custom voices created in your account or shared voices provided by Hume
     */
    provider: Hume.tts.VoicesListRequestProvider;
    /**
     * Specifies the page number to retrieve, enabling pagination.
     *
     * This parameter uses zero-based indexing. For example, setting `page_number` to 0 retrieves the first page of results (items 0-9 if `page_size` is 10), setting `page_number` to 1 retrieves the second page (items 10-19), and so on. Defaults to 0, which retrieves the first page.
     */
    pageNumber?: number;
    /**
     * Specifies the maximum number of results to include per page, enabling pagination. The value must be between 1 and 100, inclusive.
     *
     * For example, if `page_size` is set to 10, each page will include up to 10 items. Defaults to 10.
     */
    pageSize?: number;
    ascendingOrder?: boolean;
}
