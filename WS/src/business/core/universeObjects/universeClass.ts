import { BUSINESSOBJECT_TYPE, IBusinessObjectAttribute } from "../../../dataaccess/businessObject";
import { UniverseObject } from "./universeObject";

export class UniverseClass extends UniverseObject {
    private _subObjects : UniverseObject[];

    constructor() {
        super();
        this._subObjects = [];
    }

    public addObject(object: UniverseObject) {
        this._subObjects.push(object);
    }

    public get subObjects() {
        return this._subObjects;
    }

    public get data(){
        return {
            id: this.id,
            objectType: BUSINESSOBJECT_TYPE.CLASS,
            name: this.name,
            description: this.description,
            subObjects: this.subObjects.map(o => { return o.data; })
        } as IBusinessObjectAttribute
    }
}