import { format } from "util";

export class ConnectionError extends Error {
    constructor(code: string, msg: string) {
        super(format("ERR_RER_CNX_%s - %s", code, msg));
    }
}

export module CONNECTION_ERROR {
    export const UNIVERSE_NOTFOUND = { code: "01", message: "Impossible to find universe link to report"};   
}

export module CONNECTION_ERROR {
    export const CONNECTION_NOTFOUND = { code: "02", message: "Impossible to find connection link to the universe"};   
}