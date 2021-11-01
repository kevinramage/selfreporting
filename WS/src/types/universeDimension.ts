import { IUniverseSelectionnable } from "./universeSelectionnable";

export interface IUniverseDimension extends IUniverseSelectionnable {
    tableName: string;
    select: string;
    where: string;
}