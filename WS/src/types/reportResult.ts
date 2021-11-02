import { IReportComponentWebService } from "./reportComponent";

export interface IReportResult {
    sql: string;
    limit: number;
    offset: number;
    rootComponent : IReportComponentWebService | null;
    errorMessage: string | null;
}