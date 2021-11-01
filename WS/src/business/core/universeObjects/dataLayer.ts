import { v4 } from "uuid";
import { UniverseConnection } from "../connection";
import { UniverseTable } from "./universeTable";

export class DataLayer {
    private _tables: UniverseTable[];
    private _connection: UniverseConnection | null;

    constructor() {
        this._connection = null;
        this._tables = [];
    }

    public addTable(table: UniverseTable) {
        this._tables.push(table);
    }

    public get tables() {
        return this._tables;
    }
    
    public get connection() {
        return this._connection;
    }

    public set connection(value) {
        this._connection = value;
    }

    public get connectionData() {
        return this.connection ? this.connection.data : {};
    }

    public get tablesData() {
        return this.tables.map(t => { return t.data; });
    }
}