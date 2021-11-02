export interface IReportComponentWebService {
    id: string;
    type: string;
    root : IDataGridWebService;
}

export interface IDataGridWebService {
    id : string;
    columns: IDataGridColumnWebService[];
    rows?: any[];
    pageSize?: number;
    rowPerPage: number; 
}

export interface IDataGridColumnWebService {
    id : string;
    fieldName: string;
    headerName: string;
    description: string;
    width: number;
    order: number;
}

export module COMPONENT_TYPE {
    export const DATAGRID = "DATAGRID";
}