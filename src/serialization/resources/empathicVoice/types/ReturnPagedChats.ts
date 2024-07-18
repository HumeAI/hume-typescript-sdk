/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";
import { ReturnPagedChatsPaginationDirection } from "./ReturnPagedChatsPaginationDirection";
import { ReturnChat } from "./ReturnChat";

export const ReturnPagedChats: core.serialization.ObjectSchema<
    serializers.empathicVoice.ReturnPagedChats.Raw,
    Hume.empathicVoice.ReturnPagedChats
> = core.serialization.object({
    pageNumber: core.serialization.property("page_number", core.serialization.number()),
    pageSize: core.serialization.property("page_size", core.serialization.number()),
    totalPages: core.serialization.property("total_pages", core.serialization.number()),
    paginationDirection: core.serialization.property("pagination_direction", ReturnPagedChatsPaginationDirection),
    chatsPage: core.serialization.property("chats_page", core.serialization.list(ReturnChat)),
});

export declare namespace ReturnPagedChats {
    interface Raw {
        page_number: number;
        page_size: number;
        total_pages: number;
        pagination_direction: ReturnPagedChatsPaginationDirection.Raw;
        chats_page: ReturnChat.Raw[];
    }
}
