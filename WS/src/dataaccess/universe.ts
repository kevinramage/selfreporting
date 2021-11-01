import { Model } from "sequelize";
import { Optional } from "sequelize/types";
import { BusinessObjectModel } from "./businessObject";
import { ConnectionModel } from "./connection";
import { UniverseTableModel } from "./universeTable";

export interface IUniverseAttribute {
    id: string;
    name: string;
    description: string;
    objects ?: BusinessObjectModel[];
    tables ?: UniverseTableModel[];
    connection ?: ConnectionModel;
}

interface IVersionCreationAttributes extends Optional<IUniverseAttribute, "id"> {};

export class UniverseModel extends Model<IUniverseAttribute, IVersionCreationAttributes>
  implements IUniverseAttribute {
  public id!: string;
  public name!: string;
  public description!: string;
  public readonly objects ?: BusinessObjectModel[];
  public readonly tables ?: UniverseTableModel[];
  public readonly connection ?: ConnectionModel;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}