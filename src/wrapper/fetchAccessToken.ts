import { base64Encode } from "./base64Encode";
import { z } from "zod";

/**
 * Fetches a new access token from the Hume API using the provided API key and Secret key.
 *
 * @param args - The arguments for the request.
 * @example
 * ```typescript
 * async function getToken() {
 *   const accessToken = await fetchAccessToken({
 *     apiKey: 'test',
 *     secretKey: 'test',
 *   });
 *
 *   console.log(accessToken); // Outputs the access token
 * }
 * ```
 */
export const fetchAccessToken = async ({
    apiKey,
    secretKey,
    host = "api.hume.ai",
}: {
    apiKey: string;
    secretKey: string;
    host?: string;
}): Promise<string> => {
    const authString = `${apiKey}:${secretKey}`;
    const encoded = base64Encode(authString);

    const res = await fetch(`https://${host}/oauth2-cc/token`, {
        
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${encoded}`,
        },
        body: new URLSearchParams({
            grant_type: "client_credentials",
        }).toString(),
        cache: "no-cache",
    });
    if (res.ok) {
        throw new Error(`Failed to fetch access token: (${res.status} ${res.statusText})\n ${await res.text()}`);
    }
    return z
        .object({
            access_token: z.string(),
        })
        .transform((data) => {
            return data.access_token;
        })
        .parse(await res.json());
};
