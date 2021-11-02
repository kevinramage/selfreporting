import { Model } from "sequelize";
import { Optional } from "sequelize/types";
import { BusinessObjectModel, IBusinessObjectAttribute } from "./businessObject";
import { IReportComponentAttribute, ReportComponentModel } from "./reportComponent";
import { IReportRestrictionAttribute, ReportRestrictionModel } from "./reportRestriction";
import { UniverseModel } from "./universe";

export interface IReportAttribute {
    id: string;
    name: string;
    description: string;
    universeId ?: string;
    selectFields ?: IBusinessObjectAttribute[];
    universe ?: UniverseModel;
    rootComponent ?: IReportComponentAttribute;
    restriction ?: IReportRestrictionAttribute;
}

interface IReportCreationAttributes extends Optional<IReportAttribute, "id"> {};

export class ReportModel extends Model<IReportAttribute, IReportCreationAttributes>
  implements IReportAttribute {
  public id!: string;
  public name!: string;
  public description!: string;
  public universeId ?: string;
  public selectFields ?: BusinessObjectModel[];
  public readonly universe ?: UniverseModel;
  public readonly rootComponent ?: ReportComponentModel;
  public readonly restriction ?: ReportRestrictionModel;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}