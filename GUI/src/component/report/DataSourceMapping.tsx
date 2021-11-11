import { Button, CardContent, IconButton, MenuItem } from "@material-ui/core";
import { Component, MouseEvent } from "react";
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { Card, CardActions, Dialog, DialogTitle, InputLabel, Select, SelectChangeEvent } from "@mui/material";
import { IDataSource } from "../../types/dataSource";
import { IDoubleAxisComponent, IReportComponent } from "../../types/reportComponent";

import "./DataSourceMapping.css";
import { IDataSourceElement } from "../../types/dataSourceElement";
import { format } from "util";
import { onComponentChangeListener } from "./ReportOptions";

type DataSourceMappingProps = {
    component: IReportComponent;
    dataSources: IDataSource[];
    axisType: string;
    onComponentChange: onComponentChangeListener;
};
type DataSourceMappingState = {
    component: IReportComponent;
    dataSources: IDataSource[];
    isOpenDialog: boolean;
    dataSourceXName: string;
    dataSourceYName: string;
    fieldsX: IDataSourceElement[];
    fieldsY: IDataSourceElement[];
    fieldX: IDataSourceElement | null;
    fieldY: IDataSourceElement | null;
    axisType: string;
    onComponentChange: onComponentChangeListener;
};

const cardActions : React.CSSProperties = {
    float: "right",
    marginRight: "50px"
}

export class DataSouceMapping extends Component<DataSourceMappingProps, DataSourceMappingState> {

    constructor(props: DataSourceMappingProps) {
        super(props);
        const dataSourceXName = props.dataSources.length > 0 ? props.dataSources[0].name : "";
        const dataSourceYName = props.dataSources.length > 0 ? props.dataSources[0].name : "";
        this.state = {
            component: props.component,
            dataSources: props.dataSources,
            isOpenDialog: false, 
            dataSourceXName: dataSourceXName,
            dataSourceYName: dataSourceYName,
            fieldsX: this.identifyFieldsFromDataSource(props.dataSources, dataSourceXName, "string"),
            fieldsY: this.identifyFieldsFromDataSource(props.dataSources, dataSourceYName, "number"),
            fieldX: null,
            fieldY: null,
            axisType: props.axisType,
            onComponentChange: props.onComponentChange
        };

        this.clickOnDataSource = this.clickOnDataSource.bind(this);
        this.onCloseDialog = this.onCloseDialog.bind(this);
        this.onDataSourceXChanged = this.onDataSourceXChanged.bind(this);
        this.onDataSourceYChanged = this.onDataSourceYChanged.bind(this);
        this.onFieldXChanged = this.onFieldXChanged.bind(this);
        this.onFieldYChanged = this.onFieldYChanged.bind(this);
        this.clickOnCancel = this.clickOnCancel.bind(this);
        this.clickOnSubmit = this.clickOnSubmit.bind(this);
    }

    public render() {
        const { isOpenDialog } = this.state;
        return (
            <div className="mappingDiv">
                <div>
                    { this.renderInputMapping() }
                    <IconButton onClick={this.clickOnDataSource}>
                        <CompareArrowsIcon />
                    </IconButton>
                </div>
                <Dialog open={isOpenDialog} onClose={this.onCloseDialog}>
                    <DialogTitle>DataSource Mapping</DialogTitle>
                    <Card>
                        <CardContent>
                        { this.renderAxis() }
                        </CardContent>
                        <CardActions style={cardActions}>
                            <Button variant="contained" style={{color: "#FFF", background: "#B71C1C"}} onClick={this.clickOnCancel}>Cancel</Button>
                            <Button variant="contained" style={{color: "#FFF", background: "#33691E"}} onClick={this.clickOnSubmit}>Submit</Button>
                        </CardActions>
                    </Card>
                </Dialog>
            </div>
        )
    }

    private renderInputMapping() {
        const component = this.state.component as IDoubleAxisComponent;
        if (this.state.axisType === "X") {
            return <input type="text" value={component.nameAxisKey} disabled />
        } else {
            return <input type="text" value={component.dataAxisKey} disabled />
        }
    }

    private renderAxis() {
        if (this.state.axisType === "X") {
            return this.renderXAxis();
        } else {
            return this.renderYAxis();
        }
    }

