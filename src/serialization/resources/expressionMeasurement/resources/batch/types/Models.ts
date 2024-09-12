/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../../../index";
import * as Hume from "../../../../../../api/index";
import * as core from "../../../../../../core";
import { Face } from "./Face";
import { Unconfigurable } from "./Unconfigurable";
import { Prosody } from "./Prosody";
import { Language } from "./Language";
import { Ner } from "./Ner";

export const Models: core.serialization.ObjectSchema<
    serializers.expressionMeasurement.batch.Models.Raw,
    Hume.expressionMeasurement.batch.Models
> = core.serialization.object({
    face: Face.optional(),
    burst: Unconfigurable.optional(),
    prosody: Prosody.optional(),
    language: Language.optional(),
    ner: Ner.optional(),
    facemesh: Unconfigurable.optional(),
});

export declare namespace Models {
    interface Raw {
        face?: Face.Raw | null;
        burst?: Unconfigurable.Raw | null;
        prosody?: Prosody.Raw | null;
        language?: Language.Raw | null;
        ner?: Ner.Raw | null;
        facemesh?: Unconfigurable.Raw | null;
    }
}
