/** THIS FILE IS MANUALLY MAINAINED: see .fernignore */
export class Event {
    constructor(type, target) {
        this.target = target;
        this.type = type;
    }
}
export class ErrorEvent extends Event {
    constructor(error, target) {
        super("error", target);
        this.message = error.message;
        this.error = error;
    }
}
export class CloseEvent extends Event {
    constructor(code = 1000, reason = "", target) {
        super("close", target);
        this.wasClean = true;
        this.willReconnect = false;
        this.code = code;
        this.reason = reason;
    }
}
