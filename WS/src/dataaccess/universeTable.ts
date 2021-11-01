import { Model } from "sequelize";
import { Optional } from "sequelize/types";
import { UniverseColumnModel } from "./universeColumn";

export interface IUniverseTable {
    id: string;
    name: string;
    description: string;
    universeId: string;
    columns ?: UniverseColumnModel[];
}

interface IUniverseTableCreationAttributes extends Optional<IUniverseTable, "id"> {};

export class UniverseTableModel extends Model<IUniverseTable, IUniverseTableCreationAttributes>
  implements IUniverseTable {
  public id!: string;
  public name!: string;
  public description!: string;
  public universeId!: string;
  public readonly columns ?: UniverseColumnModel[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}