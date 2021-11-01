import { Model } from "sequelize";
import { Optional } from "sequelize/types";

interface IVersionAttribute {
    id: string;
    major: number;
    minor: number;
    build: number;
}

interface IVersionCreationAttributes extends Optional<IVersionAttribute, "id"> {};

export class VersionModel extends Model<IVersionAttribute, IVersionCreationAttributes>
  implements IVersionAttribute {
  public id!: string;
  public major!: number;
  public minor!: number;
  public build!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}