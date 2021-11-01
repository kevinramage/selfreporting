import { IBusinessObjectAttribute } from "../../../dataaccess/businessObject";
import { CoreObject } from "../coreObject";
import { UniverseTranslation } from "./universeTranslation";

export class UniverseObject extends CoreObject {
    protected translations : UniverseTranslation[];

    constructor() {
        super();
        this.translations = [];
    }

    public get data() {
        return {} as IBusinessObjectAttribute;
    }
}