import { base64Encode } from "./base64Encode";

/**
 * Fetches a new access token from the Hume API using the provided API key and Secret key.
 *
 * @param args - The arguments for the request.
 * @returns Promise that resolves to the new access token.
 * @throws If the base64 encoding fails.
 * @throws If the network request fails.
 * @example
 * ```typescript
 * async function getToken() {
 *   const accessToken = await fetchAccessToken({
 *     apiKey: 'test',
 *     secretKey: 'test',
 *   });
 *   console.log(accessToken); // Outputs the access token
 * }
 * ```
 */
export const fetchAccessToken = async (args: {
    apiKey: string;
    secretKey: string;
    host?: string;
  }): Promise<string> => {
    const { apiKey, secretKey, host = 'api.hume.ai' } = args;
  
    const authString = `${apiKey}:${secretKey}`;
    const encoded = base64Encode(authString);
  
    const res = await fetch(`https://${host}/oauth2-cc/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${encoded}`,
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
      }).toString(),
      cache: 'no-cache',
    });
  
    const data = (await res.json()) as { access_token: string };
    const accessToken = String(data['access_token']);
  
    return accessToken;
  };