import { Button, CardContent, ImageList, ImageListItem, Link } from "@material-ui/core";
import { Card, CardActions, ImageListItemBar } from "@mui/material";
import React, { Component, MouseEvent } from "react";
import { COMPONENT_TYPE, IAreaChart, IBarChart, IDataGrid, ILabel, ILineChart, ILink, IPieChart, IRadarChart, IRadialBarChart, IRating, IReportComponent, IScatterChart, ITreeMap } from "../types/reportComponent";

import "./ComponentSelection.css";

export type onCloseListener = (component: IReportComponent | null, isSubmit: boolean) => void;

type ComponentSelectionProps = {
    componentType: string;
    closeListener: onCloseListener;
};
type ComponentSelectionState = {
    componentType: string;
    closeListener: onCloseListener;
};

const cardContent : React.CSSProperties = {
    padding: "0px"
}

const cardActions : React.CSSProperties = {
    float: "right",
    marginRight: "50px"
}

const linkStyle : React.CSSProperties = {
    display: "block",
    textAlign: "center",
    marginTop: "5px",
    marginBottom: "5px"
}

const imageListItem : React.CSSProperties = {
    width: "120px",
    height: "75px"
};

const graphicListItem : React.CSSProperties = {
    width: "120px",
    height: "75px"
};

const containerListItem : React.CSSProperties = {
    width: "120px",
    height: "75px"
};

export class ComponentSelection extends Component<ComponentSelectionProps, ComponentSelectionState> {
    
    constructor(props: ComponentSelectionProps) {
        super(props);
        this.state = {
            componentType: props.componentType, 
            closeListener: props.closeListener 
        }
        this.clickOnCancel = this.clickOnCancel.bind(this);
        this.clickOnSubmit = this.clickOnSubmit.bind(this);

        this.clickOnLabel = this.clickOnLabel.bind(this);
        this.clickOnLink = this.clickOnLink.bind(this);
        this.clickOnRating = this.clickOnRating.bind(this);
        this.clickOnDataGrid = this.clickOnDataGrid.bind(this);
        this.clickOnLineChart = this.clickOnLineChart.bind(this);
        this.clickOnAreaChart = this.clickOnAreaChart.bind(this);
        this.clickOnBarChart = this.clickOnBarChart.bind(this);
        this.clickOnScatterChart = this.clickOnScatterChart.bind(this);
        this.clickOnPieChart = this.clickOnPieChart.bind(this);
        this.clickOnRadarChart = this.clickOnRadarChart.bind(this);
        this.clickOnRadialBarChart = this.clickOnRadialBarChart.bind(this);
        this.clickOnTreeMap = this.clickOnTreeMap.bind(this);
        
        this.clickOnStack = this.clickOnStack.bind(this);
        this.unselectAll = this.unselectAll.bind(this);
        this.changeBackground = this.changeBackground.bind(this);

        this.clickOnSimple = this.clickOnSimple.bind(this);
        this.clickOnGraphic = this.clickOnGraphic.bind(this);
        this.clickOnContainer = this.clickOnContainer.bind(this);
    }

    componentDidMount() {
        if (this.state.componentType !== "") {
            this.selectExistingComponent(this.state.componentType);
        } else {
            this.clickOnSimple();
        }
    }
    
