import { TestEnvironment } from "jest-environment-jsdom";

class BrowserTestEnvironment extends TestEnvironment {
    async setup() {
        await super.setup();
        this.global.Request = Request;
        this.global.Response = Response;
        this.global.ReadableStream = ReadableStream;
        this.global.TextEncoder = TextEncoder;
        this.global.TextDecoder = TextDecoder;
        this.global.FormData = FormData;
        if (typeof File === "undefined") {
            this.global.File = require("buffer").File;
        } else {
            this.global.File = File;
        }
        this.global.Blob = Blob;
    }
}

export default BrowserTestEnvironment;
