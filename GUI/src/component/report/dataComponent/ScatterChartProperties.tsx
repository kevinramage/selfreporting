import { Typography } from "@material-ui/core";
import { ChangeEvent, Component } from "react";
import { IDataSource } from "../../../types/dataSource";
import { IReportComponent, IScatterChart } from "../../../types/reportComponent";
import { DataSouceMapping } from "../DataSourceMapping";
import { onComponentChangeListener } from "../ReportOptions";

import "./BasicProperties.css"

type ScatterChartPropertiesProps = {
    component: IScatterChart,
    dataSources: IDataSource[],
    componentChangeListener: onComponentChangeListener;
}
type ScatterChartPropertiesState = {
    component: IScatterChart,
    dataSources: IDataSource[],
    widthText: string,
    heightText: string,
    leftText: string,
    topText: string,
    componentChangeListener: onComponentChangeListener;
};

export class ScatterChartProperties extends Component<ScatterChartPropertiesProps, ScatterChartPropertiesState> {

    constructor(props: ScatterChartPropertiesProps) {
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
        this.onTitleChanged = this.onTitleChanged.bind(this);
        this.onNameAxisLabelChanged = this.onNameAxisLabelChanged.bind(this);
        this.onDataAxisLabelChanged = this.onDataAxisLabelChanged.bind(this);
        this.onFillColorChanged = this.onFillColorChanged.bind(this);
        this.onNameAxisUnitChanged = this.onNameAxisUnitChanged.bind(this);
        this.onDataAxisUnitChanged = this.onDataAxisUnitChanged.bind(this);
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
                    <input value={component.nameAxisLabel} onChange={this.onNameAxisLabelChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">X Axis Unit: </Typography>
                    <input value={component.nameAxisUnit} onChange={this.onNameAxisUnitChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">Y Axis Key: </Typography>
                    <DataSouceMapping component={component} dataSources={dataSources} axisType="Y"
                        onComponentChange={this.onComponentChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">Y Axis Label: </Typography>
                    <input value={component.dataAxisLabel} onChange={this.onDataAxisLabelChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">Y Axis Unit: </Typography>
                    <input value={component.dataAxisUnit} onChange={this.onDataAxisUnitChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">Fill color: </Typography>
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
        const scatterChart = this.state.component;
        scatterChart.name = e.target.value;
        this.setState({component: scatterChart});
        this.state.componentChangeListener(scatterChart);
    }
    onTitleChanged(e: ChangeEvent<HTMLInputElement>) {
        const scatterChart = this.state.component;
        scatterChart.title = e.target.value;
        this.setState({component: scatterChart});
        this.state.componentChangeListener(scatterChart);
    }
    onNameAxisLabelChanged(e: ChangeEvent<HTMLInputElement>) {
        const scatterChart = this.state.component;
        scatterChart.nameAxisKey = e.target.value;
        this.setState({component: scatterChart});
        this.state.componentChangeListener(scatterChart);
    }
    onDataAxisLabelChanged(e: ChangeEvent<HTMLInputElement>) {
        const scatterChart = this.state.component;
        scatterChart.dataAxisKey = e.target.value;
        this.setState({component: scatterChart});
        this.state.componentChangeListener(scatterChart);
    }
    onNameAxisUnitChanged(e: ChangeEvent<HTMLInputElement>) {
        const scatterChart = this.state.component;
        scatterChart.nameAxisUnit = e.target.value;
        this.setState({component: scatterChart});
        this.state.componentChangeListener(scatterChart);
    }
    onDataAxisUnitChanged(e: ChangeEvent<HTMLInputElement>) {
        const scatterChart = this.state.component;
        scatterChart.dataAxisUnit = e.target.value;
        this.setState({component: scatterChart});
        this.state.componentChangeListener(scatterChart);
    }
    onFillColorChanged(e: ChangeEvent<HTMLInputElement>) {
        const scatterChart = this.state.component;
        scatterChart.fillColor = e.target.value;
        this.setState({component: scatterChart});
        this.state.componentChangeListener(scatterChart);
    }
    onWidthChanged(e: ChangeEvent<HTMLInputElement>) {
        const value = Number.parseInt(e.target.value);
        if (!isNaN(value)) {
            const scatterChart = this.state.component;
            scatterChart.width = value;
            this.setState({component: scatterChart});
            this.state.componentChangeListener(scatterChart);
        }
        this.setState({ widthText: e.target.value });
    }
    onHeightChanged(e: ChangeEvent<HTMLInputElement>) {
        const value = Number.parseInt(e.target.value);
        if (!isNaN(value)) {
            const scatterChart = this.state.component;
            scatterChart.height = value;
            this.setState({component: scatterChart});
            this.state.componentChangeListener(scatterChart);
        }
        this.setState({heightText: e.target.value});
    }
    onLeftChanged(e: ChangeEvent<HTMLInputElement>) {
        const value = Number.parseInt(e.target.value);
        if (!isNaN(value)) {
            const scatterChart = this.state.component;
            scatterChart.left = value;
            this.setState({component: scatterChart});
            this.state.componentChangeListener(scatterChart);
        }
        this.setState({leftText: e.target.value})
    }
    onTopChanged(e: ChangeEvent<HTMLInputElement>) {
        const value = Number.parseInt(e.target.value);
        if (!isNaN(value)) {
            const scatterChart = this.state.component;
            scatterChart.top = value;
            this.setState({component: scatterChart});
            this.state.componentChangeListener(scatterChart);
        }
        this.setState({topText: e.target.value})
    }

    onComponentChanged(component: IReportComponent | null) {
        this.state.componentChangeListener(component);
    }
}