import { ICoreObject } from "./coreObject";
import { IDataSource } from "./dataSource";
import { IReportComponent } from "./reportComponent";
import { IUniverseSelectionnable } from "./universeSelectionnable";

export interface IReport extends ICoreObject {
    selectFields: IUniverseSelectionnable[];
    rootComponent: IReportComponent | null;
    dataSources: IDataSource[];
}