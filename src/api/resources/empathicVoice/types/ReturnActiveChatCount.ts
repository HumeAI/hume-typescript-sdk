/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as Hume from '../../../index';

/**
 * A description of current chat chat sessions for a user
 */
export interface ReturnActiveChatCount {
  /** The timestamp for when chat status was measured. Formatted as a Unix epoch milliseconds. */
  timestamp: number;
  /** The total number of active chats for this user. */
  totalUserActiveChats: number;
  /** The maximum number of concurrent active chats for this user. */
  maxAllowedActiveChats?: number;
  /** Boolean indicating if the user is allowed to start more chats. */
  moreActiveChatsAllowed: boolean;
  /** Optional List of chat counts per tag. */
  perTag?: (Hume.empathicVoice.ReturnActiveChatCountPerTag | undefined)[];
}
