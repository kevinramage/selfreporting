import { AccordionSummary, Divider, IconButton, Typography } from "@material-ui/core";
import { Accordion, AccordionDetails, Dialog, DialogTitle, Stack } from "@mui/material";
import { Component } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import BarChartIcon from '@mui/icons-material/BarChart';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import { COMPONENT_TYPE, IAreaChart, IBarChart, IDataGrid, ILabel, ILineChart, ILink, IPieChart, IRadarChart, IRadialBarChart, IRating, IReportComponent, IScatterChart, ITreeMap } from "../types/reportComponent";
import { ComponentSelection } from "./ComponentSelection";
import { LabelProperties } from "./dataComponent/LabelProperties";
import { RatingProperties } from "./dataComponent/RatingProperties";
import { LinkProperties } from "./dataComponent/LinkProperties";
import { LineChartProperties } from "./dataComponent/LineChartProperties";
import { DataGridProperties } from "./dataComponent/DataGridProperties";

import "./ReportOptions.css";
import { IDataSource } from "../types/dataSource";
import { IReport } from "../types/report";
import { AreaChartProperties } from "./dataComponent/AreaChartProperties";
import { BarChartProperties } from "./dataComponent/BarChartProperties";
import { ScatterChartProperties } from "./dataComponent/ScatterChartProperties";
import { PieChartProperties } from "./dataComponent/PieChartProperties";
import { RadarChartProperties } from "./dataComponent/RadarChartProperties";
import { RadialChartProperties } from "./dataComponent/RadialChartProperties";
import { TreeMapProperties } from "./dataComponent/TreeMapProperties";


export type onComponentChangeListener = (component: IReportComponent|null) => void;

type ReportOptionsProps = {
    report: IReport;
    componentChangeListener: onComponentChangeListener;
};
type ReportOptionsState = {
    reportComponent: IReportComponent | null;
    dataSources: IDataSource[];
    isOpenCreateComponent: boolean;
    isOpenUpdateComponent: boolean;
    isStructureExpanded: boolean;
    isPropertiesExpanded: boolean;
    componentChangeListener: onComponentChangeListener;
};

export class ReportOptions extends Component<ReportOptionsProps, ReportOptionsState> {

    constructor(props: ReportOptionsProps) {
        super(props);
        this.state = { 
            reportComponent: props.report.rootComponent,
            dataSources: props.report.dataSources,
            isOpenCreateComponent: false,
            isOpenUpdateComponent: false,
            isStructureExpanded: true,
            isPropertiesExpanded: false,
            componentChangeListener: props.componentChangeListener
        };
        this.addComponent = this.addComponent.bind(this);
        this.updateComponent = this.updateComponent.bind(this);
        this.deleteComponent = this.deleteComponent.bind(this);
        this.closeCreateComponent = this.closeCreateComponent.bind(this);
        this.closeUpdateComponent = this.closeUpdateComponent.bind(this);
        this.onCloseSelectComponentDialog = this.onCloseSelectComponentDialog.bind(this);
        this.onSelectComponent = this.onSelectComponent.bind(this);

        this.clickOnStructure = this.clickOnStructure.bind(this);
        this.clickOnProperties = this.clickOnProperties.bind(this);
        this.notifyComponentChanges = this.notifyComponentChanges.bind(this);
    }


