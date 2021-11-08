import { Typography } from "@material-ui/core";
import { ChangeEvent, Component } from "react";
import { IDataSource } from "../../types/dataSource";
import { IAreaChart, IReportComponent } from "../../types/reportComponent";
import { DataSouceMapping } from "../DataSourceMapping";
import { onComponentChangeListener } from "../ReportOptions";

import "./AreaChartProperties.css"

type AreaChartPropertiesProps = {
    component: IAreaChart,
    dataSources: IDataSource[],
    componentChangeListener: onComponentChangeListener;
}
type AreaChartPropertiesState = {
    component: IAreaChart,
    dataSources: IDataSource[],
    widthText: string,
    heightText: string,
    leftText: string,
    topText: string,
    strokeWidthText: string,
    componentChangeListener: onComponentChangeListener;
};

export class AreaChartProperties extends Component<AreaChartPropertiesProps, AreaChartPropertiesState> {

    constructor(props: AreaChartPropertiesProps) {
        super(props);
        this.state = { 
            component: props.component,
            dataSources: props.dataSources,
            widthText: props.component.width ? props.component.width + "" : "",
            heightText: props.component.height ? props.component.height + "" : "",
            leftText: props.component.left ? props.component.left + "" : "",
            topText: props.component.top ? props.component.top + "" : "",
            strokeWidthText: props.component.strokeWidth ? props.component.strokeWidth + "" : "",
            componentChangeListener: props.componentChangeListener
        };

        this.onNameChanged = this.onNameChanged.bind(this);
        this.onTitleChanged = this.onTitleChanged.bind(this);
        this.onXAxisLabelChanged = this.onXAxisLabelChanged.bind(this);
        this.onYAxisLabelChanged = this.onYAxisLabelChanged.bind(this);
        this.onStrokeColorChanged = this.onStrokeColorChanged.bind(this);
        this.onStrokeWidthChanged = this.onStrokeWidthChanged.bind(this);
        this.onGradientStartChanged = this.onGradientStartChanged.bind(this);
        this.onGradientEndChanged = this.onGradientEndChanged.bind(this);
        this.onWidthChanged = this.onWidthChanged.bind(this);
        this.onHeightChanged = this.onHeightChanged.bind(this);
        this.onLeftChanged = this.onLeftChanged.bind(this);
        this.onTopChanged = this.onTopChanged.bind(this);
        this.onComponentChanged = this.onComponentChanged.bind(this);
    }

    render() {
        const { component, dataSources, widthText, heightText, leftText, topText } = this.state;
        const strokeColor = component.strokeColor ? component.strokeColor : "";
        const strokeWidth = component.strokeWidth ? component.strokeWidth : 2;
        const gradientStart = component.gradientStart ? component.gradientStart : "";
        const gradientEnd = component.gradientEnd ? component.gradientEnd : "";
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
                    <Typography className="propertyLabel">Title: </Typography>
                    <input value={component.title} onChange={this.onTitleChanged}/>
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
                    <input value={strokeColor} type="color" onChange={this.onStrokeColorChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">Stroke width: </Typography>
                    <input value={strokeWidth} type="number" onChange={this.onStrokeWidthChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">Gradient start: </Typography>
                    <input value={gradientStart} type="color" onChange={this.onGradientStartChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">Gradient end: </Typography>
                    <input value={gradientEnd} type="color" onChange={this.onGradientEndChanged} />
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
        const areaChart = this.state.component;
        areaChart.name = e.target.value;
        this.setState({component: areaChart});
        this.state.componentChangeListener(areaChart);
    }
    onTitleChanged(e: ChangeEvent<HTMLInputElement>) {
        const areaChart = this.state.component;
        areaChart.title = e.target.value;
        this.setState({component: areaChart});
        this.state.componentChangeListener(areaChart);
    }
    onXAxisLabelChanged(e: ChangeEvent<HTMLInputElement>) {
        const areaChart = this.state.component;
        areaChart.nameAxisKey = e.target.value;
        this.setState({component: areaChart});
        this.state.componentChangeListener(areaChart);
    }
    onYAxisLabelChanged(e: ChangeEvent<HTMLInputElement>) {
        const areaChart = this.state.component;
        areaChart.dataAxisKey = e.target.value;
        this.setState({component: areaChart});
        this.state.componentChangeListener(areaChart);
    }
    onStrokeColorChanged(e: ChangeEvent<HTMLInputElement>) {
        const areaChart = this.state.component;
        areaChart.strokeColor = e.target.value;
        this.setState({component: areaChart});
        this.state.componentChangeListener(areaChart);
    }
    onStrokeWidthChanged(e: ChangeEvent<HTMLInputElement>) {
        const value = Number.parseInt(e.target.value);
        if (!isNaN(value)) {
            const areaChart = this.state.component;
            areaChart.strokeWidth = value;
            this.setState({component: areaChart});
            this.state.componentChangeListener(areaChart);
        }
        this.setState({ strokeWidthText: e.target.value })
    }
    onGradientStartChanged(e: ChangeEvent<HTMLInputElement>) {
        const areaChart = this.state.component;
        areaChart.gradientStart = e.target.value;
        this.setState({component: areaChart});
        this.state.componentChangeListener(areaChart);
    }
    onGradientEndChanged(e: ChangeEvent<HTMLInputElement>) {
        const areaChart = this.state.component;
        areaChart.gradientEnd = e.target.value;
        this.setState({component: areaChart});
        this.state.componentChangeListener(areaChart);
    }
    onWidthChanged(e: ChangeEvent<HTMLInputElement>) {
        const value = Number.parseInt(e.target.value);
        if (!isNaN(value)) {
            const areaChart = this.state.component;
            areaChart.width = value;
            this.setState({component: areaChart});
            this.state.componentChangeListener(areaChart);
        }
        this.setState({ widthText: e.target.value });
    }
    onHeightChanged(e: ChangeEvent<HTMLInputElement>) {
        const value = Number.parseInt(e.target.value);
        if (!isNaN(value)) {
            const areaChart = this.state.component;
            areaChart.height = value;
            this.setState({component: areaChart});
            this.state.componentChangeListener(areaChart);
        }
        this.setState({heightText: e.target.value});
    }
    onLeftChanged(e: ChangeEvent<HTMLInputElement>) {
        const value = Number.parseInt(e.target.value);
        if (!isNaN(value)) {
            const areaChart = this.state.component;
            areaChart.left = value;
            this.setState({component: areaChart});
            this.state.componentChangeListener(areaChart);
        }
        this.setState({leftText: e.target.value})
    }
    onTopChanged(e: ChangeEvent<HTMLInputElement>) {
        const value = Number.parseInt(e.target.value);
        if (!isNaN(value)) {
            const areaChart = this.state.component;
            areaChart.top = value;
            this.setState({component: areaChart});
            this.state.componentChangeListener(areaChart);
        }
        this.setState({topText: e.target.value})
    }

    onComponentChanged(component: IReportComponent | null) {
        this.state.componentChangeListener(component);
    }
}