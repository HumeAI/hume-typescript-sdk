/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "..";
import * as Hume from "../../api";
import * as core from "../../core";

export const Empty: core.serialization.Schema<serializers.Empty.Raw, Hume.Empty> = core.serialization.record(
    core.serialization.string(),
    core.serialization.unknown()
);

export declare namespace Empty {
    type Raw = Record<string, unknown>;
}