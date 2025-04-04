/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * Type of Tool. Either `BUILTIN` for natively implemented tools, like web search, or `FUNCTION` for user-defined tools.
 */
export type ReturnUserDefinedToolToolType = "BUILTIN" | "FUNCTION";
export const ReturnUserDefinedToolToolType = {
    Builtin: "BUILTIN",
    Function: "FUNCTION",
} as const;
