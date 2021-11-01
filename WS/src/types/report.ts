import { ICoreObject } from "./coreObject";
import { IUniverseSelectionnable } from "./universeSelectionnable";

export interface IReport extends ICoreObject {
    selectFields: IUniverseSelectionnable[];
}