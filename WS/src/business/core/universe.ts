import winston from "winston";
import { BusinessObjectModel, BUSINESSOBJECT_TYPE } from "../../dataaccess/businessObject";
import { IUniverseAttribute, UniverseModel } from "../../dataaccess/universe";
import { UniverseColumnModel } from "../../dataaccess/universeColumn";
import { UniverseTableModel } from "../../dataaccess/universeTable";
import { CoreObject } from "./coreObject";
import { BusinessLayer } from "./universeObjects/businessLayer";
import { DataLayer } from "./universeObjects/dataLayer";
import { Version } from "./version";
import { IUniverse } from "../../types/universe"
import { ICoreObjectWebService } from "../../types/coreObject";
import { IUniverseColumn } from "../../types/universeColumn";
import { IUniverseTable } from "../../types/universeTable";
import { IUniverseClass } from "../../types/universeClass";
import { IUniverseDimension } from "../../types/universeDimension";
import { IUniverseMetric } from "../../types/universeMetric";
import { IUniverseObject } from "../../types/universeObject";
import { format } from "util";
import { ConnectionModel } from "../../dataaccess/connection";
import { UniverseJoin } from "./universeObjects/universeJoin";
import { UniverseJoinModel } from "../../dataaccess/universeJoint";

export class Universe extends CoreObject {
    private _version: Version;
    private _businessLayer: BusinessLayer;
    private _dataLayer: DataLayer;

    constructor() {
        super();
        this._version = new Version();
        this._businessLayer = new BusinessLayer();
        this._dataLayer = new DataLayer();
    }

    public async create() {
        return new Promise<void>((resolve, reject) => {
            UniverseModel.create(this.data, {include: [
                { model: UniverseTableModel, as: "tables", include: [
                    { model: UniverseColumnModel, as: "columns" }
                ]},
                { model: UniverseJoinModel, as: "joins", include: [
                    { model: UniverseTableModel, as: "tableA" },
                    { model: UniverseTableModel, as: "tableB" }
                ]},
                { model: ConnectionModel, as: "connection" },
                { model: BusinessObjectModel, as: "objects", include: [
                    { model: BusinessObjectModel, as: "subObjects" }
                ]}
            ]}).then(() => {
                resolve();
            }).catch((err) => {
                reject(err);
            })
        });
    }

    public static getUniverses() {
        return new Promise<ICoreObjectWebService[]>((resolve, reject) => {
            UniverseModel.findAll({ limit: 20 }).then((universes) => {
                const data = universes.map(u => {
                    return {
                        id: u.id,
                        name: u.name,
                        description: u.description
                    } as ICoreObjectWebService
                })
                resolve(data);
            }).catch((err) => {
                winston.error("Universe.getUniverses - Internal error: ", err);
                reject(err);
            });
        });
    }

    public static getUniverse(id: string) {
        return new Promise<IUniverse|null>((resolve, reject) => {
            UniverseModel.findByPk(id, { include: [
                { model: UniverseTableModel, as: "tables", include: [
                    { model: UniverseColumnModel, as: "columns" }
                ]},
                { model: UniverseJoinModel, as: "joins", include: [
                    { model: UniverseTableModel, as: "tableA" },
                    { model: UniverseTableModel, as: "tableB" }
                ]},
                { model: BusinessObjectModel, as: "objects", include: [
                    { model: BusinessObjectModel, as: "subObjects" }
                ]}
            ]}).then((universe) => {
                let data = Universe.convertUniverse(universe);
                resolve(data);
            }).catch((err) => {
                winston.error("Universe.getUniverses - Internal error: ", err);
                reject(err);
            });
        });
    }

    private static convertUniverse(unv: UniverseModel | null) {
        let universe : IUniverse | null = null;
        
        if (unv) {
            universe = {
                id: unv.id,
                name: unv.name,
                description: unv.description,
                tables: Universe.convertTables(unv.tables),
                objects: Universe.convertBusinessObjects(unv.objects)
            }
        }

        return universe;
    }

    private static convertTables(tbs: UniverseTableModel[] | undefined) {
        const tables : IUniverseTable[] = [];
        if (tbs) {
            tbs.map(t => { 
                return {
                    id: t.id,
                    name: t.name,
                    description: t.description,
                    columns: Universe.convertColumns(t.columns)
                } as IUniverseTable;
            });
        }
        return tables;
    }

    private static convertColumns(cols: UniverseColumnModel[] | undefined) {
        let columns : IUniverseColumn[] = [];
        if (cols) {
            columns = cols.map(c => {
                return {
                    id: c.id,
                    name: c.name,
                    type: c.type
                } as IUniverseColumn;
            });
        }
        return columns;
    }

    private static convertBusinessObjects(objs: BusinessObjectModel[] | undefined) {
        let objects : IUniverseObject[] = [];

        if (objs) {
            objects = objs.map(o => {
                switch (o.objectType) {
                    case BUSINESSOBJECT_TYPE.CLASS:
                        return Universe.convertClassObject(o);
                    case BUSINESSOBJECT_TYPE.DIMENSION:
                        return Universe.convertDimensionObject(o);
                    case BUSINESSOBJECT_TYPE.METRIC:
                        return Universe.convertMetricObject(o);
                    default:
                        throw new Error(format("Invalid type: %s for object %s", o.objectType, o.name));
                }
            });
        }

        return objects;
    }

    private static convertClassObject(cls: BusinessObjectModel) {
        return {
            id: cls.id,
            objectType: cls.objectType,
            name: cls.name,
            description: cls.description,
            subObjects: Universe.convertBusinessObjects(cls.subObjects)
        } as IUniverseClass;
    }

    private static convertDimensionObject(cls: BusinessObjectModel) {
        return {
            id: cls.id,
            objectType: cls.objectType,
            name: cls.name,
            description: cls.description,
            select: cls.selectStatement,
            where: cls.whereStatement,
            tableName: cls.tableName
        } as IUniverseDimension;
    }

    private static convertMetricObject(cls: BusinessObjectModel) {
        return {
            id: cls.id,
            objectType: cls.objectType,
            name: cls.name,
            description: cls.description,
            select: cls.selectStatement,
            where: cls.whereStatement,
            tableName: cls.tableName
        } as IUniverseMetric;
    }

    public get dataLayer() {
        return this._dataLayer;
    }

    public get businessLayer() {
        return this._businessLayer;
    }

    public get data() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            objects: this.businessLayer.data,
            tables: this.dataLayer.tablesData,
            joins: this.dataLayer.joinsData,
            connection: this.dataLayer.connectionData
        } as IUniverseAttribute
    }
}