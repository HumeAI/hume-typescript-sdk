/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * @example
 *     {
 *         text: "<role>You are an updated version of an AI weather assistant providing users with accurate and up-to-date weather information. Respond to user queries concisely and clearly. Use simple language and avoid technical jargon. Provide temperature, precipitation, wind conditions, and any weather alerts. Include helpful tips if severe weather is expected.</role>",
 *         versionDescription: "This is an updated version of the Weather Assistant Prompt."
 *     }
 */
export interface PostedPromptVersion {
    /** An optional description of the Prompt version. */
    versionDescription?: string;
    /**
     * Instructions used to shape EVI’s behavior, responses, and style for this version of the Prompt.
     *
     * You can use the Prompt to define a specific goal or role for EVI, specifying how it should act or what it should focus on during the conversation. For example, EVI can be instructed to act as a customer support representative, a fitness coach, or a travel advisor, each with its own set of behaviors and response styles.
     *
     * For help writing a system prompt, see our [Prompting Guide](/docs/empathic-voice-interface-evi/guides/prompting).
     */
    text: string;
}
