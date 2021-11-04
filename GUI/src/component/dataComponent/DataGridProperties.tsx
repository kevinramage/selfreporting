import { Typography } from "@material-ui/core";
import { ChangeEvent, Component } from "react";
import { IDataGrid, IDataGridColumn } from "../../types/reportComponent";
import { onComponentChangeListener } from "../ReportOptions";

import "./DataGridProperties.css"

type DataGridPropertiesProps = {
    component: IDataGrid,
    componentChangeListener: onComponentChangeListener;
}
type DataGridPropertiesState = {
    component: IDataGrid,
    widthText: string,
    heightText: string,
    leftText: string,
    topText: string,
    componentChangeListener: onComponentChangeListener;
};

export class DataGridProperties extends Component<DataGridPropertiesProps, DataGridPropertiesState> {

    constructor(props: DataGridPropertiesProps) {
        super(props);
        this.state = { 
            component: props.component,
            widthText: props.component.width ? props.component.width + "" : "",
            heightText: props.component.height ? props.component.height + "" : "",
            leftText: props.component.left ? props.component.left + "" : "",
            topText: props.component.top ? props.component.top + "" : "",
            componentChangeListener: props.componentChangeListener
        };

        this.onNameChanged = this.onNameChanged.bind(this);
        this.onColumnsChanged = this.onColumnsChanged.bind(this);
        this.onRowPerPageChanged = this.onRowPerPageChanged.bind(this);
        this.onWidthChanged = this.onWidthChanged.bind(this);
        this.onHeightChanged = this.onHeightChanged.bind(this);
        this.onLeftChanged = this.onLeftChanged.bind(this);
        this.onTopChanged = this.onTopChanged.bind(this);
    }

    render() {
        const { component } = this.state;
        const columns = component.columns.map(c => { return c.headerName}).join(",");
        const rowPerPage = component.rowPerPage ? component.rowPerPage : 10;
        const width = component.width ? component.width : "450px";
        const height = component.height ? component.height : "300px";
        const left = component.left ? component.left : "0px";
        const top = component.top ? component.top : "0px";
        return (
            <div>
                <div>
                    <Typography className="propertyLabel">Name: </Typography>
                    <input value={component.name} onChange={this.onNameChanged}/>
                </div>
                <div>
                    <Typography className="propertyLabel">Type: </Typography>
                    <input value={component.type} disabled readOnly/>
                </div>
                <div>
                    <Typography className="propertyLabel">Columns: </Typography>
                    <input value={columns} onChange={this.onColumnsChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">RowPerPage: </Typography>
                    <input value={rowPerPage} onChange={this.onRowPerPageChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">Width: </Typography>
                    <input value={width} onChange={this.onWidthChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">Height: </Typography>
                    <input value={height} onChange={this.onHeightChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">Left: </Typography>
                    <input value={left} onChange={this.onLeftChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">Top: </Typography>
                    <input value={top} onChange={this.onTopChanged} />
                </div>
            </div>
        )
    }

    onNameChanged(e: ChangeEvent<HTMLInputElement>) {
        const dataGrid = this.state.component;
        dataGrid.name = e.target.value;
        this.setState({component: dataGrid});
        this.state.componentChangeListener(dataGrid);
    }
    onColumnsChanged(e: ChangeEvent<HTMLInputElement>) {
        const columnsName = e.target.value;
        const columns : IDataGridColumn[] = columnsName.split(",").map(c => {
            return {
                fieldName: c,
                headerName: c,
                width: 150
            }
        });
        const dataGrid = this.state.component;
        dataGrid.columns = columns;
        this.setState({component: dataGrid});
        this.state.componentChangeListener(dataGrid);
    }
    onRowPerPageChanged(e: ChangeEvent<HTMLInputElement>) {
        const value = Number.parseInt(e.target.value);
        const dataGrid = this.state.component;
        dataGrid.rowPerPage = !isNaN(value) ? value : 10;
        this.setState({component: dataGrid});
        this.state.componentChangeListener(dataGrid);
    }
    
    onWidthChanged(e: ChangeEvent<HTMLInputElement>) {
        const value = Number.parseInt(e.target.value);
        if (!isNaN(value)) {
            const dataGrid = this.state.component;
            dataGrid.width = value;
            this.setState({component: dataGrid});
            this.state.componentChangeListener(dataGrid);
        }
        this.setState({widthText: e.target.value });
    }
    onHeightChanged(e: ChangeEvent<HTMLInputElement>) {
        const value = Number.parseInt(e.target.value);
        if (!isNaN(value)) {
            const dataGrid = this.state.component;
            dataGrid.height = value;
            this.setState({component: dataGrid});
            this.state.componentChangeListener(dataGrid);
        }
        this.setState({heightText: e.target.value });
    }
    onLeftChanged(e: ChangeEvent<HTMLInputElement>) {
        const value = Number.parseInt(e.target.value);
        if (!isNaN(value)) {
            const dataGrid = this.state.component;
            dataGrid.left = value;
            this.setState({component: dataGrid});
            this.state.componentChangeListener(dataGrid);
        }
        this.setState({leftText: e.target.value });
    }
    onTopChanged(e: ChangeEvent<HTMLInputElement>) {
        const value = Number.parseInt(e.target.value);
        if (!isNaN(value)) {
            const dataGrid = this.state.component;
            dataGrid.top = value;
            this.setState({component: dataGrid});
            this.state.componentChangeListener(dataGrid);
        }
        this.setState({topText: e.target.value });
    }
}