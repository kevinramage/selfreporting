import { Report } from "../business/core/report";
import { DataGridColumn, DataGridComponent } from "../business/core/reportObjects/reportComponent";
import { ReportRestriction } from "../business/core/reportObjects/reportRestriction";
import { BusinessObjectModel, BUSINESSOBJECT_TYPE, IBusinessObjectAttribute } from "../dataaccess/businessObject";
import { IReportAttribute, ReportModel } from "../dataaccess/report";
import { ReportDataGridModel } from "../dataaccess/reportDataGrid";
import { ReportDataGridColumnModel } from "../dataaccess/reportDataGridColumn";
import { ReportRestrictionModel } from "../dataaccess/reportRestriction";
import { IReportWebService } from "../types/report";
import { IUniverseSelectionnableWebService } from "../types/universeSelectionnable";
import { BusinessObjectAdapter } from "./businessObject";
import { ReportComponentAdapter } from "./reportComponent";
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

    public static instanciateFromWebService(ws: IReportWebService) {
        let data : IReportAttribute = {
            id: ws.id,
            name: ws.name,
            description: ws.description
        }
        if (ws.universeId) {
            data.universeId = ws.universeId;
        }
        if (ws.selectFields) {
            data.selectFields = ws.selectFields.map(s => { return {
                id: s.id,
                name: s.name,
                description: s.description,
                objectType: s.objectType,
                selectStatement: s.select,
                whereStatement: s.where,
                tableName: s.tableName,
                referenceId: s.referenceId
            }});
        }
        if (ws.rootComponent) {
            data.rootComponent = ReportComponentAdapter.instanciateFromWebService(ws.rootComponent);
        }
        return data;
    }

    public static generateWSFromModel(model: ReportModel) {
        let ws : IReportWebService = {
            id: model.id,
            name: model.name,
            description: model.description
        };
        if (model.universeId) {
            ws.universeId = model.universeId;
        }
        if (model.selectFields) {
            ws.selectFields = model.selectFields.map(s => { return {
                id: s.id,
                name: s.name,
                description: s.description,
                objectType: s.objectType,
                select: s.selectStatement,
                where: s.whereStatement,
                tableName: s.tableName,
                referenceId: s.referenceId
            } as IUniverseSelectionnableWebService});
        }
        if (model.rootComponent) {
            ws.rootComponent = ReportComponentAdapter.generateWSFromModel(model.rootComponent);
        }

        return ws;
    }

    public static updateModel(model: ReportModel, attributes: IReportAttribute) {
        model.name = attributes.name;
        model.description = attributes.description;
        
        // Universe (create/update, delete)
        /*
        if (attributes.universe) {
            model.universeId = attributes.universeId;
        } else if (!model.universe) {
            model.universeId = undefined;
        }
        */

        // SelectFields (Update, create)
        if (model.selectFields && attributes.selectFields) {
            model.selectFields = ReportAdapter.updateSelectFieldModel(model.selectFields, attributes.selectFields);
        } else if (attributes.selectFields) {

        } else {
            model.selectFields = undefined;
        }

        // Restriction
    }

    private static updateSelectFieldModel(models: BusinessObjectModel[], attributes: IBusinessObjectAttribute[]) {
        
        const newModels : BusinessObjectModel[] = [];

        // Create and update field
        for (var key in attributes) {
            const attribute = attributes[key];
            const modelLinked = models.find(m => { return m.id === attribute.id; });
            if (!modelLinked) {
                //BusinessObjectAdapter.createModel()
            } else {
                modelLinked.reportId = undefined;
                newModels.push(modelLinked);
                modelLinked.save();
            }
        }

        return newModels;
    }

    private static instanciateDataGridFromModel(model: ReportDataGridModel) {
        const dataGrid = new DataGridComponent();
        model.columns.forEach(c => { 
            const column = ReportAdapter.instanciateDataGridColumnFromModel(c);
            dataGrid.addColumn(column);
            column.order = c.order; 
        });
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