/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as errors from "../../../../errors/index";
import * as Hume from "../../../index";

export class BadRequestError extends errors.HumeError {
    constructor(body: Hume.empathicVoice.ErrorResponse) {
        super({
            message: "BadRequestError",
            statusCode: 400,
            body: body,
        });
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}
