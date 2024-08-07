/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from '../../../index';
import * as Hume from '../../../../api/index';
import * as core from '../../../../core';
import { ReturnActiveChatCountPerTag } from './ReturnActiveChatCountPerTag';

export const ReturnActiveChatCount: core.serialization.ObjectSchema<
  serializers.empathicVoice.ReturnActiveChatCount.Raw,
  Hume.empathicVoice.ReturnActiveChatCount
> = core.serialization.object({
  timestamp: core.serialization.number(),
  totalUserActiveChats: core.serialization.property(
    'total_user_active_chats',
    core.serialization.number(),
  ),
  maxAllowedActiveChats: core.serialization.property(
    'max_allowed_active_chats',
    core.serialization.number().optional(),
  ),
  moreActiveChatsAllowed: core.serialization.property(
    'more_active_chats_allowed',
    core.serialization.boolean(),
  ),
  perTag: core.serialization.property(
    'per_tag',
    core.serialization.list(ReturnActiveChatCountPerTag.optional()).optional(),
  ),
});

export declare namespace ReturnActiveChatCount {
  interface Raw {
    timestamp: number;
    total_user_active_chats: number;
    max_allowed_active_chats?: number | null;
    more_active_chats_allowed: boolean;
    per_tag?: (ReturnActiveChatCountPerTag.Raw | null | undefined)[] | null;
  }
}
