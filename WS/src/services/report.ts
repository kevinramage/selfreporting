import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Report } from "../business/core/report";
import { IReportAttribute } from "../dataaccess/report";
import { IReportWebService } from "../types/report";
import { BaseService } from "./base";

export class ReportService extends BaseService {

    public static getReports(req: Request, res: Response) {
        return new Promise<void>((resolve) => {
            Report.getReports().then((data) => {
                ReportService.sendData(res, data);
                resolve();
            }).catch((err) => {
                ReportService.sendInternalError(res, err);
                resolve();
            });
        });
    }

    public static getReport(req: Request, res: Response) {
        return new Promise<void>((resolve) => {
            const errors = validationResult(req);
            if (errors.isEmpty()) {
                Report.getReport(req.params.repId).then((data) => {
                    if (data) {
                        ReportService.sendData(res, data);
                    } else {
                        ReportService.sendResourceNotFound(res);
                    }
                    resolve();
                }).catch((err) => {
                    ReportService.sendInternalError(res, err);
                    resolve();
                });
            } else {
                ReportService.sendInvalidRequest(res, errors);
            }
        });
    }

    public static createReport(req: Request, res: Response) {
        return new Promise<void>((resolve) => {
            const errors = validationResult(req);
            if (errors.isEmpty()) {
                Report.create(req.body as IReportWebService).then((data) => {
                    ReportService.sendDataCreated(res, data);
                    resolve();
                }).catch((err) => {
                    ReportService.sendInternalError(res, err);
                    resolve();
                });
            } else {
                ReportService.sendInvalidRequest(res, errors);
            }
        });
    }

    public static updateReport(req: Request, res: Response) {
        return new Promise<void>((resolve) => {
            Report.update(req.params.repId, req.body as IReportAttribute).then((data) => {
                if (data) {
                    ReportService.sendData(res, data);
                    resolve();
                } else {
                    ReportService.sendResourceNotFound(res);
                    resolve();
                }
            }).catch((err) => {
                ReportService.sendInternalError(res, err);
                resolve();
            });
        });
    }

    public static executeReport(req: Request, res: Response) {
        return new Promise<void>((resolve) => {
            const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : 10;
            const offset = req.query.offset ? Number.parseInt(req.query.offset as string) : 0;
            Report.executeRequest(req.params.repId,  limit, offset).then((data) => {
                if (data) {
                    ReportService.sendData(res, data);
                    resolve();
                } else {
                    ReportService.sendResourceNotFound(res);
                    resolve();
                }
            }).catch((err) => {
                ReportService.sendInternalError(res, err);
                resolve();
            });
        });
    }
}