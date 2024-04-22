/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../..";
import * as Hume from "../../../../../../api";
import * as core from "../../../../../../core";
import { FilePage } from "../../../types/FilePage";

export const Response: core.serialization.Schema<
    serializers.customModels.datasets.getFilesFromDatasetLatestVersion.Response.Raw,
    Hume.customModels.FilePage[]
> = core.serialization.list(FilePage);

export declare namespace Response {
    type Raw = FilePage.Raw[];
}
