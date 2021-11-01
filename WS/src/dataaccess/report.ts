import { Model } from "sequelize";
import { Optional } from "sequelize/types";
import { BusinessObjectModel, IBusinessObjectAttribute } from "./businessObject";
import { IReportComponentAttribute, ReportComponentModel } from "./reportComponent";
import { UniverseModel } from "./universe";

export interface IReportAttribute {
    id: string;
    name: string;
    description: string;
    universeId ?: string;
    selectFields ?: IBusinessObjectAttribute[];
    universe ?: UniverseModel;
    rootComponent ?: IReportComponentAttribute;
}

interface IReportCreationAttributes extends Optional<IReportAttribute, "id"> {};

export class ReportModel extends Model<IReportAttribute, IReportCreationAttributes>
  implements IReportAttribute {
  public id!: string;
  public name!: string;
  public description!: string;
  public universeId ?: string;
  public readonly selectFields ?: BusinessObjectModel[];
  public readonly universe ?: UniverseModel;
  public readonly rootComponent ?: ReportComponentModel;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}