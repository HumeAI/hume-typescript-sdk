/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";

export const ReturnChatPagedEventsPaginationDirection: core.serialization.Schema<
    serializers.empathicVoice.ReturnChatPagedEventsPaginationDirection.Raw,
    Hume.empathicVoice.ReturnChatPagedEventsPaginationDirection
> = core.serialization.enum_(["ASC", "DESC"]);

export declare namespace ReturnChatPagedEventsPaginationDirection {
    type Raw = "ASC" | "DESC";
}