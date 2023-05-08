/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "..";
import * as Hume from "../../api";
import * as core from "../../core";

export const SourceUrl: core.serialization.ObjectSchema<serializers.SourceUrl.Raw, Hume.SourceUrl> =
    core.serialization.lazyObject(async () => (await import("..")).Url);

export declare namespace SourceUrl {
    type Raw = serializers.Url.Raw;
}