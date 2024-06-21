/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Hume from "../../../index";

/**
 * A specific config version returned from the server
 */
export interface ReturnConfig {
    /** Identifier for a Config. Formatted as a UUID. */
    id?: string;
    /** Version number for a Config. Version numbers should be integers. The combination of configId and version number is unique. */
    version?: number;
    /** Description that is appended to a specific version of a Config. */
    versionDescription?: string;
    /** Name applied to all versions of a particular Config. */
    name?: string;
    /** The timestamp when the first version of this config was created. */
    createdOn?: number;
    /** The timestamp when this version of the config was created. */
    modifiedOn?: number;
    prompt?: Hume.empathicVoice.ReturnPrompt;
    voice?: Hume.empathicVoice.ReturnVoice;
    languageModel?: Hume.empathicVoice.ReturnLanguageModel;
    ellmModel?: Hume.empathicVoice.ReturnEllmModel;
    /** List of user-defined tools associated with this config. */
    tools?: (Hume.empathicVoice.ReturnUserDefinedTool | undefined)[];
    /** List of built-in tools associated with this config */
    builtinTools?: (Hume.empathicVoice.ReturnBuiltinTool | undefined)[];
    /** Map of event messages associated with this config. */
    eventMessages?: Record<string, Hume.empathicVoice.ReturnEventMessageSpec | undefined>;
    /** Map of timeouts associated with this config. */
    timeouts?: Record<string, Hume.empathicVoice.ReturnTimeoutSpec | undefined>;
}
