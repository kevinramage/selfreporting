import { Model } from "sequelize";
import { Optional } from "sequelize/types";
import { BusinessObjectModel } from "./businessObject";
/*
export interface IBusinessLayer {
    id: string;
    universeId: string;
    objects ?: BusinessObjectModel[];
}

interface IBusinessLayerCreationAttributes extends Optional<IBusinessLayer, "id"> {};

export class BusinessLayerModel extends Model<IBusinessLayer, IBusinessLayerCreationAttributes>
  implements IBusinessLayer {
  public id!: string;
  public universeId!: string;

  public readonly objects ?: BusinessObjectModel[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
*/