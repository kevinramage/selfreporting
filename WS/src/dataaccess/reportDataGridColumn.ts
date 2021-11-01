import { Model } from "sequelize";
import { Optional } from "sequelize/types";

export interface IReportDataGridColumnAttribute {
    id: string;
    fieldName: string;
    headerName: string;
    description: string;
    width: number;
    order: number;
    reportDataGridModelId ?: string;
}

interface IReportDataGridColumnCreationAttributes extends Optional<IReportDataGridColumnAttribute, "id"> {};

export class ReportDataGridColumnModel extends Model<IReportDataGridColumnAttribute, IReportDataGridColumnCreationAttributes>
  implements IReportDataGridColumnAttribute {
  public id!: string;
  public fieldName!: string;
  public headerName!: string;
  public description!: string;
  public width!: number;
  public order!: number;

  public readonly reportDataGridModelId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}