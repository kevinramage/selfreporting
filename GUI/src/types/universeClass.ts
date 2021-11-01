import { IUniverseObject } from "./universeObject";

export interface IUniverseClass extends IUniverseObject {
    subObjects: IUniverseObject[];
    isOpen: boolean;
}