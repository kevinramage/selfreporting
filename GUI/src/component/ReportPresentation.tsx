import { Component } from "react";
import { COMPONENT_TYPE, IDataGrid, IReportComponent } from "../types/reportComponent";
import { DataGrid } from '@mui/x-data-grid';
import { IReportResult } from "../types/reportResult";

type ReportPresentationProps = {
    reportResult: IReportResult | null;
};
type ReportPresentationState = {
    reportResult: IReportResult | null;
};

export class ReportPresentation extends Component<ReportPresentationProps,ReportPresentationState> {

    constructor(props: ReportPresentationProps) {
        super(props);
        this.state = {
            reportResult: null
        }
    }

    shouldComponentUpdate(nextProps: Readonly<ReportPresentationProps>, nextState: Readonly<ReportPresentationState>, nextContext: any) : boolean{
        if (nextProps && nextProps.reportResult !== null && this.state.reportResult === null) {
            this.setState({reportResult: nextProps.reportResult});
            return true;
        } else {
            return false;
        }
    }

    render() {
        if (this.state.reportResult && this.state.reportResult.rootComponent) {
            return this.renderComponent(this.state.reportResult.rootComponent);
        } else {
            return <div></div>
        }
    }

    renderComponent(component: IReportComponent) {
        if (component.type === COMPONENT_TYPE.DATAGRID) {
            return this.renderDataGrid(component.root);
        } else {
            console.error("ReportPresentation.renderComponent - Invalid component type: " + component.type);
            return <div></div>
        }
    }

    renderDataGrid(component: IDataGrid) {
        const columns = this.getDataGridColumn(component);
        return <DataGrid columns={columns} rows={component.rows}></DataGrid>
    }

    getDataGridColumn(component: IDataGrid) {
        return component.columns.map(c => {
            return {
                field: c.fieldName,
                headerName: c.headerName,
                width: c.width,
                description: c.description ///TODO Throw an error in console
            }
        })
    }

}