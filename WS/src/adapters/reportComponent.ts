import { IReportComponentAttribute, ReportComponentModel } from "../dataaccess/reportComponent";
import { IReportDataGridAttribute, ReportDataGridModel } from "../dataaccess/reportDataGrid";
import { IReportDataGridColumnAttribute, ReportDataGridColumnModel } from "../dataaccess/reportDataGridColumn";
import { IDataGridColumnWebService, IDataGridWebService, IReportComponentWebService } from "../types/reportComponent";

export class ReportComponentAdapter {

    public static instanciateFromWebService(ws: IReportComponentWebService) {
        if (ws.type === "DATAGRID") {
            let data : IReportComponentAttribute = {
                id: ws.id,
                dataGrid: ReportComponentAdapter.instanciateDatGridFromWebService(ws.root)
            }
            return data;
        } else {
            throw new Error("instanciateFromWebService - generateWSFromModel - Type unknown");
        }
    }

    public static generateWSFromModel(model: ReportComponentModel) {
        if (model.dataGrid) {
            let ws : IReportComponentWebService = {
                id: model.id,
                type: "DATAGRID",
                root: ReportComponentAdapter.generateDataGridWSFromModel(model.dataGrid)
            }
            return ws;
        } else {
            throw new Error("generateWSFromModel - Type unknown");
        }
    }

    private static instanciateDatGridFromWebService(ws: IDataGridWebService) {
        let data : IReportDataGridAttribute = {
            id: ws.id,
            rowPerPage: ws.rowPerPage,
            columns: ws.columns.map(c => { return ReportComponentAdapter.instanciateDataGridColumnFromWebService(c); })
        }
        return data;
    }

    private static generateDataGridWSFromModel(model: ReportDataGridModel) {
        let ws : IDataGridWebService = {
            id: model.id,
            rowPerPage: model.rowPerPage,
            columns: model.columns.map(c => { return ReportComponentAdapter.generateDataGridColumnWSFromModel(c); })
        };
        return ws;
    }

    private static instanciateDataGridColumnFromWebService(ws: IDataGridColumnWebService) {
        let data : IReportDataGridColumnAttribute = {
            id: ws.id,
            fieldName: ws.fieldName,
            headerName: ws.headerName,
            description: ws.description,
            width: ws.width,
            order: ws.order
        }
        return data;
    }

    private static generateDataGridColumnWSFromModel(model: ReportDataGridColumnModel) {
        let ws : IDataGridColumnWebService = {
            id: model.id,
            fieldName: model.fieldName,
            headerName: model.headerName,
            description: model.description,
            width: model.width,
            order: model.order
        };
        return ws;
    }   
}