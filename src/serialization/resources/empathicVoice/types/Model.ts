/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";

export const Model: core.serialization.Schema<serializers.empathicVoice.Model.Raw, Hume.empathicVoice.Model> =
    core.serialization.enum_(["20240701-4parameter", "20241004-11parameter"]);

export declare namespace Model {
    type Raw = "20240701-4parameter" | "20241004-11parameter";
}