import { ICoreObject } from "./coreObject";
import { IReportComponent } from "./reportComponent";
import { IUniverseSelectionnable } from "./universeSelectionnable";

export interface IReport extends ICoreObject {
    selectFields: IUniverseSelectionnable[];
    rootComponent: IReportComponent;
}