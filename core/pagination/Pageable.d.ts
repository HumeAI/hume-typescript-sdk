import { RawResponse } from "../fetcher";
import { Page } from "./Page";
export declare namespace Pageable {
    interface Args<Response, Item> {
        response: Response;
        rawResponse: RawResponse;
        hasNextPage: (response: Response) => boolean;
        getItems: (response: Response) => Item[];
        loadPage: (response: Response) => Promise<Response>;
    }
}
export declare class Pageable<R, T> extends Page<T> {
    constructor(args: Pageable.Args<R, T>);
}