    render() {
        return (
            <Card>
                <CardContent style={cardContent}>
                    <div className="componentSelection">
                        <div className="filters">
                            <Link href="#" style={linkStyle} onClick={this.clickOnSimple}>Simple</Link>
                            <Link href="#" style={linkStyle} onClick={this.clickOnGraphic}>Graphic</Link>
                            <Link href="#" style={linkStyle} onClick={this.clickOnContainer}>Container</Link>
                        </div>
                        <div className="content">
                            <div>
                                <ImageList>
                                    <ImageListItem className="labelComponent" style={imageListItem} onClick={this.clickOnLabel}>
                                        <img src="menu/label.png" alt="label" loading="lazy" />
                                        <ImageListItemBar title="Label" className="ListItemBar" />
                                    </ImageListItem>
                                    <ImageListItem className="linkComponent" style={imageListItem} onClick={this.clickOnLink}>
                                        <img src="menu/label.png" alt="link" loading="lazy" />
                                        <ImageListItemBar title="Link" className="ListItemBar" />
                                    </ImageListItem>
                                    <ImageListItem className="ratingComponent" style={imageListItem} onClick={this.clickOnRating}>
                                        <img src="menu/rating.png" alt="rating" loading="lazy" />
                                        <ImageListItemBar title="Rating" className="ListItemBar" />
                                    </ImageListItem>
                                    <ImageListItem className="dataGridComponent" style={imageListItem} onClick={this.clickOnDataGrid}>
                                        <img src="menu/datagrid.png" alt="datagrid" loading="lazy" />
                                        <ImageListItemBar title="DataGrid" className="ListItemBar" />
                                    </ImageListItem>
                                    <ImageListItem className="lineChartComponent" style={graphicListItem} onClick={this.clickOnLineChart}>
                                        <img src="menu/lineChart.png" alt="lineChart" loading="lazy" />
                                        <ImageListItemBar title="LineChart" className="ListItemBar" />
                                    </ImageListItem>
                                    <ImageListItem className="areaChartComponent" style={graphicListItem} onClick={this.clickOnAreaChart}>
                                        <img src="menu/areaChart.png" alt="areaChart" loading="lazy" />
                                        <ImageListItemBar title="AreaChart" className="ListItemBar" />
                                    </ImageListItem>
                                    <ImageListItem className="barChartComponent" style={graphicListItem} onClick={this.clickOnBarChart}>
                                        <img src="menu/barChart.png" alt="datagrid" loading="lazy" />
                                        <ImageListItemBar title="BarChart" className="ListItemBar" />
                                    </ImageListItem>
                                    <ImageListItem className="scatterChartComponent" style={graphicListItem} onClick={this.clickOnScatterChart}>
                                        <img src="menu/scatterChart.png" alt="scatterChart" loading="lazy" />
                                        <ImageListItemBar title="ScatterChart" className="ListItemBar" />
                                    </ImageListItem>
                                    <ImageListItem className="pieChartComponent" style={graphicListItem} onClick={this.clickOnPieChart}>
                                        <img src="menu/pieChart.png" alt="pieChart" loading="lazy" />
                                        <ImageListItemBar title="PieChart" className="ListItemBar" />
                                    </ImageListItem>
                                    <ImageListItem className="radarChartComponent" style={graphicListItem} onClick={this.clickOnRadarChart}>
                                        <img src="menu/radarChart.png" alt="radarChart" loading="lazy" />
                                        <ImageListItemBar title="RadarChart" className="ListItemBar" />
                                    </ImageListItem>
                                    <ImageListItem className="radialBarChartComponent" style={graphicListItem} onClick={this.clickOnRadialBarChart}>
                                        <img src="menu/radialBarChart.png" alt="datagrid" loading="lazy" />
                                        <ImageListItemBar title="RadialChart" className="ListItemBar" />
                                    </ImageListItem>
                                    <ImageListItem className="treeMapComponent" style={graphicListItem} onClick={this.clickOnTreeMap}>
                                        <img src="menu/treeMap.png" alt="datagrid" loading="lazy" />
                                        <ImageListItemBar title="TreeMap" className="ListItemBar" />
                                    </ImageListItem>
                                    <ImageListItem className="stackComponent"  style={containerListItem} onClick={this.clickOnStack}>
                                        <img src="menu/stack.png" alt="stack" loading="lazy" />
                                        <ImageListItemBar title="Stack" className="ListItemBar" />
                                    </ImageListItem>
                                </ImageList>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardActions style={cardActions}>
                    <Button variant="contained" style={{color: "#FFF", background: "#B71C1C"}} onClick={this.clickOnCancel}>Cancel</Button>
                    <Button variant="contained" style={{color: "#FFF", background: "#33691E"}} onClick={this.clickOnSubmit}>Submit</Button>
                </CardActions>
            </Card>
        )
    }

    clickOnCancel(e: MouseEvent) {
        if (this.state.closeListener) {
            this.state.closeListener(null, false);
        }
        e.stopPropagation();
    }

    clickOnSubmit(e: MouseEvent) {
        if (this.state.closeListener) {
            const component = this.generateComponentFromType(this.state.componentType);
            if (component !== null) {
                this.state.closeListener(component, true);
            }
        }
        e.stopPropagation();
    }

