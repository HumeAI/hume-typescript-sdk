/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Hume from "../../../index";

export interface Tool {
    /** Description of the function. */
    description?: string;
    /** Fallback content of the tool, passed to the LLM if the function call response fails. */
    fallbackContent?: string;
    /** Name of the tool. */
    name: string;
    /** Parameters of the tool. Is a stringified JSON schema. */
    parameters: string;
    /** Type of tool. */
    type: Hume.empathicVoice.ToolType;
}
