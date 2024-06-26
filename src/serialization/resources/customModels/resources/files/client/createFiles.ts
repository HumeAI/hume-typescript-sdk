/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as Hume from "../../../../../../api/index";
import * as core from "../../../../../../core";
import { FileWithAttributesInput } from "../../../types/FileWithAttributesInput";
import { FileWithAttributes } from "../../../types/FileWithAttributes";

export const Request: core.serialization.Schema<
    serializers.customModels.files.createFiles.Request.Raw,
    Hume.customModels.FileWithAttributesInput[]
> = core.serialization.list(FileWithAttributesInput);

export declare namespace Request {
    type Raw = FileWithAttributesInput.Raw[];
}

export const Response: core.serialization.Schema<
    serializers.customModels.files.createFiles.Response.Raw,
    Hume.customModels.FileWithAttributes[]
> = core.serialization.list(FileWithAttributes);

export declare namespace Response {
    type Raw = FileWithAttributes.Raw[];
}
