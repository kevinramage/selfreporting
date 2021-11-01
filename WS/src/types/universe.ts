import { ICoreObject } from "./coreObject";
import { IUniverseObject } from "./universeObject";
import { IUniverseTable } from "./universeTable";

export interface IUniverse extends ICoreObject {
    tables: IUniverseTable[];
    objects: IUniverseObject[];
}