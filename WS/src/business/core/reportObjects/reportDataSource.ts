import { IReportRestrictionAttribute } from "../../../dataaccess/reportRestriction";
import { IUniverseSelectable } from "../universeObjects/universeSelectable";
import { ReportRestriction } from "./reportRestriction";

export class ReportDataSource {
    private _universeObjects : IUniverseSelectable[];
    private _restriction ?: ReportRestriction;

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

    public get restriction() {
        return this._restriction;
    }

    public set restriction(value) {
        this._restriction = value;
    }

    public get data() {
        return this.objects.map(o => { return o.data; });
    }

    public get dataRestriction() {
        if ( this.restriction) {
            let data : IReportRestrictionAttribute = {
                id: this.restriction.id,
                operationType: this.restriction.operationType,
                operand2Type: this.restriction.operand2Type,
                operand2Constant: this.restriction.operand2Constant
            };
            if (this.restriction.operand1) {
                data.operand1 = this.restriction.operand1.data;
            }
            if (this.restriction.operand2) {
                data.operand2 = this.restriction.operand2.data;
            }
            return data;
        } else {
            return {};
        }
    }
}