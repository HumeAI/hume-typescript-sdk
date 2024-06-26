/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * @example
 *     {
 *         name: "name",
 *         text: "text"
 *     }
 */
export interface PostedPrompt {
    /** Name applied to all versions of a particular Prompt. */
    name: string;
    /** Description that is appended to a specific version of a Prompt. */
    versionDescription?: string;
    /** Text used for this version of the Prompt. */
    text: string;
}
