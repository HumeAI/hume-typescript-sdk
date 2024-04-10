/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Hume from "../../..";

export interface AssistantMessage {
    /** ID of the assistant message. */
    id?: string;
    /** Transcript of the message. */
    message: Hume.empathicVoice.ChatMessage;
    /** Inference model results. */
    models: Hume.empathicVoice.Inference;
    type?: "assistant_message";
}
