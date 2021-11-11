import { Card } from "@mui/material";
import { Component } from "react";
import { IReport } from "../../../types/report";

export type DataSourceProps = {
    report: IReport;
};
export type DataSourceState = {};

/**
 * Dialog card dedicated to manage report dataSources
 * Configuration of datasources from a universe source
 */
export class DataSourceEditor extends Component<DataSourceProps,DataSourceState> {

    public constructor(props: DataSourceProps) {
        super(props);
    }

    public render() {
        return (
            <Card>

            </Card>
        )
    }

}