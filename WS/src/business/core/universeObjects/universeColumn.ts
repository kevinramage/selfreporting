import { v4 } from "uuid";
import { IUniverseColumn } from "../../../dataaccess/universeColumn";

export class UniverseColumn {
    private _id: string;
    private _name: string;
    private _type: string;

    constructor(name: string, type: string) {
        this._id = v4();
        this._name = name;
        this._type = type;
    }

    public get id() {
        return this._id;
    }

    public get name() {
        return this._name;
    }

    public set name(value) {
        this._name = value;
    }

    public get type() {
        return this._type;
    }

    public set type(value) {
        this._type = value;
    }

    public get data() {
        return {
            id: this.id,
            name: this.name,
            type: this.type
        } as IUniverseColumn;
    }
}