import { Request, Response, Router} from "express";
import { body, param } from "express-validator";
import { ReportService } from "../services/report";

export class ReportRoute {
    public router: Router;

    public constructor() {
      this.router = Router();
      this.router.get("/:repId", 
        param("repId").notEmpty(),
        ReportRoute.getReport);
      this.router.get("/", ReportRoute.getReports);
      this.router.post("/", 
        body("name").notEmpty(),
        body("universeId").notEmpty(),
        ReportRoute.createReport);
      this.router.post("/:repId/execute", ReportRoute.executeReport);
      this.router.put("/:repId", ReportRoute.updateReport);
    }

    public static getReports(req: Request, res: Response) {
        return ReportService.getReports(req, res);
    }

    public static getReport(req: Request, res: Response) {
        ReportService.getReport(req, res);
    }

    public static createReport(req: Request, res: Response) {
        ReportService.createReport(req, res);
    }

    public static updateReport(req: Request, res: Response) {
        ReportService.updateReport(req, res);
    }

    public static executeReport(req: Request, res: Response) {
        ReportService.executeReport(req, res);
    }
}

const reportRoute = new ReportRoute();
export default reportRoute;