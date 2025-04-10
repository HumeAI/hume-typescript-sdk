/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as Hume from "../../../../api/index";
import * as core from "../../../../core";

export const PostedLanguageModelModelResource: core.serialization.Schema<
    serializers.empathicVoice.PostedLanguageModelModelResource.Raw,
    Hume.empathicVoice.PostedLanguageModelModelResource
> = core.serialization.enum_([
    "claude-3-7-sonnet",
    "claude-3-5-sonnet-latest",
    "claude-3-5-haiku-20241022-v1",
    "gemini-2.0-flash",
    "claude-3-haiku-20240307",
    "gemini-1.5-pro",
    "claude-3-5-sonnet-20240620",
    "gpt-4o",
    "gpt-4o-mini",
    "gemini-1.5-flash",
    "claude-3-5-haiku-latest",
    "llama-v3p1-70b-instruct",
    "llama-3.3-70b-versatile",
    "llama-v3p1-405b-instruct",
    "llama-v3p1-8b-instruct",
    "llama-3.1-8b-instant",
    "mixtral-8x7b-instruct",
    "llama3-8b-8192",
    "llama3-70b-8192",
    "claude-3-opus-20240229",
    "gpt-4-turbo",
    "claude-3-sonnet-20240229",
    "claude-3-5-sonnet-20240620-v1",
    "claude-3-haiku-20240307-v1",
    "ellm",
]);

export declare namespace PostedLanguageModelModelResource {
    export type Raw =
        | "claude-3-7-sonnet"
        | "claude-3-5-sonnet-latest"
        | "claude-3-5-haiku-20241022-v1"
        | "gemini-2.0-flash"
        | "claude-3-haiku-20240307"
        | "gemini-1.5-pro"
        | "claude-3-5-sonnet-20240620"
        | "gpt-4o"
        | "gpt-4o-mini"
        | "gemini-1.5-flash"
        | "claude-3-5-haiku-latest"
        | "llama-v3p1-70b-instruct"
        | "llama-3.3-70b-versatile"
        | "llama-v3p1-405b-instruct"
        | "llama-v3p1-8b-instruct"
        | "llama-3.1-8b-instant"
        | "mixtral-8x7b-instruct"
        | "llama3-8b-8192"
        | "llama3-70b-8192"
        | "claude-3-opus-20240229"
        | "gpt-4-turbo"
        | "claude-3-sonnet-20240229"
        | "claude-3-5-sonnet-20240620-v1"
        | "claude-3-haiku-20240307-v1"
        | "ellm";
}
