/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as Hume from "../../../../api";
import * as core from "../../../../core";
import { ReturnChat } from "./ReturnChat";

export const ReturnPagedChats: core.serialization.ObjectSchema<
    serializers.empathicVoice.ReturnPagedChats.Raw,
    Hume.empathicVoice.ReturnPagedChats
> = core.serialization.object({
    pageNumber: core.serialization.property("page_number", core.serialization.number()),
    pageSize: core.serialization.property("page_size", core.serialization.number()),
    chatsPage: core.serialization.property("chats_page", core.serialization.list(ReturnChat)),
});

export declare namespace ReturnPagedChats {
    interface Raw {
        page_number: number;
        page_size: number;
        chats_page: ReturnChat.Raw[];
    }
}