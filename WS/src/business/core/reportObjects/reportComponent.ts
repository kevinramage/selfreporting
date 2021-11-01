import { v4 } from "uuid";
import { IReportComponentAttribute } from "../../../dataaccess/reportComponent";

export class ReportComponent {
    protected _id : string;
    protected _type : string;

    constructor() {
        this._id = v4();
        this._type = "";
    }

    public inject(data: any[]) {

    }

    public get id() {
        return this._id;
    }

    public get type() {
        return this._type;
    }
    public set type(value) {
        this._type = value;
    }

    public static getData(component: ReportComponent) {
        let data : IReportComponentAttribute = { id: v4() };
        if (component.type === "DATAGRID") {
            data.dataGrid = (component as DataGridComponent).data;
        }
        return data;
    }

    public static getDataForWS(component: ReportComponent) {
        return {
            type: component.type,
            root: (component as DataGridComponent).data
        }
    }
}

export class DataGridComponent extends ReportComponent {
    private _columns: DataGridColumn[];
    private _rows: any[];
    private _pageSize: number;
    private _rowPerPage: number;

    constructor() {
        super();
        this._type = "DATAGRID";
        this._columns = [];
        this._rows = [];
        this._pageSize = 1;
        this._rowPerPage = 10;
    }

    public inject(data: any[]) {
        this._rows = data;
        this._pageSize = this.rows.length / this.rowPerPage;
        if (this.rows.length % this.rowPerPage > 0) {
            this._pageSize++;
        }
    }

    public addColumn(col: DataGridColumn) {
        col.order = this._columns.length + 1;
        this._columns.push(col);
    }

    public addRow(row: any) {
        this._rows.push(row);
    }

    public get columns() {
        return this._columns;
    }

    public get rows() {
        return this._rows;
    }

    public get pageSize() {
        return this._pageSize;
    }
    public set pageSize(value) {
        this._pageSize = value;
    }

    public get rowPerPage() {
        return this._rowPerPage;
    }
    public set rowPerPage(value) {
        this._rowPerPage = value;
    }

    public get data() {
        const cols = this.columns.map(c => { return c.data })
            .sort((a, b) => { return (a.order - b.order) ? 1 : -1; })
        return {
            id: this.id,
            type: this.type,
            columns: cols,
            rows: this.rows,
            pageSize: this.pageSize,
            rowPerPage: this.rowPerPage
        }
    }
}

export class DataGridColumn {
    private _id: string;
    private _fieldName: string;
    private _headerName: string;
    private _description: string;
    private _width: number;
    private _order: number;

    constructor() {
        this._id = v4();
        this._fieldName = "";
        this._headerName = "";
        this._description = "";
        this._width = 200;
        this._order = 0;
    }

    public get id() {
        return this._id;
    }

    public get fieldName() {
        return this._fieldName;
    }
    public set fieldName(value) {
        this._fieldName = value;
    }

    public get headerName() {
        return this._headerName;
    }
    public set headerName(value) {
        this._headerName = value;
    }

    public get description() {
        return this._description;
    }
    public set description(value) {
        this._description = value;
    }

    public get width() {
        return this._width;
    }
    public set width(value) {
        this._width = value;
    }

    public get order() {
        return this._order;
    }
    public set order(value) {
        this._order = value;
    }

    public get data() {
        return {
            id: this.id,
            fieldName: this.fieldName,
            headerName: this.headerName,
            description: this.description,
            width: this.width,
            order: this.order
        }
    }
}