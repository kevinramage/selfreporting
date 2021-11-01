import { Model } from "sequelize";
import { Optional } from "sequelize/types";
import { UniverseTableModel } from "./universeTable";

/*
export interface IDataLayer {
    id: string;
    universeId: string;
    tables ?: UniverseTableModel[];
}

interface IDataLayerCreationAttributes extends Optional<IDataLayer, "id"> {};

export class DataLayerModel extends Model<IDataLayer, IDataLayerCreationAttributes>
  implements IDataLayer {
  public id!: string;
  public universeId!: string;

  public readonly tables ?: UniverseTableModel[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
*/