    private renderXAxis() {
        const { dataSources, dataSourceXName, fieldsX, fieldX } = this.state;
        return (
        <fieldset>
            <legend>X Axis (String)</legend>
            <InputLabel id="labelXAxisDataSource">DataSource</InputLabel>
            <Select labelId="labelXAxisDataSource" label="DataSource" value={dataSourceXName} 
                fullWidth onChange={this.onDataSourceXChanged}>
            { dataSources.map(d => { return (
                <MenuItem key={d.name} value={d.name}>{d.name}</MenuItem>
            )}) }
            </Select>

            <InputLabel id="labelXAxisField">Field</InputLabel>
            <Select labelId="labelXAxisField" label="Field" value={fieldX ? fieldX.id : ""} 
                fullWidth onChange={this.onFieldXChanged}>
            { fieldsX.map(f => { return (
                <MenuItem key={f.id} value={f.id}>{format("%s (%s)", f.businessName, f.type)}</MenuItem>
            )}) }
            </Select>
        </fieldset>
        )
    }

    private renderYAxis() {
        const { dataSources, dataSourceYName, fieldsY, fieldY } = this.state;
        return (
        <fieldset>
            <legend>Y Axis (Number)</legend>
            <InputLabel id="labelYAxisDataSource">DataSource</InputLabel>
            <Select labelId="labelYAxisDataSource" label="DataSource" value={dataSourceYName} 
                fullWidth onChange={this.onDataSourceYChanged}>
            { dataSources.map(d => { return (
                <MenuItem key={d.name} value={d.name}>{d.name}</MenuItem>
            )}) }
            </Select>

            <InputLabel id="labelYAxisField">Field</InputLabel>
            <Select labelId="labelYAxisField" label="Field" value={fieldY ? fieldY.id : ""} 
                fullWidth onChange={this.onFieldYChanged}>
            { fieldsY.map(f => { return (
                <MenuItem key={f.id} value={f.id}>{format("%s (%s)", f.businessName, f.type)}</MenuItem>
            )}) }
            </Select>
        </fieldset>
        )
    }

    private clickOnDataSource(e: MouseEvent) {
        this.setState({ isOpenDialog: true });
        e.stopPropagation();
    }

    private onCloseDialog() {
        this.setState({ isOpenDialog: false });
    }

    private identifyFieldsFromDataSource(dataSources:IDataSource[], dataSourceName: string, objectType: string) {
        let fields : IDataSourceElement[] = [];
        const dataSource = dataSources.find(d => { return d.name === dataSourceName; });
        if (dataSource) {
            fields = dataSource.elements.filter(e => { return e.type === objectType; });
        }
        return fields;
    }

    private onDataSourceXChanged(e: SelectChangeEvent) {
        this.setState({ dataSourceXName: e.target.value });
        const fields = this.identifyFieldsFromDataSource(this.state.dataSources, e.target.value, "string");
        this.setState({fieldsX: fields });
    }

    private onDataSourceYChanged(e: SelectChangeEvent) {
        this.setState({ dataSourceYName: e.target.value });
        const fields = this.identifyFieldsFromDataSource(this.state.dataSources, e.target.value, "number");
        this.setState({fieldsY: fields });
    }

    private onFieldXChanged(e: SelectChangeEvent) {
        const dataSource = this.state.dataSources.find(d => { return d.name === this.state.dataSourceXName; });
        if (dataSource) {
            const field = dataSource.elements.find(elt => { return elt.id === e.target.value; });
            if (field) {
                this.setState({fieldX: field });
            }
        }
    }

    private onFieldYChanged(e: SelectChangeEvent) {
        const dataSource = this.state.dataSources.find(d => { return d.name === this.state.dataSourceYName; });
        if (dataSource) {
            const field = dataSource.elements.find(elt => { return elt.id === e.target.value; });
            if (field) {
                this.setState({fieldY: field });
            }
        }
    }

    private clickOnCancel(e: MouseEvent) {
        e.stopPropagation();
        this.setState({ isOpenDialog: false });
    }

    private clickOnSubmit(e: MouseEvent) {
        e.stopPropagation();
        if (this.state.fieldX) {
            const mapping = format("{%s.%s}", this.state.dataSourceXName, this.state.fieldX.technicalName);
            const component = this.state.component as IDoubleAxisComponent;
            component.nameAxisKey = mapping;
            component.nameAxisLabel = this.state.fieldX.businessName;
            this.setState({component: component});
            if (this.state.onComponentChange) {
                this.state.onComponentChange(component);
            }

        } else if (this.state.fieldY) {
            const mapping = format("{%s.%s}", this.state.dataSourceXName, this.state.fieldY.technicalName);
            const component = this.state.component as IDoubleAxisComponent;
            component.dataAxisLabel = this.state.fieldY.businessName;
            component.dataAxisKey = mapping;
            this.setState({component: component});
            if (this.state.onComponentChange) {
                this.state.onComponentChange(component);
            }
            
        }
        this.setState({ isOpenDialog: false });
    }
}