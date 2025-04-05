/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";
import { ContextType } from "./ContextType";

export const Context: core.serialization.ObjectSchema<
    serializers.empathicVoice.Context.Raw,
    Hume.empathicVoice.Context
> = core.serialization.object({
    text: core.serialization.string(),
    type: ContextType.optional(),
});

export declare namespace Context {
    export interface Raw {
        text: string;
        type?: ContextType.Raw | null;
    }
}
