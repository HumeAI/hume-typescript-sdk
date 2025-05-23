/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * Type of Chat Event. There are six possible values:
 *
 * - `SYSTEM_PROMPT`: Contains the system prompt for use in the session.
 *
 * - `USER_MESSAGE`: Contains the message sent by the user.
 *
 * - `USER_INTERRUPTION`: Contains an interruption made by the user while the agent is speaking.
 *
 * - `AGENT_MESSAGE`: Contains the assistant’s message, generated by Hume’s eLLM and supplemental LLM.
 *
 * - `FUNCTION_CALL`: Contains the invocation of a tool.
 *
 * - `FUNCTION_CALL_RESPONSE`: Contains the tool response.
 */
export type ReturnChatEventType =
    | "SYSTEM_PROMPT"
    | "USER_MESSAGE"
    | "USER_INTERRUPTION"
    | "AGENT_MESSAGE"
    | "FUNCTION_CALL"
    | "FUNCTION_CALL_RESPONSE";
export const ReturnChatEventType = {
    SystemPrompt: "SYSTEM_PROMPT",
    UserMessage: "USER_MESSAGE",
    UserInterruption: "USER_INTERRUPTION",
    AgentMessage: "AGENT_MESSAGE",
    FunctionCall: "FUNCTION_CALL",
    FunctionCallResponse: "FUNCTION_CALL_RESPONSE",
} as const;
