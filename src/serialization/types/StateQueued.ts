/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "..";
import * as Hume from "../../api";
import * as core from "../../core";

export const StateQueued: core.serialization.ObjectSchema<serializers.StateQueued.Raw, Hume.StateQueued> =
    core.serialization.object({
        status: core.serialization.string().optional(),
    });

export declare namespace StateQueued {
    interface Raw {
        status?: string | null;
    }
}
