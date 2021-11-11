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
import { COMPONENT_TYPE, IAreaChart, IBarChart, IDataGrid, ILabel, ILineChart, ILink, IPieChart, IRadarChart, IRadialBarChart, IRating, IReportComponent, IScatterChart, IStack, ITreeMap } from "../types/reportComponent";
import { ComponentSelection } from "./ComponentSelection";
import { LabelProperties } from "./dataComponent/LabelProperties";
import { RatingProperties } from "./dataComponent/RatingProperties";
import { LinkProperties } from "./dataComponent/LinkProperties";
import { LineChartProperties } from "./dataComponent/LineChartProperties";
import { DataGridProperties } from "./dataComponent/DataGridProperties";

import "./ReportOptions.css";
import { IDataSource } from "../types/dataSource";
import { IReport, ReportUtils } from "../types/report";
import { AreaChartProperties } from "./dataComponent/AreaChartProperties";
import { BarChartProperties } from "./dataComponent/BarChartProperties";
import { ScatterChartProperties } from "./dataComponent/ScatterChartProperties";
import { PieChartProperties } from "./dataComponent/PieChartProperties";
import { RadarChartProperties } from "./dataComponent/RadarChartProperties";
import { RadialChartProperties } from "./dataComponent/RadialChartProperties";
import { TreeMapProperties } from "./dataComponent/TreeMapProperties";
import { StackProperties } from "./dataComponent/StackProperties";
import { HistoryManagement, HISTORY_SOURCES } from "../business/HistoryManagement";
import { format } from "util";


export type onComponentChangeListener = (component: IReportComponent|null) => void;

type ReportOptionsProps = {
    report: IReport;
    componentChangeListener: onComponentChangeListener;
};
type ReportOptionsState = {
    dataSources: IDataSource[];
    isOpenCreateComponent: boolean;
    isOpenUpdateComponent: boolean;
    isStructureExpanded: boolean;
    isPropertiesExpanded: boolean;
    expanded: string[];
    selected?: string;
    componentChangeListener: onComponentChangeListener;
};

export class ReportOptions extends Component<ReportOptionsProps, ReportOptionsState> {

    constructor(props: ReportOptionsProps) {
        super(props);
        this.state = {
            dataSources: props.report.dataSources,
            isOpenCreateComponent: false,
            isOpenUpdateComponent: false,
            isStructureExpanded: true,
            isPropertiesExpanded: false,
            expanded: [],
            componentChangeListener: props.componentChangeListener
        };
        this.addComponent = this.addComponent.bind(this);
        this.updateComponent = this.updateComponent.bind(this);
        this.deleteComponent = this.deleteComponent.bind(this);
        this.onNodeSelected = this.onNodeSelected.bind(this);
        this.onNodeToggled = this.onNodeToggled.bind(this);
        this.closeCreateComponent = this.closeCreateComponent.bind(this);
        this.closeUpdateComponent = this.closeUpdateComponent.bind(this);
        this.onCloseSelectComponentDialog = this.onCloseSelectComponentDialog.bind(this);
        this.onCloseUpdateSelectComponentDialog = this.onCloseUpdateSelectComponentDialog.bind(this);

        this.clickOnStructure = this.clickOnStructure.bind(this);
        this.clickOnProperties = this.clickOnProperties.bind(this);
        this.notifyComponentChanges = this.notifyComponentChanges.bind(this);
    }


