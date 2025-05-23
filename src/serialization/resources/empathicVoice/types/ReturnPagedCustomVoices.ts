/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";
import { ReturnCustomVoice } from "./ReturnCustomVoice";

export const ReturnPagedCustomVoices: core.serialization.ObjectSchema<
    serializers.empathicVoice.ReturnPagedCustomVoices.Raw,
    Hume.empathicVoice.ReturnPagedCustomVoices
> = core.serialization.object({
    pageNumber: core.serialization.property("page_number", core.serialization.number()),
    pageSize: core.serialization.property("page_size", core.serialization.number()),
    totalPages: core.serialization.property("total_pages", core.serialization.number()),
    customVoicesPage: core.serialization.property("custom_voices_page", core.serialization.list(ReturnCustomVoice)),
});

export declare namespace ReturnPagedCustomVoices {
    export interface Raw {
        page_number: number;
        page_size: number;
        total_pages: number;
        custom_voices_page: ReturnCustomVoice.Raw[];
    }
}
