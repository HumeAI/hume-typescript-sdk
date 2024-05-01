/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as Hume from "../../../../api";
import * as core from "../../../../core";
import { DatasetVersion } from "./DatasetVersion";

export const ReturnDataset: core.serialization.ObjectSchema<
    serializers.customModels.ReturnDataset.Raw,
    Hume.customModels.ReturnDataset
> = core.serialization.object({
    id: core.serialization.string().optional(),
    name: core.serialization.string(),
    latestVersion: core.serialization.property("latest_version", DatasetVersion.optional()),
    modifiedOn: core.serialization.property("modified_on", core.serialization.number().optional()),
    metadata: core.serialization
        .record(
            core.serialization.string(),
            core.serialization.record(core.serialization.string(), core.serialization.unknown())
        )
        .optional(),
});

export declare namespace ReturnDataset {
    interface Raw {
        id?: string | null;
        name: string;
        latest_version?: DatasetVersion.Raw | null;
        modified_on?: number | null;
        metadata?: Record<string, Record<string, unknown>> | null;
    }
}