import { Model } from "sequelize";
import { Optional } from "sequelize/types";

interface IConnectionAttribute {
    id: string;
    name: string;
    description: string;
    host: string;
    username: string;
    password: string;
    database: string;
    universeId: string;
}

interface IVersionCreationAttributes extends Optional<IConnectionAttribute, "id"> {};

export class ConnectionModel extends Model<IConnectionAttribute, IVersionCreationAttributes>
  implements IConnectionAttribute {
  public id!: string;
  public name!: string;
  public description!: string;
  public host!: string;
  public username!: string;
  public password!: string;
  public database!: string;
  public universeId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}