    clickOnSimple() {
        this.hideAll();
        this.changeVisibility("labelComponent", "");
        this.changeVisibility("linkComponent", "");
        this.changeVisibility("ratingComponent", "");
        this.changeVisibility("dataGridComponent", "");
        this.setState({componentType: ""});
        this.unselectAll();
    }

    clickOnGraphic() {
        this.hideAll();
        this.changeVisibility("lineChartComponent", "");
        this.changeVisibility("areaChartComponent", "");
        this.changeVisibility("barChartComponent", "");
        this.changeVisibility("scatterChartComponent", "");
        this.changeVisibility("pieChartComponent", "");
        this.changeVisibility("radarChartComponent", "");
        this.changeVisibility("radialBarChartComponent", "");
        this.changeVisibility("treeMapComponent", "");
        this.setState({componentType: ""});
        this.unselectAll();
    }

    clickOnContainer() {
        this.hideAll();
        this.changeVisibility("stackComponent", "");
        this.setState({componentType: ""});
        this.unselectAll();
    }

    clickOnLabel() {
        this.unselectAll();
        this.changeBackground("labelComponent", "#A20021");
        this.setState({componentType: COMPONENT_TYPE.LABEL});
    }

    clickOnLink() {
        this.unselectAll();
        this.changeBackground("linkComponent", "#A20021");
        this.setState({componentType: COMPONENT_TYPE.LINK});
    }

    clickOnRating() {
        this.unselectAll();
        this.changeBackground("ratingComponent", "#A20021");
        this.setState({componentType: COMPONENT_TYPE.RATING});
    }

    clickOnDataGrid() {
        this.unselectAll();
        this.changeBackground("dataGridComponent", "#A20021");
        this.setState({componentType: COMPONENT_TYPE.DATAGRID});
    }

    clickOnLineChart() {
        this.unselectAll();
        this.changeBackground("lineChartComponent", "#A20021");
        this.setState({componentType: COMPONENT_TYPE.LINECHART});
    }

    clickOnAreaChart() {
        this.unselectAll();
        this.changeBackground("areaChartComponent", "#A20021");
        this.setState({componentType: COMPONENT_TYPE.AREACHART});
    }

    clickOnBarChart() {
        this.unselectAll();
        this.changeBackground("barChartComponent", "#A20021");
        this.setState({componentType: COMPONENT_TYPE.BARCHART});
    }

    clickOnScatterChart() {
        this.unselectAll();
        this.changeBackground("scatterChartComponent", "#A20021");
        this.setState({componentType: COMPONENT_TYPE.SCATTERCHART});
    }

    clickOnPieChart() {
        this.unselectAll();
        this.changeBackground("pieChartComponent", "#A20021");
        this.setState({componentType: COMPONENT_TYPE.PIECHART});
    }

    clickOnRadarChart() {
        this.unselectAll();
        this.changeBackground("radarChartComponent", "#A20021");
        this.setState({componentType: COMPONENT_TYPE.RADARCHART});
    }

    clickOnRadialBarChart() {
        this.unselectAll();
        this.changeBackground("radialBarChartComponent", "#A20021");
        this.setState({componentType: COMPONENT_TYPE.RADIALBARCHART});
    }

    clickOnTreeMap() {
        this.unselectAll();
        this.changeBackground("treeMapComponent", "#A20021");
        this.setState({componentType: COMPONENT_TYPE.TREEMAP});
    }

    clickOnStack() {
        this.unselectAll();
        this.changeBackground("stackComponent", "#A20021");
        this.setState({componentType: COMPONENT_TYPE.STACK});
    }

    unselectAll() {
        this.changeBackground("labelComponent", "");
        this.changeBackground("linkComponent", "");
        this.changeBackground("ratingComponent", "");
        this.changeBackground("dataGridComponent", "");
        this.changeBackground("lineChartComponent", "");
        this.changeBackground("areaChartComponent", "");
        this.changeBackground("barChartComponent", "");
        this.changeBackground("scatterChartComponent", "");
        this.changeBackground("pieChartComponent", "");
        this.changeBackground("radarChartComponent", "");
        this.changeBackground("radialBarChartComponent", "");
        this.changeBackground("treeMapComponent", "");
        this.changeBackground("stackComponent", "");
    }

    changeBackground(className: string, color: string) {
        const element : HTMLElement = document.getElementsByClassName(className)[0] as HTMLElement;
        if (element) {
            element.style.background = color;
        }
    }

