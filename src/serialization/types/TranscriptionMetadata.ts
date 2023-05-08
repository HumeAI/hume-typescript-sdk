/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "..";
import * as Hume from "../../api";
import * as core from "../../core";

export const TranscriptionMetadata: core.serialization.ObjectSchema<
    serializers.TranscriptionMetadata.Raw,
    Hume.TranscriptionMetadata
> = core.serialization.object({
    confidence: core.serialization.number(),
    detectedLanguage: core.serialization.property(
        "detected_language",
        core.serialization.lazy(async () => (await import("..")).Bcp47Tag).optional()
    ),
});

export declare namespace TranscriptionMetadata {
    interface Raw {
        confidence: number;
        detected_language?: serializers.Bcp47Tag.Raw | null;
    }
}
