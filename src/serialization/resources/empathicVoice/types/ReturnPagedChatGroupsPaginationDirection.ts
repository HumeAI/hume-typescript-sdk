/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";

export const ReturnPagedChatGroupsPaginationDirection: core.serialization.Schema<
    serializers.empathicVoice.ReturnPagedChatGroupsPaginationDirection.Raw,
    Hume.empathicVoice.ReturnPagedChatGroupsPaginationDirection
> = core.serialization.enum_(["ASC", "DESC"]);

export declare namespace ReturnPagedChatGroupsPaginationDirection {
    export type Raw = "ASC" | "DESC";
}
