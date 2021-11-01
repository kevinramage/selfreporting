import { CoreObject } from "../coreObject";
import { UniverseColumn } from "./universeColumn";
import { IUniverseTable } from "../../../dataaccess/universeTable";

export class UniverseTable extends CoreObject {
    private _columns: UniverseColumn[];

    constructor() {
        super();
        this._columns = [];
    }

    public addColumn(column: UniverseColumn) {
        this._columns.push(column);
    }

    public get columns() {
        return this._columns;
    }

    public get data() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            columns: this.columns.map(c => { return c.data; })
        } as IUniverseTable;
    }
}