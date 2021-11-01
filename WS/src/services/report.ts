import { Request, Response } from "express";
import { Report } from "../business/core/report";

export class ReportService {

    public static getReports(req: Request, res: Response) {
        return new Promise<void>((resolve) => {
            Report.getReports().then((data) => {
                res.setHeader("content-type", "application/json");
                res.status(200);
                res.send(data);
                resolve();
            }).catch((err) => {
                resolve();
            });
        });
    }

    public static getReport(req: Request, res: Response) {
        return new Promise<void>((resolve) => {
            Report.getReport(req.params.repId).then((data) => {
                res.setHeader("content-type", "application/json");
                res.status(200);
                res.send(data);
                resolve();
            }).catch((err) => {
                resolve();
            });
        });
    }

    public static executeReport(req: Request, res: Response) {
        return new Promise<void>((resolve) => {
            const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : 10;
            const offset = req.query.offset ? Number.parseInt(req.query.offset as string) : 0;
            Report.executeRequest(req.params.repId,  limit, offset).then((data) => {
                res.setHeader("content-type", "application/json");
                res.status(200);
                res.send(data);
                resolve();
            }).catch((err) => {
                resolve();
            });
        });
    }
}