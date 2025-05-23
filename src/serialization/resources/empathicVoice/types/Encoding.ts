/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";

export const Encoding: core.serialization.Schema<serializers.empathicVoice.Encoding.Raw, Hume.empathicVoice.Encoding> =
    core.serialization.stringLiteral("linear16");

export declare namespace Encoding {
    export type Raw = "linear16";
}
