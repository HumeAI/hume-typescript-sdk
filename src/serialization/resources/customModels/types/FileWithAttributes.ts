/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as Hume from "../../../../api";
import * as core from "../../../../core";
import { AuthorizedFile } from "./AuthorizedFile";
import { AttributeFilter } from "./AttributeFilter";

export const FileWithAttributes: core.serialization.ObjectSchema<
    serializers.customModels.FileWithAttributes.Raw,
    Hume.customModels.FileWithAttributes
> = core.serialization.object({
    file: AuthorizedFile,
    attributes: core.serialization.list(AttributeFilter).optional(),
});

export declare namespace FileWithAttributes {
    interface Raw {
        file: AuthorizedFile.Raw;
        attributes?: AttributeFilter.Raw[] | null;
    }
}