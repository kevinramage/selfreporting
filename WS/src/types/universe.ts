import { ICoreObjectWebService } from "./coreObject";
import { IUniverseObject } from "./universeObject";
import { IUniverseTable } from "./universeTable";

export interface IUniverse extends ICoreObjectWebService {
    tables: IUniverseTable[];
    objects: IUniverseObject[];
}