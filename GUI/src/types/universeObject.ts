import { ICoreObject } from "./coreObject";

export interface IUniverseObject extends ICoreObject {
    objectType: string;
    referenceId: string;
    isSelected: boolean;
}