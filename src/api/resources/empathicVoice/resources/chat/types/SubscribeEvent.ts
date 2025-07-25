/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Hume from "../../../../../index";

export type SubscribeEvent =
    | Hume.empathicVoice.AssistantEnd
    | Hume.empathicVoice.AssistantMessage
    | Hume.empathicVoice.AssistantProsody
    | Hume.empathicVoice.AudioOutput
    | Hume.empathicVoice.ChatMetadata
    | Hume.empathicVoice.WebSocketError
    | Hume.empathicVoice.UserInterruption
    | Hume.empathicVoice.UserMessage
    | Hume.empathicVoice.ToolCallMessage
    | Hume.empathicVoice.ToolResponseMessage
    | Hume.empathicVoice.ToolErrorMessage;
