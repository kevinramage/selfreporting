import { Model } from "sequelize";
import { Optional } from "sequelize/types";
import { IReportDataGridColumnAttribute, ReportDataGridColumnModel } from "./reportDataGridColumn";

export interface IReportDataGridAttribute {
    id: string;
    rowPerPage: number;
    columns?: IReportDataGridColumnAttribute[];
}

interface IReportDataGridCreationAttributes extends Optional<IReportDataGridAttribute, "id"> {};

export class ReportDataGridModel extends Model<IReportDataGridAttribute, IReportDataGridCreationAttributes>
  implements IReportDataGridAttribute {
  public id!: string;
  public rowPerPage!: number;

  public readonly columns!: ReportDataGridColumnModel[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}