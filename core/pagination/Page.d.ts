import { HttpResponsePromise, RawResponse } from "../fetcher";
/**
 * A page of results from a paginated API.
 *
 * @template T The type of the items in the page.
 */
export declare class Page<T> implements AsyncIterable<T> {
    data: T[];
    rawResponse: RawResponse;
    private response;
    private _hasNextPage;
    private getItems;
    private loadNextPage;
    constructor({
        response,
        rawResponse,
        hasNextPage,
        getItems,
        loadPage,
    }: {
        response: unknown;
        rawResponse: RawResponse;
        hasNextPage: (response: unknown) => boolean;
        getItems: (response: unknown) => T[];
        loadPage: (response: unknown) => HttpResponsePromise<any>;
    });
    /**
     * Retrieves the next page
     * @returns this
     */
    getNextPage(): Promise<this>;
    /**
     * @returns whether there is a next page to load
     */
    hasNextPage(): boolean;
    private iterMessages;
    [Symbol.asyncIterator](): AsyncIterator<T, void, any>;
}
