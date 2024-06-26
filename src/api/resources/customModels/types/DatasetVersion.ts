/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Hume from "../../../index";

export interface DatasetVersion {
    /** Hume-generated Dataset version ID */
    id: string;
    /** Hume-generated User ID */
    userId: string;
    /** Dataset Labels file URI */
    labelsFileUri: string;
    /** Feature types of label mapped to feature type */
    featureTypes: Record<string, Hume.customModels.DatasetVersionFeatureTypesValue>;
    /** Hume-generated Dataset ID of the parent Dataset */
    datasetId: string;
    /** Dataset version number */
    datasetVersion: number;
    /** Created date and time */
    createdOn: number;
}
