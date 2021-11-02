import { Request, Response } from "express";
import { Universe } from "../business/core/universe";
import { BaseService } from "./base";

export class UniverseService extends BaseService{

    public static getUniverses(req: Request, res: Response) {
        return new Promise<void>((resolve) => {
            Universe.getUniverses().then((data) => {
                UniverseService.sendData(res, data);
                resolve();
            }).catch((err) => {
                UniverseService.sendInternalError(res, err);
                resolve();
            });
        });
    }

    public static getUniverse(req: Request, res: Response) {
        return new Promise<void>((resolve) => {
            Universe.getUniverse(req.params.unvId).then((data) => {
                if (data) {
                    UniverseService.sendData(res, data);
                } else {
                    UniverseService.sendResourceNotFound(res);
                }
                resolve();
            }).catch((err) => {
                UniverseService.sendInternalError(res, err);
                resolve();
            });
        });
    }
}