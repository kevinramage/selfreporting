import { Request, Response, Router} from "express";
import { ReportService } from "../services/report";

export class ReportRoute {
    public router: Router;

    public constructor() {
      this.router = Router();
      this.router.get("/:repId", ReportRoute.getReport);
      this.router.get("/", ReportRoute.getReports);
      this.router.post("/:repId/execute", ReportRoute.executeReport);
    }

    public static getReports(req: Request, res: Response) {
        return ReportService.getReports(req, res);
    }

    public static getReport(req: Request, res: Response) {
        ReportService.getReport(req, res);
    }

    public static executeReport(req: Request, res: Response) {
        ReportService.executeReport(req, res);
    }
}

const reportRoute = new ReportRoute();
export default reportRoute;