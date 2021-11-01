import { IUniverseSelectable } from "../universeObjects/universeSelectable";

export class ReportDataSource {
    private _universeObjects : IUniverseSelectable[];

    constructor() {
        this._universeObjects = [];
    }

    public addObject(object: IUniverseSelectable) {
        const newObject = object.clone();
        newObject.referenceId = object.id;
        this._universeObjects.push(newObject);
    }

    public get objects() {
        return this._universeObjects;
    }

    public get data() {
        return this.objects.map(o => { return o.data; });
    }
}