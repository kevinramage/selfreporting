import { Model } from "sequelize";
import { Optional } from "sequelize/types";
import { BusinessObjectModel, IBusinessObjectAttribute } from "./businessObject";
import { ConnectionModel } from "./connection";
import { IUniverseJoinAttributes, UniverseJoinModel } from "./universeJoint";
import { IUniverseTableAttributes, UniverseTableModel } from "./universeTable";

export interface IUniverseAttribute {
    id: string;
    name: string;
    description: string;
    objects ?: IBusinessObjectAttribute[];
    joins ?: IUniverseJoinAttributes[];
    tables ?: IUniverseTableAttributes[];
    connection ?: ConnectionModel;
}

interface IVersionCreationAttributes extends Optional<IUniverseAttribute, "id"> {};

export class UniverseModel extends Model<IUniverseAttribute, IVersionCreationAttributes>
  implements IUniverseAttribute {
  public id!: string;
  public name!: string;
  public description!: string;
  public readonly objects ?: BusinessObjectModel[];
  public readonly joins ?: UniverseJoinModel[];
  public readonly tables ?: UniverseTableModel[];
  public readonly connection ?: ConnectionModel;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}