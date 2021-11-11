import { History } from "./History";

export class HistoryManagement {
    private static _instance : HistoryManagement | null = null;
    private _sources : { [key: string ]: History<any> };

    constructor() {
        this._sources = {};
    }

    public registerSource(key: string, element: any) {
        const history = new History();
        history.addState(element, "Init");
        this._sources[key] = history;
    }

    public getSource(key: string) {
        return this._sources[key];
    }

    public static get instance() {
        if (HistoryManagement._instance === null) {
            HistoryManagement._instance = new HistoryManagement();
        }
        return HistoryManagement._instance;
    }
}

export module HISTORY_SOURCES {
    export const REPORT = "REPORT";
}