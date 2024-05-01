/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as Hume from "../../../../api";
import * as core from "../../../../core";

export const AuthorizedFile: core.serialization.ObjectSchema<
    serializers.customModels.AuthorizedFile.Raw,
    Hume.customModels.AuthorizedFile
> = core.serialization.object({
    id: core.serialization.string(),
    name: core.serialization.string().optional(),
    uri: core.serialization.string().optional(),
    uploadUri: core.serialization.property("upload_uri", core.serialization.string().optional()),
    thumbnailUri: core.serialization.property("thumbnail_uri", core.serialization.string().optional()),
    userId: core.serialization.property("user_id", core.serialization.string()),
    dataType: core.serialization.property("data_type", core.serialization.string()),
    createdOn: core.serialization.property("created_on", core.serialization.number().optional()),
    modifiedOn: core.serialization.property("modified_on", core.serialization.number().optional()),
    metadata: core.serialization
        .record(
            core.serialization.string(),
            core.serialization.record(core.serialization.string(), core.serialization.unknown())
        )
        .optional(),
    humeStorage: core.serialization.property("hume_storage", core.serialization.boolean().optional()),
    humeStorageUploadTimestamp: core.serialization.property(
        "hume_storage_upload_timestamp",
        core.serialization.number().optional()
    ),
    isSanitized: core.serialization.property("is_sanitized", core.serialization.boolean()),
    isOwnedByReader: core.serialization.property("is_owned_by_reader", core.serialization.boolean()),
    isLinkedToPubliclyShared: core.serialization.property(
        "is_linked_to_publicly_shared",
        core.serialization.boolean().optional()
    ),
    isLinkedToHumeModel: core.serialization.property(
        "is_linked_to_hume_model",
        core.serialization.boolean().optional()
    ),
});

export declare namespace AuthorizedFile {
    interface Raw {
        id: string;
        name?: string | null;
        uri?: string | null;
        upload_uri?: string | null;
        thumbnail_uri?: string | null;
        user_id: string;
        data_type: string;
        created_on?: number | null;
        modified_on?: number | null;
        metadata?: Record<string, Record<string, unknown>> | null;
        hume_storage?: boolean | null;
        hume_storage_upload_timestamp?: number | null;
        is_sanitized: boolean;
        is_owned_by_reader: boolean;
        is_linked_to_publicly_shared?: boolean | null;
        is_linked_to_hume_model?: boolean | null;
    }
}