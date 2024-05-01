/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * A specific tool version returned from the server
 */
export interface ReturnTool {
    /** Identifier for a Tool. Formatted as a UUID. */
    id: string;
    /** Version number for a Tool. Version numbers should be integers. The combination of configId and version number is unique. */
    version: number;
    /** Description that is appended to a specific version of a Tool. */
    versionDescription?: string;
    /** Name applied to all versions of a particular Tool. */
    name: string;
    /** The timestamp when the first version of this tool was created. */
    createdOn: number;
    /** The timestamp when this version of the tool was created. */
    modifiedOn: number;
    /** Text describing what the tool does. */
    description?: string;
    /** Stringified JSON defining the parameters used by this version of the Tool. */
    parameters: string;
}
