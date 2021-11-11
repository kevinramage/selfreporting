import { Typography } from "@material-ui/core";
import { ChangeEvent, Component } from "react";
import { IDataSource } from "../../../types/dataSource";
import { IPieChart, IReportComponent } from "../../../types/reportComponent";
import { DataSouceMapping } from "../DataSourceMapping";
import { onComponentChangeListener } from "../ReportOptions";

import "./BasicProperties.css"

type PieChartPropertiesProps = {
    component: IPieChart,
    dataSources: IDataSource[],
    componentChangeListener: onComponentChangeListener;
}
type PieChartPropertiesState = {
    component: IPieChart,
    dataSources: IDataSource[],
    widthText: string,
    heightText: string,
    leftText: string,
    topText: string,
    componentChangeListener: onComponentChangeListener;
};

export class PieChartProperties extends Component<PieChartPropertiesProps, PieChartPropertiesState> {

    constructor(props: PieChartPropertiesProps) {
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
        this.onNameAxisLabelChanged = this.onNameAxisLabelChanged.bind(this);
        this.onDataAxisLabelChanged = this.onDataAxisLabelChanged.bind(this);
        this.onWidthChanged = this.onWidthChanged.bind(this);
        this.onHeightChanged = this.onHeightChanged.bind(this);
        this.onLeftChanged = this.onLeftChanged.bind(this);
        this.onTopChanged = this.onTopChanged.bind(this);
        this.onComponentChanged = this.onComponentChanged.bind(this);
    }

    render() {
        const { component, dataSources, widthText, heightText, leftText, topText } = this.state;
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
                    <input value={component.nameAxisLabel} onChange={this.onNameAxisLabelChanged} />
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