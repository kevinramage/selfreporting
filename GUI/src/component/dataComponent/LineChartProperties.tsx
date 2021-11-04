import { Typography } from "@material-ui/core";
import { ChangeEvent, Component } from "react";
import { ILineChart } from "../../types/reportComponent";
import { onComponentChangeListener } from "../ReportOptions";

import "./LineChartProperties.css"

type LineChartPropertiesProps = {
    component: ILineChart,
    componentChangeListener: onComponentChangeListener;
}
type LineChartPropertiesState = {
    component: ILineChart,
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
            widthText: "",
            heightText: "",
            leftText: "",
            topText: "",
            componentChangeListener: props.componentChangeListener 
        };

        this.onNameChanged = this.onNameChanged.bind(this);
        this.onXAxisKeyChanged = this.onXAxisKeyChanged.bind(this);
        this.onXAxisLabelChanged = this.onXAxisLabelChanged.bind(this);
        this.onYAxisKeyChanged = this.onYAxisKeyChanged.bind(this);
        this.onYAxisLabelChanged = this.onYAxisLabelChanged.bind(this);
        /*
        this.onTooltipEnabledChanged = this.onTooltipEnabledChanged.bind(this);
        this.onTooltipEnabledChanged = this.onTooltipEnabledChanged.bind(this);
        this.onTooltipEnabledChanged = this.onTooltipEnabledChanged.bind(this);
        */
        this.onStrikeColorChanged = this.onStrikeColorChanged.bind(this);
        this.onWidthChanged = this.onWidthChanged.bind(this);
        this.onHeightChanged = this.onHeightChanged.bind(this);
        this.onLeftChanged = this.onLeftChanged.bind(this);
        this.onTopChanged = this.onTopChanged.bind(this);
    }

    render() {
        const { component, widthText, heightText, leftText, topText } = this.state;
        //const tooltipEnabled = component.tooltipEnabled ? component.tooltipEnabled : false;
        //const horizontalGridEnabled = component.horizontalGridEnabled ? component.horizontalGridEnabled : false;
        //const verticalGridEnabled = component.verticalGridEnabled ? component.verticalGridEnabled : false;
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
                    <input value={component.xAxisKey} onChange={this.onXAxisKeyChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">X Axis Label: </Typography>
                    <input value={component.xAxisLabel} onChange={this.onXAxisLabelChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">Y Axis Key: </Typography>
                    <input value={component.yAxisKey} onChange={this.onYAxisKeyChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">Y Axis Label: </Typography>
                    <input value={component.yAxisLabel} onChange={this.onYAxisLabelChanged} />
                </div>
                { /*
                <div>
                    <Typography className="propertyLabel">TooltipEnabled: </Typography>
                    <input value={tooltipEnabled} onChange={this.onTooltipEnabledChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">horizontalGridEnabled: </Typography>
                    <input value={horizontalGridEnabled} onChange={this.onLeftChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">verticalGridEnabled: </Typography>
                    <input value={verticalGridEnabled} onChange={this.onTopChanged} />
                </div>
                */ }
                <div>
                    <Typography className="propertyLabel">strikeColor: </Typography>
                    <input value={strikeColor} onChange={this.onStrikeColorChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">Width: </Typography>
                    <input value={widthText} onChange={this.onWidthChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">Height: </Typography>
                    <input value={heightText} onChange={this.onHeightChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">Left: </Typography>
                    <input value={leftText} onChange={this.onLeftChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">Top: </Typography>
                    <input value={topText} onChange={this.onTopChanged} />
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
    onXAxisKeyChanged(e: ChangeEvent<HTMLInputElement>) {
        const lineChart = this.state.component;
        lineChart.xAxisKey = e.target.value;
        this.setState({component: lineChart});
        this.state.componentChangeListener(lineChart);
    }
    onXAxisLabelChanged(e: ChangeEvent<HTMLInputElement>) {
        const lineChart = this.state.component;
        lineChart.xAxisLabel = e.target.value;
        this.setState({component: lineChart});
        this.state.componentChangeListener(lineChart);
    }
    onYAxisKeyChanged(e: ChangeEvent<HTMLInputElement>) {
        const lineChart = this.state.component;
        lineChart.yAxisKey = e.target.value;
        this.setState({component: lineChart});
        this.state.componentChangeListener(lineChart);
    }
    onYAxisLabelChanged(e: ChangeEvent<HTMLInputElement>) {
        const lineChart = this.state.component;
        lineChart.yAxisLabel = e.target.value;
        this.setState({component: lineChart});
        this.state.componentChangeListener(lineChart);
    }
    /*
    onTooltipEnabledChanged(e: ChangeEvent<HTMLInputElement>) {
        const link = this.state.component;
        link.color = e.target.value;
        this.setState({component: link});
        this.state.componentChangeListener(link);
    }
    */
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
}