/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Hume from "../../..";

export interface TlInferencePrediction {
    /** A file path relative to the top level source URL or file. */
    file: string;
    fileType: string;
    customModels: Record<string, Hume.customModels.CustomModelPrediction>;
}