    hideAll() {
        this.changeVisibility("labelComponent", "none");
        this.changeVisibility("linkComponent", "none");
        this.changeVisibility("ratingComponent", "none");
        this.changeVisibility("dataGridComponent", "none");
        this.changeVisibility("lineChartComponent", "none");
        this.changeVisibility("areaChartComponent", "none");
        this.changeVisibility("barChartComponent", "none");
        this.changeVisibility("scatterChartComponent", "none");
        this.changeVisibility("pieChartComponent", "none");
        this.changeVisibility("radarChartComponent", "none");
        this.changeVisibility("radialBarChartComponent", "none");
        this.changeVisibility("treeMapComponent", "none");
        this.changeVisibility("stackComponent", "none");
    }

    changeVisibility(className: string, display: string) {
        const element : HTMLElement = document.getElementsByClassName(className)[0] as HTMLElement;
        if (element) {
            element.style.display = display;
        }
    }

    generateComponentFromType(componentType: string) {
        switch (componentType) {
            case COMPONENT_TYPE.LABEL:
                const label : ILabel = {
                    name: "label01",
                    type: COMPONENT_TYPE.LABEL, 
                    text: "title",
                    color: "#000",
                    font: "arial",
                    fontSize: 22,
                    left: 0,
                    top: 0
                }
                return label;

            case COMPONENT_TYPE.LINK:
                const link : ILink = {
                    name: "link01",
                    type: COMPONENT_TYPE.LINK,
                    text: "clickOnMe",
                    reference: "https://google.fr",
                    color: "#000",
                    font: "arial",
                    fontSize: 22,
                    left: 0,
                    top: 0
                }
                return link;

            case COMPONENT_TYPE.RATING:
                const rating : IRating = {
                    name: "rating01",
                    type: COMPONENT_TYPE.RATING,
                    text: "rate",
                    rating: 2,
                    left: 0,
                    top: 0
                }
                return rating;

            case COMPONENT_TYPE.DATAGRID:
                const datagrid : IDataGrid = {
                    name: "dataGrid01",
                    type: COMPONENT_TYPE.DATAGRID,
                    columns: [
                        { fieldName: "field01", headerName: "field01"}
                    ],
                    rowPerPage: 10,
                    width: 450,
                    height: 300,
                    left: 0,
                    top: 0
                }
                return datagrid;
            
            case COMPONENT_TYPE.LINECHART:
                const linechart : ILineChart = {
                    name: "lineChart01",
                    type: COMPONENT_TYPE.LINECHART,
                    nameAxisKey: "xAxis",
                    nameAxisLabel: "xAxis",
                    dataAxisKey: "yAxis",
                    dataAxisLabel: "yAxis",
                    strikeColor: "#ff7300",
                    tooltipEnabled: true,
                    horizontalGridEnabled: false,
                    verticalGridEnabled: false,
                    width: 450,
                    height: 300,
                    left: 100,
                    top: 0
                }
                return linechart;

            case COMPONENT_TYPE.AREACHART:
                const areaChart : IAreaChart = {
                    name: "areaChart01",
                    type: COMPONENT_TYPE.AREACHART,
                    nameAxisKey: "xAxis",
                    nameAxisLabel: "xAxis",
                    dataAxisKey: "yAxis",
                    dataAxisLabel: "yAxis",
                    title: "MyGraph",
                    strokeColor: "#0088FE",
                    strokeWidth: 2,
                    gradientStart: "rgba(0, 136, 254, 0.8)",
                    gradientEnd: "rgba(0, 136, 254, 0)",
                    width: 800,
                    height: 400,
                    left: 20,
                    top: 20
                };
                return areaChart;
            
            case COMPONENT_TYPE.BARCHART:
                const barChart : IBarChart = {
                    name: "barChart01",
                    type: COMPONENT_TYPE.BARCHART,
                    nameAxisLabel: "xAxis",
                    nameAxisKey: "xAxis",
                    dataAxisLabel: "yAxis",
                    dataAxisKey: "yAxis",
                    fillColor: "#387908",
                    width: 400,
                    height: 400,
                    left: 0,
                    top: 0
                };
                return barChart;
            
            case COMPONENT_TYPE.SCATTERCHART:
                const scatterChart : IScatterChart = {
                    name: "scatterChart01",
                    type: COMPONENT_TYPE.SCATTERCHART,
                    nameAxisKey: "xAxis",
                    nameAxisLabel: "xAxis",
                    nameAxisUnit: "",
                    dataAxisKey: "yAxis",
                    dataAxisLabel: "yAxis",
                    dataAxisUnit: "",
                    title: "MyGraph",
                    fillColor: "#387908",
                    width: 400,
                    height: 400,
                    left: 0,
                    top: 0
                };
                return scatterChart;

            case COMPONENT_TYPE.PIECHART:
                const pieChart : IPieChart = {
                    name: "pieChart01",
                    type: COMPONENT_TYPE.PIECHART,
                    nameAxisKey: "name",
                    nameAxisLabel: "name",
                    dataAxisKey: "dataAxis",
                    dataAxisLabel: "dataAxis",
                    width: 600,
                    height: 400,
                    top: 0,
                    left: 0
                };
                return pieChart;

            case COMPONENT_TYPE.RADARCHART:
                const radarChart : IRadarChart = {
                    name: "radarChart01",
                    type: COMPONENT_TYPE.RADARCHART,
                    title: "MyGraph",
                    nameAxisKey: "name",
                    nameAxisLabel: "name",
                    dataAxisKey: "data",
                    dataAxisLabel: "data",
                    fillColor: "#8884d8",
                    strokeColor: "#8884d8",
                    width: 600,
                    height: 400,
                    top: 0,
                    left: 0
                };
                return radarChart;

            case COMPONENT_TYPE.RADIALBARCHART:
                const radialBarChart : IRadialBarChart = {
                    name: "radialBarChart",
                    type: COMPONENT_TYPE.RADIALBARCHART,
                    nameAxisKey: "name",
                    nameAxisLabel: "name",
                    dataAxisKey: "data",
                    dataAxisLabel: "data",
                    width: 500,
                    height: 300,
                    left: 0,
                    top: 0
                };
                return radialBarChart;

            case COMPONENT_TYPE.TREEMAP:
                const treeMap: ITreeMap = {
                    name: "treeMap01",
                    type: COMPONENT_TYPE.TREEMAP,
                    nameAxisKey: "name",
                    nameAxisLabel: "name",
                    dataAxisKey: "data",
                    dataAxisLabel: "data",
                    title: "title",
                    width: 500,
                    height: 250,
                    left: 0,
                    top: 0
                };
                return treeMap;
        }
        
        return null;
    }

