import { IUniverseSelectionnable } from "./universeSelectionnable";

export interface IUniverseMetric extends IUniverseSelectionnable{
    tableName: string;
    select: string;
    where: string;
}