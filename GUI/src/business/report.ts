import axios, {AxiosResponse} from 'axios';
import { format } from "util";
import { IReport } from "../types/report";
import { IReportResult } from '../types/reportResult';

export class ReportService {

    /**
     * Load all report available
     * @returns all report available
     */
    public static loadAll() {
        return new Promise<IReport>((resolve, reject) => {
            axios.get("http://localhost:7000/report").then((resp: AxiosResponse) => {
                resolve(resp.data.data as IReport);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    /**
     * Load report from its id
     * @returns report infos
     */
     public static load(reportId: string) {
        return new Promise<IReport>((resolve, reject) => {
            const url = format("http://localhost:7000/report/%s", reportId);
            axios.get(url).then((resp: AxiosResponse) => {
                resolve(resp.data.data as IReport);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    /**
     * Execute report from its id
     * @returns report result
     */
     public static execute(reportId: string) {
        return new Promise<IReportResult>((resolve, reject) => {
            const url = format("http://localhost:7000/report/%s/execute", reportId);
            axios.post(url).then((resp: AxiosResponse) => {
                const data = resp.data.data as IReportResult;
                resolve(data);
            }).catch((err) => {
                reject(err);
            });
        });
    }
}