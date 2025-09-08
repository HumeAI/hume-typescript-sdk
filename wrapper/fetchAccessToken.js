var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
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
export const fetchAccessToken = (_a) =>
    __awaiter(void 0, [_a], void 0, function* ({ apiKey, secretKey, host = "api.hume.ai" }) {
        const authString = `${apiKey}:${secretKey}`;
        const encoded = base64Encode(authString);
        const res = yield fetch(`https://${host}/oauth2-cc/token`, {
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
        return z
            .object({
                access_token: z.string(),
            })
            .transform((data) => {
                return data.access_token;
            })
            .parse(yield res.json());
    });
