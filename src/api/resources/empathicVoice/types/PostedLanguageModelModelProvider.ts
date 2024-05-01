/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * The provider of this model. Based on the enum modelProvider.
 */
export type PostedLanguageModelModelProvider =
    | "OPEN_AI"
    | "BYO_TEXT"
    | "CUSTOM_LANGUAGE_MODEL"
    | "ANTHROPIC"
    | "FIREWORKS";

export const PostedLanguageModelModelProvider = {
    OpenAi: "OPEN_AI",
    ByoText: "BYO_TEXT",
    CustomLanguageModel: "CUSTOM_LANGUAGE_MODEL",
    Anthropic: "ANTHROPIC",
    Fireworks: "FIREWORKS",
} as const;