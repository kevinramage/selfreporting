import { ICoreObject } from "./coreObject";
import { IUniverseColumn } from "./universeColumn";

export interface IUniverseTable extends ICoreObject {
    columns: IUniverseColumn[];
}