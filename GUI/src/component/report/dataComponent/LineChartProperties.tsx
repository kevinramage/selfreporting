import { Typography } from "@material-ui/core";
import { ChangeEvent, Component } from "react";
import { IDataSource } from "../../../types/dataSource";
import { ILineChart, IReportComponent } from "../../../types/reportComponent";
import { DataSouceMapping } from "../DataSourceMapping";
import { onComponentChangeListener } from "../ReportOptions";

import "./BasicProperties.css"

type LineChartPropertiesProps = {
    component: ILineChart,
    dataSources: IDataSource[],
    componentChangeListener: onComponentChangeListener;
}
type LineChartPropertiesState = {
    component: ILineChart,
    dataSources: IDataSource[],
    widthText: string,
    heightText: string,
    leftText: string,
    topText: string,
    componentChangeListener: onComponentChangeListener;
};

export class LineChartProperties extends Component<LineChartPropertiesProps, LineChartPropertiesState> {

    constructor(props: LineChartPropertiesProps) {
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
        this.onTooltipEnabledChanged = this.onTooltipEnabledChanged.bind(this);
        this.onHorizontalGridEnabledChanged = this.onHorizontalGridEnabledChanged.bind(this);
        this.onVerticaEnabledChanged = this.onVerticaEnabledChanged.bind(this);
        this.onStrikeColorChanged = this.onStrikeColorChanged.bind(this);
        this.onWidthChanged = this.onWidthChanged.bind(this);
        this.onHeightChanged = this.onHeightChanged.bind(this);
        this.onLeftChanged = this.onLeftChanged.bind(this);
        this.onTopChanged = this.onTopChanged.bind(this);
        this.onComponentChanged = this.onComponentChanged.bind(this);
    }

    render() {
        const { component, dataSources, widthText, heightText, leftText, topText } = this.state;
        const tooltipEnabled = component.tooltipEnabled ? component.tooltipEnabled : false;
        const horizontalGridEnabled = component.horizontalGridEnabled ? component.horizontalGridEnabled : false;
        const verticalGridEnabled = component.verticalGridEnabled ? component.verticalGridEnabled : false;
        const strikeColor = component.strikeColor ? component.strikeColor : "";
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
                    <Typography className="propertyLabel">TooltipEnabled: </Typography>
                    <input checked={tooltipEnabled} type="checkbox" onChange={this.onTooltipEnabledChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">horizontalGridEnabled: </Typography>
                    <input checked={horizontalGridEnabled} type="checkbox" onChange={this.onHorizontalGridEnabledChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">verticalGridEnabled: </Typography>
                    <input checked={verticalGridEnabled} type="checkbox" onChange={this.onVerticaEnabledChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">strikeColor: </Typography>
                    <input value={strikeColor} type="color" onChange={this.onStrikeColorChanged} />
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
        const lineChart = this.state.component;
        lineChart.name = e.target.value;
        this.setState({component: lineChart});
        this.state.componentChangeListener(lineChart);
    }
    onXAxisLabelChanged(e: ChangeEvent<HTMLInputElement>) {
        const lineChart = this.state.component;
        lineChart.nameAxisLabel = e.target.value;
        this.setState({component: lineChart});
        this.state.componentChangeListener(lineChart);
    }
    onYAxisLabelChanged(e: ChangeEvent<HTMLInputElement>) {
        const lineChart = this.state.component;
        lineChart.dataAxisLabel = e.target.value;
        this.setState({component: lineChart});
        this.state.componentChangeListener(lineChart);
    }
    
    onTooltipEnabledChanged(e: ChangeEvent<HTMLInputElement>) {
        const lineChart = this.state.component;
        lineChart.tooltipEnabled = e.target.checked;
        this.setState({component: lineChart});
        this.state.componentChangeListener(lineChart);
    }
    onHorizontalGridEnabledChanged(e: ChangeEvent<HTMLInputElement>) {
        const lineChart = this.state.component;
        lineChart.horizontalGridEnabled = e.target.checked;
        this.setState({component: lineChart});
        this.state.componentChangeListener(lineChart);
    }
    onVerticaEnabledChanged(e: ChangeEvent<HTMLInputElement>) {
        const lineChart = this.state.component;
        lineChart.verticalGridEnabled = e.target.checked;
        this.setState({component: lineChart});
        this.state.componentChangeListener(lineChart);
    }

    onStrikeColorChanged(e: ChangeEvent<HTMLInputElement>) {
        const lineChart = this.state.component;
        lineChart.strikeColor = e.target.value;
        this.setState({component: lineChart});
        this.state.componentChangeListener(lineChart);
    }
    onWidthChanged(e: ChangeEvent<HTMLInputElement>) {
        const value = Number.parseInt(e.target.value);
        if (!isNaN(value)) {
            const lineChart = this.state.component;
            lineChart.width = value;
            this.setState({component: lineChart});
            this.state.componentChangeListener(lineChart);
        }
        this.setState({ widthText: e.target.value });
    }
    onHeightChanged(e: ChangeEvent<HTMLInputElement>) {
        const value = Number.parseInt(e.target.value);
        if (!isNaN(value)) {
            const lineChart = this.state.component;
            lineChart.height = value;
            this.setState({component: lineChart});
            this.state.componentChangeListener(lineChart);
        }
        this.setState({heightText: e.target.value});
    }
    onLeftChanged(e: ChangeEvent<HTMLInputElement>) {
        const value = Number.parseInt(e.target.value);
        if (!isNaN(value)) {
            const lineChart = this.state.component;
            lineChart.left = value;
            this.setState({component: lineChart});
            this.state.componentChangeListener(lineChart);
        }
        this.setState({leftText: e.target.value})
    }
    onTopChanged(e: ChangeEvent<HTMLInputElement>) {
        const value = Number.parseInt(e.target.value);
        if (!isNaN(value)) {
            const lineChart = this.state.component;
            lineChart.top = value;
            this.setState({component: lineChart});
            this.state.componentChangeListener(lineChart);
        }
        this.setState({topText: e.target.value})
    }

    onComponentChanged(component: IReportComponent | null) {
        this.state.componentChangeListener(component);
    }
}