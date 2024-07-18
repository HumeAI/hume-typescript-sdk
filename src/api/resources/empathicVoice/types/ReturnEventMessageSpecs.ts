/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Hume from "../../../index";

/**
 * Collection of event messages returned by the server.
 *
 * Event messages are sent by the server when specific events occur during a chat session. These messages are used to configure behaviors for EVI, such as controlling how EVI starts a new conversation.
 */
export interface ReturnEventMessageSpecs {
    /** `enabled` causes the supplemental LLM to generate an initial message using the system prompt. `text` is the string to use verbatim as the initial message. */
    onNewChat?: Hume.empathicVoice.ReturnEventMessageSpec;
}
