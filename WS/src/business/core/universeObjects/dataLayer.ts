import { v4 } from "uuid";
import { UniverseConnection } from "../connection";
import { UniverseJoin } from "./universeJoin";
import { UniverseTable } from "./universeTable";

export class DataLayer {
    private _tables: UniverseTable[];
    private _joins : UniverseJoin[];
    private _connection: UniverseConnection | null;

    constructor() {
        this._connection = null;
        this._tables = [];
        this._joins = [];
    }

    public addTable(table: UniverseTable) {
        this._tables.push(table);
    }

    public addJoin(join: UniverseJoin) {
        this._joins.push(join);
    }

    public get tables() {
        return this._tables;
    }

    public get joins() {
        return this._joins;
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

    public get joinsData() {
        return this.joins.map(j => { return j.data; });
    }
}