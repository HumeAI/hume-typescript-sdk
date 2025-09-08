/** THIS FILE IS MANUALLY MAINAINED: see .fernignore */
import * as core from "./core";
import { Tts } from "./api/resources/tts/client/Client";
import { EmpathicVoice } from "./api/resources/empathicVoice/client/Client";
import { ExpressionMeasurement } from "./api/resources/expressionMeasurement/client/Client";
import { SDK_VERSION } from "./version";
const fetcherThatAddsHeaders = (fetcherToWrap) => {
    return (args) => {
        var _a;
        const newArgs = Object.assign({}, args);
        newArgs.headers = (_a = newArgs.headers) !== null && _a !== void 0 ? _a : {};
        ((newArgs.headers["X-Hume-Client-Name"] = "typescript_sdk"),
            (newArgs.headers["X-Hume-Client-Version"] = SDK_VERSION));
        return fetcherToWrap(args);
    };
};
export class HumeClient {
    constructor(_options = {}) {
        var _a;
        this._options = _options;
        const defaultFetcher = (_a = _options.fetcher) !== null && _a !== void 0 ? _a : core.fetcher;
        this._options.fetcher = fetcherThatAddsHeaders(defaultFetcher);
    }
    get tts() {
        var _a;
        return (_a = this._tts) !== null && _a !== void 0 ? _a : (this._tts = new Tts(this._options));
    }
    get empathicVoice() {
        var _a;
        return (_a = this._empathicVoice) !== null && _a !== void 0
            ? _a
            : (this._empathicVoice = new EmpathicVoice(this._options));
    }
    get expressionMeasurement() {
        var _a;
        return (_a = this._expressionMeasurement) !== null && _a !== void 0
            ? _a
            : (this._expressionMeasurement = new ExpressionMeasurement(this._options));
    }
}
