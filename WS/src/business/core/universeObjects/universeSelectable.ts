import { IBusinessObjectAttribute } from "../../../dataaccess/businessObject";

export interface IUniverseSelectable {
    id: string;
    select: string;
    where: string;
    tableName: string;
    referenceId: string;
    data: IBusinessObjectAttribute;

    clone() : IUniverseSelectable;
}