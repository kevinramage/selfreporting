import { v4 } from "uuid";
import { UniverseObject } from "./universeObject";

export class BusinessLayer {
    private _id: string;
    private _children: UniverseObject[];

    constructor() {
        this._id = v4();
        this._children = [];
    }

    public addObject(object: UniverseObject) {
        this._children.push(object);
    }

    public get id() {
        return this._id;
    }

    public get children() {
        return this._children;
    }

    public get data() {
        return this.children.map(c => { return c.data; });
    }
}