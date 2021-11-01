import * as winston from "winston";
import { ICoreObject } from "../../types/coreObject";
import { BusinessObjectModel, BUSINESSOBJECT_TYPE } from "../../dataaccess/businessObject";
import { IReportAttribute, ReportModel } from "../../dataaccess/report";
import { CoreObject } from "./coreObject";
import { ReportDataSource } from "./reportObjects/reportDataSource";
import { Universe } from "./universe";
import { IReport } from "../../types/report";
import { IReportResult } from "../../types/reportResult";
import { IUniverseSelectionnable } from "../../types/universeSelectionnable";
import { UniverseModel } from "../../dataaccess/universe";
import { ReportGenerator } from "./reportObjects/reportGenerator";
import { ConnectionModel } from "../../dataaccess/connection";
import { UniverseDimension } from "./universeObjects/universeDimension";
import { UniverseMetric } from "./universeObjects/universeMetric";
import { DataGridColumn, DataGridComponent, ReportComponent } from "./reportObjects/reportComponent";
import { ReportDataGridModel } from "../../dataaccess/reportDataGrid";
import { ReportComponentModel } from "../../dataaccess/reportComponent";
import { ReportDataGridColumnModel } from "../../dataaccess/reportDataGridColumn";

export class Report extends CoreObject {
    private _dataSource : ReportDataSource;
    private _universe : Universe | null;
    private _rootComponent : ReportComponent | null;

    constructor(name: string) {
        super();
        this.name = name;
        this._dataSource = new ReportDataSource();
        this._universe = null;
        this._rootComponent = null;
    }

    public create() {
        return new Promise<void>((resolve, reject) => {
            ReportModel.create(this.data, { include: [
                { model: BusinessObjectModel, as: "selectFields"},
                { model: ReportComponentModel, as: "rootComponent", include: [
                    { model: ReportDataGridModel, as: "dataGrid", include: [
                        { model: ReportDataGridColumnModel, as: "columns" }
                    ]}
                ]}
            ]}).then(() => {
                resolve();
            }).catch((err) => {
                reject(err);
            })
        });
    }

    public static getReports() {
        return new Promise<ICoreObject[]>((resolve, reject) => {
            ReportModel.findAll({ limit: 20 }).then((universes) => {
                const data = universes.map(u => {
                    return {
                        id: u.id,
                        name: u.name,
                        description: u.description
                    } as ICoreObject
                })
                resolve(data);
            }).catch((err) => {
                winston.error("Report.getReports - Internal error: ", err);
                reject(err);
            });
        });
    }

    public static getReport(id: string) {
        return new Promise<IReport|null>((resolve, reject) => {
            ReportModel.findByPk(id, { include: [
                { model: BusinessObjectModel, as: "selectFields" }
            ]}).then((report) => {
                let data : IReport | null = null;
                if (report) {
                    let fields : IUniverseSelectionnable[] = [];
                    if (report.selectFields) {
                        fields = Report.getBusinessObject(report.selectFields);
                    }
                    data = {
                        id: report.id,
                        name: report.name,
                        description: report.description,
                        selectFields: fields
                    }
                }
                resolve(data);
            }).catch((err) => {
                winston.error("Universe.getUniverses - Internal error: ", err);
                reject(err);
            });
        });
    }

    private static getBusinessObject(selectFields: BusinessObjectModel[]) {
        return selectFields.map(f => {
            return {
                id: f.id,
                name: f.name,
                description: f.description,
                objectType: f.objectType,
                tableName: f.tableName,
                select: f.selectStatement,
                where: f.whereStatement
            }
        })
    }

    private static getRootComponent(rootComponent?: ReportComponentModel) {
        let data : any = {};
        if (rootComponent) {
            if (rootComponent.dataGrid) {
                data = Report.getDataGridComponent(rootComponent.dataGrid);
            } else {
                winston.error("Report.getRootComponent - Component type unknown");
                throw new Error("Report.getRootComponent - Component type unknown");
            }
        }
        return data;
    }

    private static getDataGridComponent(dataGrid: ReportDataGridModel) {
        return {
            type: "DATAGRID",
            root: {
                columns: dataGrid.columns.map(c => {
                    return {
                        fieldName: c.fieldName,
                        headerName: c.headerName,
                        description: c.description,
                        width: c.width
                    }
                }),
                rowPerPage: dataGrid.rowPerPage
            }
        }
    }

    public static executeRequest(id: string, limit: number, offset: number) {
        return new Promise<IReportResult|null>((resolve, reject) => {
            ReportModel.findByPk(id, { include: [
                { model: UniverseModel, as: "universe", include: [
                    { model: ConnectionModel, as: "connection" }
                ]}, 
                { model: BusinessObjectModel, as: "selectFields" },
                { model: ReportComponentModel, as: "rootComponent", include: [
                    { model: ReportDataGridModel, as: "dataGrid", include: [
                        { model: ReportDataGridColumnModel, as: "columns" }
                    ]}
                ] }
            ]}).then((reportModel) => {
                if (reportModel) {
                    const report = Report.instanciateFromModel(reportModel);
                    const reportGenerator = new ReportGenerator();
                    reportGenerator.generate(report, limit, offset).then((result) => {
                        resolve(result);
                    }).catch((err) => {
                        resolve(null); ///TODO ?
                    });
                } else {
                    resolve(null);
                }
            });
        });
    }

    public static instanciateFromModel(model: ReportModel) {
        const report = new Report(model.name);
        report.id = model.id;
        report.description = model.description;
        if (model.universe) {
            report.universe = Universe.instanciateFromModel(model.universe);
        }
        if (model.selectFields) {
            model.selectFields.forEach(f => {
                const object = Report.instanciateFieldFromModel(f);
                report.dataSource.addObject(object);
            });
        }
        if (model.rootComponent) {
            if (model.rootComponent.dataGrid) {
                report.rootComponent = Report.instanciateDataGridFromModel(model.rootComponent.dataGrid);
            } else {
                throw new Error("Report.instanciateFromModel - Type unknown")
            }
        }
        return report;
    }

    private static instanciateFieldFromModel(model: BusinessObjectModel) {
        switch (model.objectType) {
            case BUSINESSOBJECT_TYPE.DIMENSION:
                return UniverseDimension.instanciateFromModel(model);
            case BUSINESSOBJECT_TYPE.METRIC:
                return UniverseMetric.instanciateFromModel(model);
            default:
                throw new Error("Invalid type");
        }
    }

    private static instanciateDataGridFromModel(model: ReportDataGridModel) {
        const dataGrid = new DataGridComponent();
        model.columns.forEach(c => { dataGrid.addColumn(Report.instanciateDataGridColumnFromModel(c)); });
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

    public get dataSource() {
        return this._dataSource;
    }

    public get universe() {
        return this._universe;
    }
    public set universe(value) {
        this._universe = value;
    }

    public get rootComponent() {
        return this._rootComponent;
    }
    public set rootComponent(value) {
        this._rootComponent = value;
    }

    public get data() {
        const data : IReportAttribute = {
            id: this.id,
            name: this.name,
            description: this.description,
            universeId: this.universe?.id || "",
            selectFields: this.dataSource.objects.map(o => {
                return o.data
            })
        }
        if (this.rootComponent) {
            data.rootComponent = ReportComponent.getData(this.rootComponent);
        }
        return data;
    }
}