    render() {
        const { isOpenCreateComponent, isOpenUpdateComponent, isStructureExpanded, isPropertiesExpanded } = this.state;
        const reportComponent = this.props.report.rootComponent;
        const componentType = reportComponent ? reportComponent.type : "";

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
                                defaultExpandIcon={<ChevronRightIcon />}
                                onNodeSelect={this.onNodeSelected}
                                expanded={this.state.expanded}
                                >
                                { this.renderComponent(reportComponent) }
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
                        { this.renderSelectedComponentProperties() }
                    </AccordionDetails>
                </Accordion>

                <Dialog className="dialogComponent" open={isOpenCreateComponent} onClose={this.closeCreateComponent}>
                    <DialogTitle>Create component</DialogTitle>
                    <ComponentSelection componentType="" closeListener={this.onCloseSelectComponentDialog}/>
                </Dialog>

                <Dialog className="dialogComponent" open={isOpenUpdateComponent} onClose={this.closeUpdateComponent}>
                    <DialogTitle>Update component</DialogTitle>
                    <ComponentSelection componentType={componentType} closeListener={this.onCloseUpdateSelectComponentDialog}/>
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

    renderComponent(reportComponent: IReportComponent | null) {
        if (reportComponent) {
            if (reportComponent.type === COMPONENT_TYPE.STACK) {
                const stackComponent = reportComponent as IStack;
                if (stackComponent.subObjects.length > 0) {
                    return (<TreeItem  key={stackComponent.id} nodeId={stackComponent.id} label={stackComponent.name} icon={<BarChartIcon />}>{stackComponent.subObjects.map(so => {return this.renderComponent(so) })}</TreeItem>);
                } else {
                    return <TreeItem key={stackComponent.id} nodeId={stackComponent.id} label={stackComponent.name} icon={<BarChartIcon />} />
                }
            } else {
                return <TreeItem key={reportComponent.id} nodeId={reportComponent.id} label={reportComponent.name} icon={<BarChartIcon />} />
            }
        } else {
            return null;
        }
    }

    onNodeSelected(event: React.SyntheticEvent, nodeIds: string) {
        this.setState({selected: nodeIds});
    }

    onNodeToggled(event: React.SyntheticEvent, nodeIds: string[]) {
        //this.setState({expanded: nodeIds});
    }

    getSelectedComponent() {
        if (this.state.selected) {
            return this.getSelectedComponentFromId(this.props.report.rootComponent, this.state.selected);
        } else {
            return null;
        }
    }

    getSelectedComponentFromId(component: IReportComponent|null, id: string) : IReportComponent | null {
        let selectedComponent : IReportComponent | null = null;
        if (component === null) {
            return null;
        } else if (component.id !== id) {
            if (component.type === COMPONENT_TYPE.STACK) {
                const stack = component as IStack;
                for (var i = 0; i < stack.subObjects.length; i++) {
                    const comp = this.getSelectedComponentFromId(stack.subObjects[i], id);
                    if (comp !== null) {
                        selectedComponent = comp;
                        break;
                    }
                }
            }
        } else {
            selectedComponent = component;
        }
        return selectedComponent;
    }

    closeCreateComponent() {
        this.setState({isOpenCreateComponent: false})
    }
    closeUpdateComponent() {
        this.setState({isOpenUpdateComponent: false})
    }

    addComponent() {
        this.setState({isOpenCreateComponent: true});
    }
    
    updateComponent() {
        if (this.props.report.rootComponent !== null) {
            this.setState({isOpenUpdateComponent: true});
        }
    }

    deleteComponent() {
        const selectedComponent = this.getSelectedComponent();
        if (selectedComponent !== null) {
            const parent = selectedComponent.parent;

            // Delete child node
            if (parent !== undefined) {
                const container = parent as IStack;
                const index = container.subObjects.indexOf(selectedComponent);
                container.subObjects.splice(index, 1);
                this.setState({selected: undefined});

            // Delete root node
            } else {
                this.props.report.rootComponent = null;
                this.setState({selected: undefined});
            }

            // History and notification
            this.addState(format("Delete component %s", selectedComponent.name));
            this.notifyComponentChanges();
        }
        
        
    }

    onCloseSelectComponentDialog(component: IReportComponent|null, isSubmit: boolean) {
        let state : ReportOptionsState = this.state;
        state.isOpenCreateComponent = false;
        state.isOpenUpdateComponent = false;
        if (isSubmit && component !== null) {
            const selectedComponent = this.getSelectedComponent();
            
            // No component present
            if (this.props.report.rootComponent === null ) {
                this.props.report.rootComponent = component;

            // Component selected is container
            } else if (selectedComponent !== null && selectedComponent.type === COMPONENT_TYPE.STACK) {
                
                const container = selectedComponent as IStack;
                component.parent = container;
                container.subObjects.push(component);
                state.expanded.push(container.id);
            }

            // History and notification
            this.addState(format("Add component %s",component.name));
            this.notifyComponentChanges();
        }
        this.setState(state);
    }

    onCloseUpdateSelectComponentDialog(component: IReportComponent|null, isSubmit: boolean) {
        let state : ReportOptionsState = this.state;
        state.isOpenCreateComponent = false;
        state.isOpenUpdateComponent = false;
        if (isSubmit && component !== null) {
            let selectedComponent = this.getSelectedComponent();
            if (selectedComponent !== null ) {

                // Non root element
                if (selectedComponent.parent) {
                    if (selectedComponent.parent.type === COMPONENT_TYPE.STACK) {
                        const stack = selectedComponent.parent as IStack;
                        const index = stack.subObjects.indexOf(selectedComponent);
                        stack.subObjects.splice(index, 1, component);
                    }
                
                // Root element
                } else {
                    this.props.report.rootComponent = component;
                }

                // History and notification
                this.addState(format("Update component from %s to %s",selectedComponent.name, component.name));
                this.notifyComponentChanges();
            }
        }
        this.setState(state);
    }

    isNewObjectButtonDisabled() {
        const reportComponent = this.props.report.rootComponent;
        const selectedComponent = this.getSelectedComponent();

        // Disabled if a component is already present and if component selected is not a container       
        return reportComponent !== null && (selectedComponent === null || selectedComponent.type !== COMPONENT_TYPE.STACK);
    }

    isUpdateObjectButtonDisabled() {
        return this.getSelectedComponent() === null;
    }

    isDeleteObjectButtonDisabled() {
        return this.getSelectedComponent() === null;
    }

    renderSelectedComponentProperties() {
        const selectedComponent = this.getSelectedComponent();
        if (selectedComponent) {
            return this.renderComponentProperties(selectedComponent);
        } else {
            return this.renderComponentProperties(this.props.report.rootComponent);
        }
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
                case COMPONENT_TYPE.STACK:
                    return this.renderStackProperties(component as IStack);
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

    renderStackProperties(stack: IStack) {
        return (
            <StackProperties component={stack} componentChangeListener={this.notifyComponentChanges} />
        )
    }

    private notifyComponentChanges() {
        if (this.state.componentChangeListener) {
            this.state.componentChangeListener(this.props.report.rootComponent);
        }
    }

    private addState(change: string) {
        const history = HistoryManagement.instance.getSource(HISTORY_SOURCES.REPORT);
        const clone = ReportUtils.clone(this.props.report);
        history.addState(clone, change);
    }
}