import { BusinessObjectModel, BUSINESSOBJECT_TYPE, IBusinessObjectAttribute } from "../../../dataaccess/businessObject";
import { UniverseObject } from "./universeObject";
import { IUniverseSelectable } from "./universeSelectable";

export class UniverseDimension extends UniverseObject implements IUniverseSelectable {
    private _tableName: string
    private _select : string;
    private _where : string;
    private _referenceId: string;

    constructor(name: string, description: string) {
        super();
        this._name = name;
        this._description = description;
        this._tableName = "";
        this._select = "";
        this._where = "";
        this._referenceId = "";
    }

    public clone() {
        const newObj = new UniverseDimension(this.name, this.description);
        newObj.tableName = this.tableName;
        newObj.select = this.select;
        newObj.where = this.where;
        return newObj;
    }

    public static instanciateFromModel(model: BusinessObjectModel) {
        const dimension = new UniverseDimension(model.name, model.description);
        dimension.id = model.id;
        dimension.tableName = model.tableName;
        dimension.select = model.selectStatement;
        dimension.where = model.whereStatement;
        if (model.referenceId) {
            dimension.referenceId = model.referenceId;
        }
        return dimension;
    }

    public get tableName() {
        return this._tableName;
    }
    public set tableName(value) {
        this._tableName = value;
    }

    public get select() {
        return this._select;
    }
    public set select(value) {
        this._select = value;
    }

    public get where() {
        return this._where;
    }
    public set where(value) {
        this._where = value;
    }

    public get referenceId() {
        return this._referenceId;
    }
    public set referenceId(value) {
        this._referenceId = value;
    }

    public get data() {
        return {
            id: this.id,
            objectType: BUSINESSOBJECT_TYPE.DIMENSION,
            name: this.name,
            description: this.description,
            tableName: this.tableName,
            selectStatement: this.select,
            whereStatement: this.where,
            referenceId: this.referenceId
        } as IBusinessObjectAttribute;
    }
}