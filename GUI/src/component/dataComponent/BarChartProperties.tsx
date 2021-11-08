import { Typography } from "@material-ui/core";
import { ChangeEvent, Component } from "react";
import { IDataSource } from "../../types/dataSource";
import { IBarChart, IReportComponent } from "../../types/reportComponent";
import { DataSouceMapping } from "../DataSourceMapping";
import { onComponentChangeListener } from "../ReportOptions";

import "./BarChartProperties.css"

type BarChartPropertiesProps = {
    component: IBarChart,
    dataSources: IDataSource[],
    componentChangeListener: onComponentChangeListener;
}
type BarChartPropertiesState = {
    component: IBarChart,
    dataSources: IDataSource[],
    widthText: string,
    heightText: string,
    leftText: string,
    topText: string,
    componentChangeListener: onComponentChangeListener;
};

export class BarChartProperties extends Component<BarChartPropertiesProps, BarChartPropertiesState> {

    constructor(props: BarChartPropertiesProps) {
        super(props);
        this.state = { 
            component: props.component,
            dataSources: props.dataSources,
            widthText: props.component.width ? props.component.width + "" : "",
            heightText: props.component.height ? props.component.height + "" : "",
            leftText: props.component.left ? props.component.left + "" : "",
            topText: props.component.top ? props.component.top + "" : "",
            componentChangeListener: props.componentChangeListener
        };

        this.onNameChanged = this.onNameChanged.bind(this);
        this.onXAxisLabelChanged = this.onXAxisLabelChanged.bind(this);
        this.onYAxisLabelChanged = this.onYAxisLabelChanged.bind(this);
        this.onFillColorChanged = this.onFillColorChanged.bind(this);
        this.onWidthChanged = this.onWidthChanged.bind(this);
        this.onHeightChanged = this.onHeightChanged.bind(this);
        this.onLeftChanged = this.onLeftChanged.bind(this);
        this.onTopChanged = this.onTopChanged.bind(this);
        this.onComponentChanged = this.onComponentChanged.bind(this);
    }

    render() {
        const { component, dataSources, widthText, heightText, leftText, topText } = this.state;
        const fillColor = component.fillColor ? component.fillColor : "";
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
                    <Typography className="propertyLabel">X Axis Key: </Typography>
                    <DataSouceMapping component={component} dataSources={dataSources} axisType="X"
                        onComponentChange={this.onComponentChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">X Axis Label: </Typography>
                    <input value={component.nameAxisLabel} onChange={this.onXAxisLabelChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">Y Axis Key: </Typography>
                    <DataSouceMapping component={component} dataSources={dataSources} axisType="Y"
                        onComponentChange={this.onComponentChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">Y Axis Label: </Typography>
                    <input value={component.dataAxisLabel} onChange={this.onYAxisLabelChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">Stroke color: </Typography>
                    <input value={fillColor} type="color" onChange={this.onFillColorChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">Width: </Typography>
                    <input value={widthText} type="number" min="0" step="5" onChange={this.onWidthChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">Height: </Typography>
                    <input value={heightText} type="number" min="0" step="5" onChange={this.onHeightChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">Left: </Typography>
                    <input value={leftText} type="number" min="0" step="5" onChange={this.onLeftChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">Top: </Typography>
                    <input value={topText} type="number" min="0" step="5" onChange={this.onTopChanged} />
                </div>
            </div>
        )
    }

    onNameChanged(e: ChangeEvent<HTMLInputElement>) {
        const barChart = this.state.component;
        barChart.name = e.target.value;
        this.setState({component: barChart});
        this.state.componentChangeListener(barChart);
    }
    onXAxisLabelChanged(e: ChangeEvent<HTMLInputElement>) {
        const barChart = this.state.component;
        barChart.nameAxisKey = e.target.value;
        this.setState({component: barChart});
        this.state.componentChangeListener(barChart);
    }
    onYAxisLabelChanged(e: ChangeEvent<HTMLInputElement>) {
        const barChart = this.state.component;
        barChart.dataAxisKey = e.target.value;
        this.setState({component: barChart});
        this.state.componentChangeListener(barChart);
    }
    onFillColorChanged(e: ChangeEvent<HTMLInputElement>) {
        const barChart = this.state.component;
        barChart.fillColor = e.target.value;
        this.setState({component: barChart});
        this.state.componentChangeListener(barChart);
    }
    onWidthChanged(e: ChangeEvent<HTMLInputElement>) {
        const value = Number.parseInt(e.target.value);
        if (!isNaN(value)) {
            const barChart = this.state.component;
            barChart.width = value;
            this.setState({component: barChart});
            this.state.componentChangeListener(barChart);
        }
        this.setState({ widthText: e.target.value });
    }
    onHeightChanged(e: ChangeEvent<HTMLInputElement>) {
        const value = Number.parseInt(e.target.value);
        if (!isNaN(value)) {
            const barChart = this.state.component;
            barChart.height = value;
            this.setState({component: barChart});
            this.state.componentChangeListener(barChart);
        }
        this.setState({heightText: e.target.value});
    }
    onLeftChanged(e: ChangeEvent<HTMLInputElement>) {
        const value = Number.parseInt(e.target.value);
        if (!isNaN(value)) {
            const barChart = this.state.component;
            barChart.left = value;
            this.setState({component: barChart});
            this.state.componentChangeListener(barChart);
        }
        this.setState({leftText: e.target.value})
    }
    onTopChanged(e: ChangeEvent<HTMLInputElement>) {
        const value = Number.parseInt(e.target.value);
        if (!isNaN(value)) {
            const barChart = this.state.component;
            barChart.top = value;
            this.setState({component: barChart});
            this.state.componentChangeListener(barChart);
        }
        this.setState({topText: e.target.value})
    }

    onComponentChanged(component: IReportComponent | null) {
        this.state.componentChangeListener(component);
    }
}