import { Model } from "sequelize";
import { Optional } from "sequelize/types";
import { BusinessObjectModel, IBusinessObjectAttribute } from "./businessObject";

export interface IReportRestrictionAttribute {
    id: string;
    operand1 ?: IBusinessObjectAttribute;
    operationType: string;
    operand2Type: string;
    operand2 ?: IBusinessObjectAttribute;
    operand2Constant: string;
}

interface IReportRestrictionCreationAttributes extends Optional<IReportRestrictionAttribute, "id"> {};

export class ReportRestrictionModel extends Model<IReportRestrictionAttribute, IReportRestrictionCreationAttributes>
  implements IReportRestrictionAttribute {
  public id!: string;
  public operand1!: BusinessObjectModel;
  public operationType!: string;
  public operand2Type !: string;
  public operand2 !: BusinessObjectModel;
  public operand2Constant !: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}