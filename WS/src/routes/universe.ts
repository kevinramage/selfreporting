import { Request, Response, Router} from "express";
import { UniverseService } from "../services/universe";

export class UniverseRoute {
    public router: Router;

    public constructor() {
      this.router = Router();
      this.router.get("/:unvId", UniverseRoute.getUniverse);
      this.router.get("/", UniverseRoute.getUniverses);
    }

    public static getUniverses(req: Request, res: Response) {
        console.info("GetUniverses");
        return UniverseService.getUniverses(req, res);
    }

    public static getUniverse(req: Request, res: Response) {
        UniverseService.getUniverse(req, res);
    }
}

const universeRoute = new UniverseRoute();
export default universeRoute;