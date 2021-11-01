import { IReportComponent } from "./reportComponent";

export interface IReportResult {
    sql: string;
    limit: number;
    offset: number;
    rootComponent : IReportComponent;
    errorMessage: string | null;
}