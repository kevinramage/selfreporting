import * as winston from "winston";
import { ICoreObject } from "../../types/coreObject";
import { BusinessObjectModel } from "../../dataaccess/businessObject";
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
import { ReportComponent } from "./reportObjects/reportComponent";
import { ReportDataGridModel } from "../../dataaccess/reportDataGrid";
import { ReportComponentModel } from "../../dataaccess/reportComponent";
import { ReportDataGridColumnModel } from "../../dataaccess/reportDataGridColumn";
import { ReportAdapter } from "../../adapters/report";
import { IReportRestrictionAttribute, ReportRestrictionModel } from "../../dataaccess/reportRestriction";
import { UniverseJoin } from "./universeObjects/universeJoin";
import { UniverseJoinModel } from "../../dataaccess/universeJoint";
import { UniverseTableModel } from "../../dataaccess/universeTable";

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
                ]},
                { model: ReportRestrictionModel, as: "restriction", include: [
                    { model: BusinessObjectModel, as: "operand1" },
                    { model: BusinessObjectModel, as: "operand2"}
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
                { model: BusinessObjectModel, as: "selectFields" },
                { model: ReportComponentModel, as: "rootComponent", include: [
                    { model: ReportDataGridModel, as: "dataGrid", include: [
                        { model: ReportDataGridColumnModel, as: "columns" }
                    ]}
                ] }
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
                columns: dataGrid.columns.sort((a,b) => { return (a.order-b.order); })
                    .map(c => {
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
                    { model: ConnectionModel, as: "connection" },
                    { model: UniverseJoinModel, as: "joins", include: [
                        { model: UniverseTableModel, as: "tableA"},
                        { model: UniverseTableModel, as: "tableB"},
                    ] }
                ]}, 
                { model: BusinessObjectModel, as: "selectFields" },
                { model: ReportRestrictionModel, as: "restriction", include: [
                    { model: BusinessObjectModel, as: "operand1"},
                    { model: BusinessObjectModel, as: "operand2"},
                ]},
                { model: ReportComponentModel, as: "rootComponent", include: [
                    { model: ReportDataGridModel, as: "dataGrid", include: [
                        { model: ReportDataGridColumnModel, as: "columns" }
                    ]}
                ] }
            ]}).then((reportModel) => {
                if (reportModel) {
                    const report = ReportAdapter.instanciateFromModel(reportModel);
                    const reportGenerator = new ReportGenerator();
                    reportGenerator.generate(report, report.universe as Universe, limit, offset).then((result) => {
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
        if (this.dataSource.restriction) {
            data.restriction = this.dataSource.dataRestriction as IReportRestrictionAttribute;
        }
        return data;
    }
}