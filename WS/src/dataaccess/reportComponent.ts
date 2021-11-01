import { Model } from "sequelize";
import { Optional } from "sequelize/types";
import { IReportDataGridAttribute, ReportDataGridModel } from "./reportDataGrid";

export interface IReportComponentAttribute {
    id: string;
    dataGridId?: string;
    dataGrid ?: IReportDataGridAttribute;
}

interface IReportComponentCreationAttributes extends Optional<IReportComponentAttribute, "id"> {};

export class ReportComponentModel extends Model<IReportComponentAttribute, IReportComponentCreationAttributes>
  implements IReportComponentAttribute {
  public id!: string;

  public readonly dataGridId!: string;
  public readonly dataGrid!: ReportDataGridModel;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}