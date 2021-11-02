import * as winston from "winston";
import { BusinessObjectModel } from "../../dataaccess/businessObject";
import { IReportAttribute, ReportModel } from "../../dataaccess/report";
import { CoreObject } from "./coreObject";
import { ReportDataSource } from "./reportObjects/reportDataSource";
import { Universe } from "./universe";
import { IReportWebService } from "../../types/report";
import { IReportResult } from "../../types/reportResult";
import { UniverseModel } from "../../dataaccess/universe";
import { ReportGenerator } from "./reportObjects/reportGenerator";
import { ConnectionModel } from "../../dataaccess/connection";
import { ReportComponent } from "./reportObjects/reportComponent";
import { ReportDataGridModel } from "../../dataaccess/reportDataGrid";
import { ReportComponentModel } from "../../dataaccess/reportComponent";
import { ReportDataGridColumnModel } from "../../dataaccess/reportDataGridColumn";
import { ReportAdapter } from "../../adapters/report";
import { IReportRestrictionAttribute, ReportRestrictionModel } from "../../dataaccess/reportRestriction";
import { UniverseJoinModel } from "../../dataaccess/universeJoint";
import { UniverseTableModel } from "../../dataaccess/universeTable";
import { ICoreObjectWebService } from "../../types/coreObject";
import { v4 } from "uuid";

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

    public static getReports() {
        winston.debug("Report.getReports");
        return new Promise<ICoreObjectWebService[]>((resolve, reject) => {
            ReportModel.findAll({ limit: 20 }).then((universes) => {
                const data = universes.map(u => {
                    return {
                        id: u.id,
                        name: u.name,
                        description: u.description
                    } as ICoreObjectWebService
                })
                resolve(data);
            }).catch((err) => {
                winston.error("Report.getReports - Internal error: ", err);
                reject(err);
            });
        });
    }

    public static getReport(id: string) {
        winston.debug("Report.getReport - Id: " + id);
        return new Promise<IReportWebService|null>((resolve, reject) => {
            ReportModel.findByPk(id, { include: [
                { model: BusinessObjectModel, as: "selectFields" },
                { model: ReportComponentModel, as: "rootComponent", include: [
                    { model: ReportDataGridModel, as: "dataGrid", include: [
                        { model: ReportDataGridColumnModel, as: "columns" }
                    ]}
                ] },
                { model: ReportRestrictionModel, as: "restriction", include: [
                    { model: BusinessObjectModel, as: "operand1" },
                    { model: BusinessObjectModel, as: "operand2"}
                ]}
            ]}).then((report) => {
                if (report) {
                    resolve(ReportAdapter.generateWSFromModel(report));
                } else {
                    resolve(null);
                }
            }).catch((err) => {
                winston.error("Universe.getUniverses - Internal error: ", err);
                reject(err);
            });
        });
    }

    public static create(dataWS: IReportWebService) {
        winston.debug("Report.create");
        return new Promise<ReportModel>((resolve, reject) => {

            // Generate unique identifiers
            dataWS.id = v4();
            if (dataWS.selectFields) {
                dataWS.selectFields.forEach(s => { return s.id = v4(); })
            }
            if (dataWS.rootComponent) {
                dataWS.rootComponent.id = v4();
                dataWS.rootComponent.root.id = v4();
                dataWS.rootComponent.root.columns.forEach(c => { return c.id = v4(); })
            }

            // Instanciate model from request body
            const data = ReportAdapter.instanciateFromWebService(dataWS);

            // Send query to database
            ReportModel.create(data, {include: [
                { model: BusinessObjectModel, as: "selectFields"}
            ]}).then((reportData) => {
                resolve(reportData);
            }).catch((err) => {
                winston.error("Report.create - Internal error: ", err);
                reject(err);
            });
        });
    }

    public create2() {
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

    public static update(id: string, data: IReportAttribute) {
        winston.debug("Report.update - Id: " + id);
        return new Promise<IReportAttribute|null>((resolve, reject) => {
            ReportModel.findByPk(id, { include: [
                { model: BusinessObjectModel, as: "selectFields" },
                { model: ReportComponentModel, as: "rootComponent", include: [
                    { model: ReportDataGridModel, as: "dataGrid", include: [
                        { model: ReportDataGridColumnModel, as: "columns" }
                    ]}
                ] },
                { model: ReportRestrictionModel, as: "restriction", include: [
                    { model: BusinessObjectModel, as: "operand1" },
                    { model: BusinessObjectModel, as: "operand2"}
                ]}
            ]}).then((report) => {
                if (report) {
                    ReportAdapter.updateModel(report, data);
                    report.save({}).then((newReport) => {
                        if (newReport.selectFields && newReport.selectFields.length > 0) {
                            newReport.selectFields[0].reportId = undefined;
                            newReport.selectFields[0].save().then(() => {
                                resolve(null);
                            })
                        }
                        else {
                            resolve(null);
                        }
                    }).catch((err) => {
                        winston.error("Report.update - Internal error: ", err);
                        reject(err);
                    });
                } else {
                    resolve(null);
                }
            }).catch((err) => {
                winston.error("Report.update - Internal error: ", err);
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
                where: f.whereStatement,
                referenceId: f.referenceId
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