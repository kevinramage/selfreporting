import { Model } from "sequelize";
import { Optional } from "sequelize/types";

export interface IReportRestrictionAttribute {
    id: string;
    operand1Id: string;
    operationType: string;
    operand2Type: string;
    operand2Id: string;
    operand2Constant: string;
}

interface IReportRestrictionCreationAttributes extends Optional<IReportRestrictionAttribute, "id"> {};

export class ReportRestrictionModel extends Model<IReportRestrictionAttribute, IReportRestrictionCreationAttributes>
  implements IReportRestrictionAttribute {
  public id!: string;
  public operand1Id!: string;
  public operationType!: string;
  public operand2Type !: string;
  public operand2Id !: string;
  public operand2Constant !: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}