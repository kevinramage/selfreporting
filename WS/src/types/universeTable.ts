import { ICoreObjectWebService } from "./coreObject";
import { IUniverseColumn } from "./universeColumn";

export interface IUniverseTable extends ICoreObjectWebService {
    columns: IUniverseColumn[];
}