    selectExistingComponent(componentType: string) {
        const functions : {[key: string]: {category: Function, component: Function }} = {}
        functions[COMPONENT_TYPE.LABEL] = { category: this.clickOnSimple, component: this.clickOnLabel };
        functions[COMPONENT_TYPE.LINK] = { category: this.clickOnSimple, component: this.clickOnLink };
        functions[COMPONENT_TYPE.RATING] = { category: this.clickOnSimple, component: this.clickOnRating };
        functions[COMPONENT_TYPE.DATAGRID] = { category: this.clickOnSimple, component: this.clickOnDataGrid };

        functions[COMPONENT_TYPE.LINECHART] = { category: this.clickOnGraphic, component: this.clickOnLineChart };
        functions[COMPONENT_TYPE.AREACHART] = { category: this.clickOnGraphic, component: this.clickOnAreaChart };
        functions[COMPONENT_TYPE.BARCHART] = { category: this.clickOnGraphic, component: this.clickOnBarChart };
        functions[COMPONENT_TYPE.SCATTERCHART] = { category: this.clickOnGraphic, component: this.clickOnScatterChart };
        functions[COMPONENT_TYPE.PIECHART] = { category: this.clickOnGraphic, component: this.clickOnPieChart };
        functions[COMPONENT_TYPE.RADARCHART] = { category: this.clickOnGraphic, component: this.clickOnRadarChart };
        functions[COMPONENT_TYPE.RADIALBARCHART] = { category: this.clickOnGraphic, component: this.clickOnRadialBarChart };
        functions[COMPONENT_TYPE.TREEMAP] = { category: this.clickOnGraphic, component: this.clickOnTreeMap };

        functions[COMPONENT_TYPE.STACK] = { category: this.clickOnContainer, component: this.clickOnStack };


        const func = functions[componentType];
        func.category();
        func.component();
    }
}