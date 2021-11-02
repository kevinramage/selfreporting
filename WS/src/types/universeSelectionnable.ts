import { IUniverseObject } from "./universeObject";

export interface IUniverseSelectionnableWebService extends IUniverseObject {
    objectType: string;
    tableName: string;
    select: string;
    where: string;
    referenceId?: string;
}