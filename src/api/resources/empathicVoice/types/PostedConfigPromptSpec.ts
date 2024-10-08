/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * Identifies which prompt to use in a a config OR how to create a new prompt to use in the config
 */
export interface PostedConfigPromptSpec {
    /** Identifier for a Prompt. Formatted as a UUID. */
    id?: string;
    /** Version number for a Prompt. Version numbers should be integers. The combination of configId and version number is unique. */
    version?: number;
    /** Text used to create a new prompt for a particular config. */
    text?: string;
}
