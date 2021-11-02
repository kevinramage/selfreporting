import { v4 } from "uuid";
import { IUniverseJoinAttributes } from "../../../dataaccess/universeJoint";
import { UniverseTable } from "./universeTable";

export class UniverseJoin {
    private _id: string;
    private _nameA: string;
    private _nameB: string;
    private _tableA: UniverseTable | null;
    private _tableB: UniverseTable | null;

    constructor() {
        this._id = v4();
        this._nameA = "";
        this._nameB = "";
        this._tableA = null;
        this._tableB = null;
    }

    public get id() {
        return this._id;
    }
    public set id(value) {
        this._id = value;
    }

    public get nameA() {
        return this._nameA;
    }
    public set nameA(value) {
        this._nameA = value;
    }

    public get nameB() {
        return this._nameB;
    }
    public set nameB(value) {
        this._nameB = value;
    }

    public get tableA() {
        return this._tableA;
    }
    public set tableA(value) {
        this._tableA = value;
    }

    public get tableB() {
        return this._tableB;
    }
    public set tableB(value) {
        this._tableB = value;
    }

    public get data() {
        return {
            id: this.id,
            nameA: this.nameA,
            nameB: this.nameB,
            tableAId: this.tableA?.id,
            tableBId: this.tableB?.id
        } as IUniverseJoinAttributes;
    }
}