import { v4 } from "uuid";

export class CoreObject {
    protected _id : string;
    protected _name : string;
    protected _description : string;

    constructor() {
        this._id = v4();
        this._name = "";
        this._description = "";
    }

    public get id() {
        return this._id;
    }
    public set id(value) {
        this._id = value;
    }

    public get name() {
        return this._name;
    }

    public set name(value) {
        this._name = value;
    }

    public get description() {
        return this._description;
    }

    public set description(value) {
        this._description = value;
    }
}