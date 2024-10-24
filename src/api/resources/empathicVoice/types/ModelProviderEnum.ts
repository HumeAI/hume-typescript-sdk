/**
 * This file was auto-generated by Fern from our API Definition.
 */

export type ModelProviderEnum =
    | "GROQ"
    | "OPEN_AI"
    | "BYO_TEXT"
    | "FIREWORKS"
    | "ANTHROPIC"
    | "CUSTOM_LANGUAGE_MODEL"
    | "GOOGLE"
    | "HUME_AI";

export const ModelProviderEnum = {
    Groq: "GROQ",
    OpenAi: "OPEN_AI",
    ByoText: "BYO_TEXT",
    Fireworks: "FIREWORKS",
    Anthropic: "ANTHROPIC",
    CustomLanguageModel: "CUSTOM_LANGUAGE_MODEL",
    Google: "GOOGLE",
    HumeAi: "HUME_AI",
} as const;