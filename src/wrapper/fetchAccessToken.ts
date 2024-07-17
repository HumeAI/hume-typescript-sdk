import { base64Encode } from "./base64Encode";
import { z } from "zod";

/**
 * Fetches a new access token from the Hume API using the provided API key and Secret key.
 *
 * @param args - The arguments for the request.
 * @returns Promise that resolves to the new access token or null.
 * @throws If the base64 encoding fails.
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
}): Promise<string | null> => {
    const authString = `${apiKey}:${secretKey}`;
    const encoded = base64Encode(authString);

    const response = await fetch(`https://${host}/oauth2-cc/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${encoded}`,
        },
        body: new URLSearchParams({
            grant_type: "client_credentials",
        }).toString(),
        cache: "no-cache",
    })
        .then((res) => {
            // if reading response as json fails, return empty object
            // this can happen when request returns XML due to server error
            return res
                .json()
                .then((d: unknown) => d)
                .catch(() => ({}));
        })
        .then((data: unknown) => {
            // extract access_token value from received object
            return z
                .object({
                    access_token: z.string(),
                })
                .transform((data) => {
                    return data.access_token;
                })
                .safeParse(data);
        }).catch(() => ({
          success: false
        } as const));

    if (!response.success) {
        return null;
    }

    return response.data;
};
