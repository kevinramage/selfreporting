
import { ICoreObjectWebService } from "./coreObject";
import { IReportComponentWebService } from "./reportComponent";
import { IUniverseSelectionnableWebService } from "./universeSelectionnable";

export interface IReportWebService extends ICoreObjectWebService {
    universeId ?: string;
    selectFields ?: IUniverseSelectionnableWebService[];
    rootComponent ?: IReportComponentWebService;
}