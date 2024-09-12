/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Hume from "../../../index";

/**
 * A Custom Voice specification associated with this Config.
 */
export interface ReturnCustomVoice {
    /** Identifier for a Custom Voice. Formatted as a UUID. */
    id: string;
    /**
     * Version number for a Custom Voice.
     *
     * Custom Voices, Prompts, Configs, and Tools are versioned. This versioning system supports iterative development, allowing you to progressively refine configurations and revert to previous versions if needed.
     *
     * Version numbers are integer values representing different iterations of the Custom Voice. Each update to the Custom Voice increments its version number.
     */
    version: number;
    /** The name of the Custom Voice. Maximum length of 75 characters. */
    name: string;
    /** Time at which the Custom Voice was created. Measured in seconds since the Unix epoch. */
    createdOn: number;
    /** Time at which the Custom Voice was last modified. Measured in seconds since the Unix epoch. */
    modifiedOn: number;
    /** The base voice used to create the Custom Voice. */
    baseVoice: Hume.empathicVoice.ReturnCustomVoiceBaseVoice;
    /** The name of the parameter model used to define which attributes are used by the `parameters` field. Currently, only `20240715-4parameter` is supported as the parameter model. */
    parameterModel: "20240715-4parameter";
    /** The specified attributes of a Custom Voice. If a parameter's value is `0` (default), it will not be included in the response. */
    parameters: Hume.empathicVoice.ReturnCustomVoiceParameters;
}
