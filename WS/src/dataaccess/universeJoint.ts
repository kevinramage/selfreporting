import { Model } from "sequelize";
import { Optional } from "sequelize/types";
import { UniverseColumnModel } from "./universeColumn";
import { IUniverseTableAttributes, UniverseTableModel } from "./universeTable";

export interface IUniverseJoinAttributes {
    id: string;
    nameA: string;
    nameB: string;
    tableA ?: IUniverseTableAttributes;
    tableB ?: IUniverseTableAttributes;
    tableAId ?: string;
    tableBId ?: string;
}

interface IUniverseJoinCreationAttributes extends Optional<IUniverseJoinAttributes, "id"> {};

export class UniverseJoinModel extends Model<IUniverseJoinAttributes, IUniverseJoinCreationAttributes>
  implements IUniverseJoinAttributes {
  public id!: string;
  public nameA!: string;
  public nameB!: string;
  public readonly tableA ?: UniverseTableModel;
  public readonly tableB ?: UniverseTableModel;
  public readonly tableAId ?: string;
  public readonly tableBId ?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}