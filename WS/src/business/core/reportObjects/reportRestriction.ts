import { IUniverseSelectable } from "../universeObjects/universeSelectable";

export class ReportRestriction {
    private _id: string;
    private _operand1: IUniverseSelectable | null;
    private _operationType: string;
    private _operand2Type: string;
    private _operand2: IUniverseSelectable | null;
    private _operand2Constant: string;

    constructor() {
        this._id = "";
        this._operand1 = null;
        this._operationType = "";
        this._operand2Type = "";
        this._operand2 = null;
        this._operand2Constant = "";
    }

    public get id() {
        return this._id;
    }
    public set id(value) {
        this._id = value;
    }

    public get operand1() {
        return this._operand1;
    }
    public set operand1(value) {
        this._operand1 = value;
    }

    public get operationType() {
        return this._operationType;
    }
    public set operationType(value) {
        this._operationType = value;
    }

    public get operand2Type() {
        return this._operand2Type;
    }
    public set operand2Type(value) {
        this._operand2Type = value;
    }

    public get operand2() {
        return this._operand2;
    }
    public set operand2(value) {
        this._operand2 = value;
    }

    public get operand2Constant() {
        return this._operand2Constant;
    }
    public set operand2Constant(value) {
        this._operand2Constant = value;
    }
}

export module RESTRICTIONOPERATION_TYPE {
    export const EQUALS = "EQUALS";
    export const NOT_EQUALS = "NOT_EQUALS";
    export const MATCHES = "MATCHES";
    export const NOTMATCHES = "NOTMATCHES";
}

export module RESTRICTIONOPERAND_TYPE {
    export const FIELD = "FIELD";
    export const CONSTANT = "CONSTANT";
}