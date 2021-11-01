export interface IReportComponent { 
    type: string;
    root : IDataGrid;
}

export interface IDataGrid {
    columns: IDataGridColumn[];
    rows: any[];
    pageSize: number;
    rowPerPage: number; 
}

export interface IDataGridColumn {
    fieldName: string;
    headerName: string;
    description: string;
    width: number;
}

export module COMPONENT_TYPE {
    export const DATAGRID = "DATAGRID";
}