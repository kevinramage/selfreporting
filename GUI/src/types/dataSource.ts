import { IDataSourceElement } from "./dataSourceElement";

export interface IDataSource {
    name: string;
    elements: IDataSourceElement[];
    data: any[];
}