    render() {
        const { isOpenCreateComponent, isOpenUpdateComponent, isStructureExpanded, isPropertiesExpanded } = this.state;
        const componentType = this.state.reportComponent ? this.state.reportComponent.type : "";

        let colorAddComponent : string = "#2C5530";
        if (this.isNewObjectButtonDisabled()) { colorAddComponent = "#DDD"; }
        let colorUpdateComponent : string = "#D38B5D";
        if (this.isUpdateObjectButtonDisabled()) { colorUpdateComponent = "#DDD"; }
        let colorDeleteComponent : string = "#8B1E3F";
        if (this.isDeleteObjectButtonDisabled()) { colorDeleteComponent = "#DDD"; }
        
        return (
            <div>
                <Accordion expanded={isStructureExpanded} style={{margin: "0px"}} onClick={this.clickOnStructure}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <AccountTreeIcon />
                        <Typography style={{paddingLeft: "10px"}}>Structure</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{padding: "0px"}}>
                        <div>
                            <Divider orientation="horizontal" />
                            <Stack direction="row">
                                <IconButton style={{padding: "6px", color: colorAddComponent}} disabled={this.isNewObjectButtonDisabled()}
                                    onClick={this.addComponent}><AddCircleOutlineIcon /></IconButton>
                                <IconButton style={{padding: "6px", color: colorUpdateComponent}} disabled={this.isUpdateObjectButtonDisabled()} 
                                    onClick={this.updateComponent}><BarChartIcon /></IconButton>
                                <IconButton style={{padding: "6px", color: colorDeleteComponent}} disabled={this.isDeleteObjectButtonDisabled()}
                                    onClick={this.deleteComponent}><HighlightOffIcon /></IconButton>
                            </Stack>
                            <Divider orientation="horizontal" />
                            <TreeView style={{height: "100px"}}
                                defaultCollapseIcon={<ExpandMoreIcon />}
                                defaultExpandIcon={<ChevronRightIcon />}>
                                { this.renderRootComponent(this.state.reportComponent) }
                            </TreeView>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion  expanded={isPropertiesExpanded} style={{margin: "0px"}} onClick={this.clickOnProperties}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <ChromeReaderModeIcon />
                        <Typography style={{paddingLeft: "10px"}}>Properties</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        { this.renderComponentProperties(this.state.reportComponent) }
                    </AccordionDetails>
                </Accordion>

                <Dialog className="dialogComponent" open={isOpenCreateComponent} onClose={this.closeCreateComponent}>
                    <DialogTitle>Create component</DialogTitle>
                    <ComponentSelection componentType="" closeListener={this.onCloseSelectComponentDialog}/>
                </Dialog>

                <Dialog className="dialogComponent" open={isOpenUpdateComponent} onClose={this.closeUpdateComponent}>
                    <DialogTitle>Update component</DialogTitle>
                    <ComponentSelection componentType={componentType} closeListener={this.onCloseSelectComponentDialog}/>
                </Dialog>
            </div>
        )
    }

    clickOnStructure() {
        this.setState({isStructureExpanded: true, isPropertiesExpanded: false});
    }

    clickOnProperties() {
        this.setState({isStructureExpanded: false, isPropertiesExpanded: true});
    }

    renderRootComponent(reportComponent: IReportComponent | null) {
        if (reportComponent) {
            return (
                <TreeItem nodeId="1" label={reportComponent.name} icon={<BarChartIcon />}>
                </TreeItem>
            )
        } else {
            return null;
        }
    }

    closeCreateComponent() {
        this.setState({isOpenCreateComponent: false})
    }
    closeUpdateComponent() {
        this.setState({isOpenUpdateComponent: false})
    }

    addComponent() {
        if (this.state.reportComponent === null) {
            this.setState({isOpenCreateComponent: true})
        }
    }
    
    updateComponent() {
        if (this.state.reportComponent !== null) {
            this.setState({isOpenUpdateComponent: true});
        }
    }

    deleteComponent() {
        this.setState({reportComponent: null});
        if (this.state.componentChangeListener) {
            this.state.componentChangeListener(null);
        }
    }

    onSelectComponent(e: React.ReactEventHandler<HTMLUListElement>) {
        console.info(e);
    }

    onCloseSelectComponentDialog(component: IReportComponent|null, isSubmit: boolean) {
        let state : ReportOptionsState = this.state;
        state.isOpenCreateComponent = false;
        state.isOpenUpdateComponent = false;
        if (isSubmit && component !== null) {
            state.reportComponent = component;
            if (this.state.componentChangeListener) {
                this.state.componentChangeListener(component);
            }
        }
        this.setState(state);
    }

    isNewObjectButtonDisabled() {
        return this.state.reportComponent !== null;
    }

    isUpdateObjectButtonDisabled() {
        return this.state.reportComponent === null;
    }

    isDeleteObjectButtonDisabled() {
        return this.state.reportComponent === null;
    }

    renderComponentProperties(component: IReportComponent | null) {
        if (component) {
            switch (component.type) {
                case COMPONENT_TYPE.LABEL:
                    return this.renderLabelProperties(component as ILabel);
                case COMPONENT_TYPE.RATING:
                    return this.renderRatingProperties(component as IRating);
                case COMPONENT_TYPE.LINK:
                    return this.renderLinkProperties(component as ILink);
                case COMPONENT_TYPE.DATAGRID:
                    return this.renderDataGridProperties(component as IDataGrid);
                case COMPONENT_TYPE.LINECHART:
                    return this.renderLineChartProperties(component as ILineChart);
                case COMPONENT_TYPE.AREACHART:
                    return this.renderAreaChartProperties(component as IAreaChart);
                case COMPONENT_TYPE.BARCHART:
                    return this.renderBarChartProperties(component as IBarChart);
                case COMPONENT_TYPE.SCATTERCHART:
                    return this.renderScatterChartProperties(component as IScatterChart);
                case COMPONENT_TYPE.PIECHART:
                    return this.renderPieChartProperties(component as IPieChart);
                case COMPONENT_TYPE.RADARCHART:
                    return this.renderRadarChartProperties(component as IRadarChart);
                case COMPONENT_TYPE.RADIALBARCHART:
                    return this.renderRadialChartProperties(component as IRadarChart);
                case COMPONENT_TYPE.TREEMAP:
                    return this.renderTreeMapProperties(component as ITreeMap);
            }
            return null;
        } else {
            return null;
        }
    }

    renderLabelProperties(label: ILabel) {
        return (
            <LabelProperties component={label} componentChangeListener={this.notifyComponentChanges} />
        )
    }

    renderRatingProperties(rating: IRating) {
        return (
            <RatingProperties component={rating} componentChangeListener={this.notifyComponentChanges} />
        )
    }

    renderLinkProperties(link: ILink) {
        return (
            <LinkProperties component={link} componentChangeListener={this.notifyComponentChanges} />
        )
    }

    renderDataGridProperties(dataGrid: IDataGrid) {
        return (
            <DataGridProperties component={dataGrid} componentChangeListener={this.notifyComponentChanges} />
        )
    }

    renderLineChartProperties(lineChart: ILineChart) {
        return (
            <LineChartProperties component={lineChart} dataSources={this.state.dataSources} componentChangeListener={this.notifyComponentChanges} />
        )
    }

    renderAreaChartProperties(areaChart: IAreaChart) {
        return (
            <AreaChartProperties component={areaChart} dataSources={this.state.dataSources} componentChangeListener={this.notifyComponentChanges} />
        )
    }

    renderBarChartProperties(barChart: IBarChart) {
        return (
            <BarChartProperties component={barChart} dataSources={this.state.dataSources} componentChangeListener={this.notifyComponentChanges} />
        )
    }

    renderScatterChartProperties(scatterChart: IScatterChart) {
        return (
            <ScatterChartProperties component={scatterChart} dataSources={this.state.dataSources} componentChangeListener={this.notifyComponentChanges} />
        )
    }

    renderPieChartProperties(pieChart: IPieChart) {
        return (
            <PieChartProperties component={pieChart} dataSources={this.state.dataSources} componentChangeListener={this.notifyComponentChanges} />
        )
    }

    renderRadarChartProperties(radarChart: IRadarChart) {
        return (
            <RadarChartProperties component={radarChart} dataSources={this.state.dataSources} componentChangeListener={this.notifyComponentChanges} />
        )
    }

    renderRadialChartProperties(radialBarChart: IRadialBarChart) {
        return (
            <RadialChartProperties component={radialBarChart} dataSources={this.state.dataSources} componentChangeListener={this.notifyComponentChanges} />
        )
    }

    renderTreeMapProperties(treeMap: ITreeMap) {
        return (
            <TreeMapProperties component={treeMap} dataSources={this.state.dataSources} componentChangeListener={this.notifyComponentChanges} />
        )
    }

    notifyComponentChanges(component: IReportComponent | null) {
        this.state.componentChangeListener(component);
    }
}