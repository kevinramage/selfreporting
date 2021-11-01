import * as winston from "winston";
import { format } from "util";
import { Report } from "../report";
import { IUniverseSelectable } from "../universeObjects/universeSelectable";
import { ReportDataSource } from "./reportDataSource";
import { IReportResult } from "../../../types/reportResult";
import { ConnectionError, CONNECTION_ERROR } from "../../error/connectionError";
import { ReportComponent } from "./reportComponent";
import { RESTRICTIONOPERAND_TYPE, RESTRICTIONOPERATION_TYPE } from "./reportRestriction";
import { UniverseDimension } from "../universeObjects/universeDimension";
import { UniverseObject } from "../universeObjects/universeObject";

export class ReportGenerator {

    public generate(report: Report, limit: number, offset: number) {

        return new Promise<IReportResult>(async (resolve) => {

            // Build result
            const result : IReportResult = {
                limit: limit,
                offset: offset,
                sql: "",
                rootComponent: null,
                errorMessage: null
            };
            
            // Execute query
            result.sql = this.generateQuery(report.dataSource);
            const data = await this.executeQuery(report, result);

            // Update presentation
            if (report.rootComponent) {
                report.rootComponent.inject(data);
                result.rootComponent = ReportComponent.getDataForWS(report.rootComponent)
            }

            resolve(result);

        });
    }

    private generateQuery(dataSource: ReportDataSource) {
        const tableAlias = this.generateTablesAlias(dataSource.objects);
        const selectFields = this.generateSelectFields(dataSource.objects, tableAlias);
        const fromFields = this.generateFromFields(tableAlias);
        const whereStatement = this.generateWhereFields(dataSource);
        const sql = format("SELECT %s FROM %s %s LIMIT 30", selectFields.join(", "), fromFields.join(", "), whereStatement);
        winston.info("ReportGenerator.generateQuery - Execute query: " + sql);
        return sql;
    }

    private executeQuery(report: Report, result: IReportResult) {
        return new Promise<any>(async (resolve) => {
            const connection = this.getConnection(report, result);
            if (connection) {
                try {
                    await connection.connect();
                    const data =  await connection.query(result.sql);
                    connection.disconnect();
                    resolve(data);
                } catch (err) {
                    winston.error("ReportGenerator.executeQuery - Internal error: ", err);
                    result.errorMessage = "ERR_RER_QRY_01 - An error occured during query execution";
                    resolve(null);
                }
            } else {
                resolve(null);
            }
        });
    }

    private getConnection(report: Report, result: IReportResult) {
        let universe = report.universe;
        if (universe) {
            let connection = universe.dataLayer.connection;
            if ( connection ) {
                return connection;
            } else {
                const error = new ConnectionError(CONNECTION_ERROR.UNIVERSE_NOTFOUND.code, CONNECTION_ERROR.UNIVERSE_NOTFOUND.message);
                result.errorMessage = error.message;
                winston.error("ReportGenerator.getConnection - Internal error: ", error);
                return null;
            }
        } else {
            const error = new ConnectionError(CONNECTION_ERROR.UNIVERSE_NOTFOUND.code, CONNECTION_ERROR.UNIVERSE_NOTFOUND.message);
            result.errorMessage = error.message;
            winston.error("ReportGenerator.getConnection - Internal error: ", error);
            return null;
        }
    }

    private generateTablesAlias(objects: IUniverseSelectable[]) {
        const tables : {[key: string]: string} = {};
        const reference = 'a'.charCodeAt(0);
        let index = 0;
        for (var key in objects) {
            const universeObject = objects[key];
            if (!tables[universeObject.tableName]) {
                const alias = String.fromCharCode(reference+index);
                tables[universeObject.tableName] = alias;
            }
        }
        return tables;
    }

    private generateSelectFields(objects: IUniverseSelectable[], tableAlias: {[key: string]: string}) {
        const fields : string[] = [];
        for (var key in objects) {
            const object = objects[key];
            const field = format("%s.%s", tableAlias[object.tableName], object.select);
            fields.push(field);
        }
        return fields;
    }

    private generateFromFields(tableAlias: {[key: string]: string}) {
        const fields : string[] = [];
        const keys = Object.keys(tableAlias);
        for (var index in keys) {
            const key = keys[index];
            const field = format("%s %s", key, tableAlias[key]);
            fields.push(field);
        }
        return fields;
    }

    private generateWhereFields(dataSource: ReportDataSource) {
        let whereStatement = "";
        if (dataSource.restriction) {

            // Constant
            if (dataSource.restriction.operand2Type === RESTRICTIONOPERAND_TYPE.CONSTANT) {
                const operand1 = dataSource.restriction.operand1 as IUniverseSelectable;
                const operation = this.generateOperationFromFields(dataSource.restriction.operationType);
                whereStatement = format("WHERE %s %s '%s'", operand1.select, operation, dataSource.restriction.operand2Constant);

            // Field
            } else if (dataSource.restriction.operand2Type === RESTRICTIONOPERAND_TYPE.FIELD) {
                const operand1 = dataSource.restriction.operand1 as IUniverseSelectable;
                const operand2 = dataSource.restriction.operand2 as IUniverseSelectable;
                const operation = this.generateOperationFromFields(dataSource.restriction.operationType);
                whereStatement = format("WHERE %s %s '%s'", operand1.select, operation, operand2.select);

            } else {
                throw new Error("ReportGeneration.generateWhereFields - Invalid operand type: " + dataSource.restriction.operand2Type);
            }
        }
        return whereStatement;
    }

    private generateOperationFromFields(operation: string) {
        let statement = "";
        switch (operation) {
            case RESTRICTIONOPERATION_TYPE.EQUALS: statement = "="; break;
            case RESTRICTIONOPERATION_TYPE.NOT_EQUALS: statement = "!="; break;
            case RESTRICTIONOPERATION_TYPE.MATCHES: statement = "LIKE"; break;
            case RESTRICTIONOPERATION_TYPE.NOTMATCHES: statement = "NOT LIKE"; break;
            default:
                throw new Error("ReportGenerator.generateOperationFromFields - Invalid type: " + operation);
        }
        return statement;
    }
}