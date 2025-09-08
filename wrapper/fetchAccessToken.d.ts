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
export declare const fetchAccessToken: ({
    apiKey,
    secretKey,
    host,
}: {
    apiKey: string;
    secretKey: string;
    host?: string;
}) => Promise<string>;
