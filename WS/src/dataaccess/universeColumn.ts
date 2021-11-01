import { Model } from "sequelize";
import { Optional } from "sequelize/types";

export interface IUniverseColumn {
    id: string;
    name: string;
    type: string;
    universeTableId: string;
}

interface IUniverseColumnCreationAttributes extends Optional<IUniverseColumn, "id"> {};

export class UniverseColumnModel extends Model<IUniverseColumn, IUniverseColumnCreationAttributes>
  implements IUniverseColumn {
  public id!: string;
  public name!: string;
  public type!: string;
  public universeTableId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}