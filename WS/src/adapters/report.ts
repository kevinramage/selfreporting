import { Report } from "../business/core/report";
import { DataGridColumn, DataGridComponent } from "../business/core/reportObjects/reportComponent";
import { ReportRestriction } from "../business/core/reportObjects/reportRestriction";
import { BusinessObjectModel, BUSINESSOBJECT_TYPE } from "../dataaccess/businessObject";
import { ReportModel } from "../dataaccess/report";
import { ReportDataGridModel } from "../dataaccess/reportDataGrid";
import { ReportDataGridColumnModel } from "../dataaccess/reportDataGridColumn";
import { ReportRestrictionModel } from "../dataaccess/reportRestriction";
import { BusinessObjectAdapter } from "./businessObject";
import { UniverseAdapter } from "./universe";

export class ReportAdapter {

    public static instanciateFromModel(model: ReportModel) {
        const report = new Report(model.name);
        report.id = model.id;
        report.description = model.description;
        if (model.universe) {
            report.universe = UniverseAdapter.instanciateFromModel(model.universe);
        }
        if (model.selectFields) {
            model.selectFields.forEach(f => {
                const object = BusinessObjectAdapter.instanciateFromModel(f);
                report.dataSource.addObject(object);
            });
        }
        if (model.restriction) {
            report.dataSource.restriction = ReportAdapter.instanciateReportRestrictionFromModel(model.restriction);
        }
        if (model.rootComponent) {
            if (model.rootComponent.dataGrid) {
                report.rootComponent = ReportAdapter.instanciateDataGridFromModel(model.rootComponent.dataGrid);
            } else {
                throw new Error("Report.instanciateFromModel - Type unknown")
            }
        }
        return report;
    }

    private static instanciateDataGridFromModel(model: ReportDataGridModel) {
        const dataGrid = new DataGridComponent();
        model.columns.forEach(c => { dataGrid.addColumn(ReportAdapter.instanciateDataGridColumnFromModel(c)); });
        dataGrid.rowPerPage = model.rowPerPage;
        return dataGrid;
    }

    private static instanciateDataGridColumnFromModel(model: ReportDataGridColumnModel) {
        const dataGridColumn = new DataGridColumn();
        dataGridColumn.fieldName = model.fieldName;
        dataGridColumn.headerName = model.headerName;
        dataGridColumn.description = model.description;
        dataGridColumn.width = model.width;
        return dataGridColumn;
    }

    private static instanciateReportRestrictionFromModel(model: ReportRestrictionModel) {
        const reportRestriction = new ReportRestriction();
        reportRestriction.id = model.id;
        if (model.operand1) {
            reportRestriction.operand1 = BusinessObjectAdapter.instanciateFromModel(model.operand1);
        }
        reportRestriction.operationType = model.operationType;
        reportRestriction.operand2Type = model.operand2Type;
        if (model.operand2) {
            reportRestriction.operand2 = BusinessObjectAdapter.instanciateFromModel(model.operand2);
        }
        reportRestriction.operand2Constant = model.operand2Constant;
        return reportRestriction;
    }
}