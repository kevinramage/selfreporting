import { Model } from "sequelize";
import { Optional } from "sequelize/types";

export interface IBusinessObjectAttribute {
    id: string;
    objectType: string;
    name: string;
    description: string;
    tableName: string;
    selectStatement: string;
    whereStatement: string;
    subObjects ?: IBusinessObjectAttribute[];
    referenceId ?: string;
    linkId ?: string;
    universeId?: string;
    businessObjectId?: string;
    reportId?: string;
}

interface IBusinessObjectCreationAttributes extends Optional<IBusinessObjectAttribute, "id"> {};

export class BusinessObjectModel extends Model<IBusinessObjectAttribute, IBusinessObjectCreationAttributes>
  implements IBusinessObjectAttribute {
  public id!: string;
  public objectType!: string;
  public name!: string;
  public description!: string;
  public tableName!: string;
  public selectStatement!: string;
  public whereStatement!: string;
  public referenceId ?: string;
  public linkId?: string;
  public universeId!: string;
  public businessObjectId!: string;
  public reportId?: string;

  public readonly subObjects ?: BusinessObjectModel[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export module BUSINESSOBJECT_TYPE {
    export const CLASS = "CLASS";
    export const DIMENSION = "DIMENSION";
    export const METRIC = "METRIC";
}