/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Hume from "../../../index";

/**
 * Settings for this chat session.
 */
export interface SessionSettings {
    /** The type of message sent through the socket; for a Session Settings message, this must be `session_settings`. */
    type: "session_settings";
    /** Used to manage conversational state, correlate frontend and backend data, and persist conversations across EVI sessions. */
    customSessionId?: string;
    /** Instructions for how the system should respond to the user. Set to null to use the default system prompt. */
    systemPrompt?: string;
    /** User context to inject. Set to null to disable context injection. */
    context?: Hume.empathicVoice.Context;
    /** Audio configuration. */
    audio?: Hume.empathicVoice.AudioConfiguration;
    /** Third party API key for the language model used for non-Hume models. */
    languageModelApiKey?: string;
    /** List of tools to enable. */
    tools?: Hume.empathicVoice.Tool[];
    /** List of builtin tools to enable. */
    builtinTools?: Hume.empathicVoice.BuiltinToolConfig[];
    metadata?: Record<string, unknown>;
}
