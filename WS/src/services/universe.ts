import { Request, Response } from "express";
import { Universe } from "../business/core/universe";

export class UniverseService {

    public static getUniverses(req: Request, res: Response) {
        return new Promise<void>((resolve) => {
            Universe.getUniverses().then((data) => {
                res.setHeader("content-type", "application/json");
                res.status(200);
                res.send(data);
                resolve();
            }).catch((err) => {
                resolve();
            });
        });
    }

    public static getUniverse(req: Request, res: Response) {
        return new Promise<void>((resolve) => {
            Universe.getUniverse(req.params.unvId).then((data) => {
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