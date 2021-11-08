import { Component } from "react";
import { COMPONENT_TYPE, IAreaChart, IBarChart, IDataGrid, ILabel, ILineChart, ILink, IPieChart, IRadarChart, IRadialBarChart, IRating, IReportComponent, IScatterChart, IStack, ITreeMap, ORIENTATION_TYPE } from "../types/reportComponent";
import { DataGrid } from '@mui/x-data-grid';
import { Link, Typography } from "@material-ui/core";
import { Rating, Stack } from "@mui/material";
import { ResponsiveStyleValue } from "@mui/system";
import { LineChart, Tooltip, XAxis, Line, BarChart } from "recharts";
import { CartesianGrid } from "recharts";
import { YAxis } from "recharts";
import { v4 } from "uuid";
import { AreaChart } from "recharts";
import { Label } from "recharts";
import { Area } from "recharts";
import { Bar } from "recharts";
import { LabelList } from "recharts";
import { ScatterChart } from "recharts";
import { Legend } from "recharts";
import { Scatter } from "recharts";
import { ResponsiveContainer } from "recharts";
import { PieChart } from "recharts";
import { Pie } from "recharts";
import { Cell } from "recharts";
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { RadarChart } from "recharts";
import { PolarGrid } from "recharts";
import { PolarAngleAxis } from "recharts";
import { PolarRadiusAxis } from "recharts";
import { Radar } from "recharts";
import { RadialBarChart } from "recharts";
import { RadialBar } from "recharts";
import { Treemap } from "recharts";

type ReportPresentationProps = {
    reportComponent: IReportComponent | null;
};
type ReportPresentationState = {
    reportComponent: IReportComponent | null;
};

export class ReportPresentation extends Component<ReportPresentationProps,ReportPresentationState> {

    constructor(props: ReportPresentationProps) {
        super(props);
        this.state = {
            reportComponent: props.reportComponent
        }
    }

    shouldComponentUpdate(nextProps: Readonly<ReportPresentationProps>, nextState: Readonly<ReportPresentationState>, nextContext: any) : boolean{
        
        const nextPropsType = nextProps.reportComponent ? nextProps.reportComponent.type : undefined;
        const statePropsType = this.state.reportComponent ? this.state.reportComponent.type : undefined;

        // Create component
        if (nextProps.reportComponent !== undefined && this.state.reportComponent === null) {
            const target = Object.assign({}, nextProps.reportComponent);
            this.setState({ reportComponent: target });
            return true;
        }

        // Delete component
        else if ((nextProps.reportComponent === undefined || nextProps.reportComponent === null) && this.state.reportComponent !== null) {
            this.setState({ reportComponent: null });
            this.forceUpdate();
            return true;
        }

        // Update component (Type)
        else if (nextPropsType !== statePropsType && nextPropsType !== undefined && statePropsType !== undefined) {
            const target = Object.assign({}, nextProps.reportComponent);
            this.setState({ reportComponent: target });
            return true;
        }
        
        // Update component (Properties)
        else if (nextPropsType === statePropsType && nextPropsType !== undefined) {

            const isStateUpToDate = this.shallowEqual(this.state.reportComponent, nextProps.reportComponent);
            if (!isStateUpToDate) {
                const target = Object.assign({}, nextProps.reportComponent);
                this.setState({ reportComponent: target });
                return true;
            }
        }

        return false;
    }

    shallowEqual(object1: any, object2: any) {
        if (object1 === null || object2 === null ) { return false; }
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);
        if (keys1.length !== keys2.length) {
          return false;
        }
        for (let key of keys1) {
          if (object1[key] !== object2[key]) {
            return false;
          }
        }
        return true;
      }

    render() {
        if (this.state.reportComponent && this.state.reportComponent) {
            return this.renderComponent(this.state.reportComponent);
        } else {
            return <div></div>
        }
    }

    private renderComponent(component: IReportComponent) {
        if (component.type === COMPONENT_TYPE.DATAGRID) {
            return this.renderDataGrid(component as IDataGrid);
        } else if (component.type === COMPONENT_TYPE.LABEL) {
            return this.renderLabel(component as ILabel);
        } else if (component.type === COMPONENT_TYPE.RATING) {
            return this.renderRating(component as IRating);
        } else if (component.type === COMPONENT_TYPE.LINK) {
            return this.renderLink(component as ILink);
        } else if (component.type === COMPONENT_TYPE.STACK) {
            return this.renderStack(component as IStack);
        } else if (component.type === COMPONENT_TYPE.LINECHART) {
            return this.renderLineChart(component as ILineChart);
        } else if (component.type === COMPONENT_TYPE.AREACHART) {
            return this.renderAreaChart(component as IAreaChart);
        } else if (component.type === COMPONENT_TYPE.BARCHART) {
            return this.renderBarChart(component as IBarChart);
        } else if (component.type === COMPONENT_TYPE.SCATTERCHART) {
            return this.renderScatterChart(component as IScatterChart);
        } else if (component.type === COMPONENT_TYPE.PIECHART) {
            return this.renderPieChart(component as IPieChart);
        } else if (component.type === COMPONENT_TYPE.RADARCHART) {
            return this.renderRadarChart(component as IRadarChart);
        } else if (component.type === COMPONENT_TYPE.RADIALBARCHART) {
            return this.renderRadialBarChart(component as IRadialBarChart);
        } else if (component.type === COMPONENT_TYPE.TREEMAP) {
            return this.renderTreeMap(component as ITreeMap);
        } else {
            return <div></div>
        }
    }

    private renderLabel(component: ILabel) {
        const font = component.font || "Segoe";
        const fontSize = component.fontSize || 22;
        const color = component.color || "#000";
        let style : React.CSSProperties = {position: "absolute", color: color, fontFamily: font, fontSize: fontSize};
        if (component.left) {
            style.left = component.left;
        }
        if (component.top) {
            style.top = component.top;
        }
        return <Typography style={style}>{component.text}</Typography>
    }

    private renderRating(component: IRating) {
        let style : React.CSSProperties = { position: "absolute" };
        if (component.left) { style.left = component.left; }
        if (component.top) { style.top = component.top; }
        return (
            <div style={style}>
            <Typography component="legend">{component.text}</Typography>
            <Rating name={component.text} value={component.rating} disabled></Rating>
            </div>
        )
    }

    private renderLink(component: ILink) {
        const font = component.font || "Segoe";
        const fontSize = component.fontSize || 22;
        const color = component.color || "#000";
        let style : React.CSSProperties = {position: "absolute", color: color, fontFamily: font, fontSize: fontSize};
        if (component.left) {
            style.left = component.left;
        }
        if (component.top) {
            style.top = component.top;
        }
        return <Link style={style} href={component.reference}>{component.text}</Link>
    }

    private renderDataGrid(component: IDataGrid) {
        let rows = component.data;
        const columns = this.getDataGridColumn(component);
        const left = component.left || 0;
        const top = component.top || 0;
        const width = component.width || 450;
        const height = component.height || 300;
        const style : React.CSSProperties = {
            left: left, 
            top: top,
            width: width,
            height: height
        };

        // Generate fake data
        if (rows === undefined) {
            rows = this.generateDataGridFakeData(component);
        }

        // Generate rows id
        this.generateDataGridRowId(rows);

        return <DataGrid style={style} columns={columns} rows={rows}></DataGrid>
    }

    private getDataGridColumn(component: IDataGrid) {
        return component.columns.map(c => {
            let columnData : any = {
                field: c.fieldName,
                headerName: c.headerName
            }
            if (c.width) { columnData.width = c.width } else { columnData.width = "150"; }
            if (c.description) { columnData.description = c.description } ///TODO Throw an error in console
            return columnData;
        })
    }

    private generateDataGridRowId(rows: any[]) {
        for (var i = 0; i < rows.length; i++) {
            const obj : {[key: string]: string} = rows[i];
            if (obj.id === undefined) {
                obj.id = v4();
            }
        }
    }

    private generateDataGridFakeData(component: IDataGrid) {
        const data : any[] = [];
        for (var i = 0; i < 10; i++) {
            const obj : {[key: string]: number} = {};
            for (var j = 0; j < component.columns.length; j++) {
                const number = Math.trunc(Math.random() * 100);
                obj[component.columns[j].fieldName] = number;
            }
            data.push(obj);
        }
        return data;
    }

    private renderLineChart(component: ILineChart) {
        const width = component.width || 600;
        const height = component.height || 400;
        const strikeColor = component.strikeColor || "#ff7300";
        const tooltipEnabled = component.tooltipEnabled || true;
        const horizontalGridEnabled = component.tooltipEnabled || false;
        const verticalGridEnabled = component.verticalGridEnabled || false;
        let nameAxisKey = component.nameAxisKey;
        let dataAxisKey = component.dataAxisKey;
        let data = component.data;
        if (data) {
            nameAxisKey = this.updateComponentAxis(component.nameAxisKey);
            dataAxisKey = this.updateComponentAxis(component.dataAxisKey);
        } else {
            data = this.generateLineChartFakeData(component);
        }

        let tooltip = null;
        if (tooltipEnabled) {
            tooltip = <Tooltip
                wrapperStyle={{ borderColor: 'white', boxShadow: '2px 2px 3px 0px rgb(204, 204, 204)' }}
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                labelStyle={{ fontWeight: 'bold', color: '#666666' }} />
        }

        let left : number = 0;
        if (component.left) {
            left = component.left;
        }
        let top = 0;
        if (component.top) {
            top = component.top;
        }

        return (
            <LineChart width={width} height={height} data={data} margin={{ left: left, top: top }}>
            
            <CartesianGrid horizontal={horizontalGridEnabled} vertical={verticalGridEnabled} />
            <XAxis domain={['auto', 'auto']} dataKey={nameAxisKey} label={component.nameAxisLabel} />
            <YAxis domain={['auto', 'auto']} label={component.dataAxisLabel} />
            { tooltip }
            <Line dataKey={dataAxisKey} stroke={strikeColor} dot={false} />
            
            </LineChart>
        )
    }

    private generateLineChartFakeData(component: ILineChart) {
        const data : any[] = [];
        for (var i = 0; i < 10; i++) {
            const number = Math.trunc(Math.random() * 100);
            const obj : {[key: string]: number} = {};
            obj[component.nameAxisKey] = (i+1);
            obj[component.dataAxisKey] = number;
            data.push(obj);
        }
        return data;
    }

    private updateComponentAxis(axis: string) {
        if (axis.startsWith("{") && axis.endsWith("}")) {
            return axis.substr(1, axis.length - 2).split(".")[1];
        } else {
            return axis;
        }
    }

    private renderAreaChart(component: IAreaChart) {
        let data = component.data;
        const strokeColor = component.strokeColor ? component.strokeColor : "#0088FE";
        const strokeWidth = component.strokeWidth ? component.strokeWidth : 2;
        const gradientStart = component.gradientStart ? component.gradientStart : "rgba(0, 136, 254, 0.8)";
        const gradientEnd = component.gradientEnd ? component.gradientEnd : "rgba(0, 136, 254, 0)";
        const width = component.width ? component.width : 800;
        const height = component.height ? component.height : 400;
        const top = component.top ? component.top : 0;
        const left = component.left ? component.left : 0;
        let nameAxisKey = component.nameAxisKey; 
        let dataAxisKey = component.dataAxisKey;
        if (data) {
            nameAxisKey = this.updateComponentAxis(component.nameAxisKey);
            dataAxisKey = this.updateComponentAxis(component.dataAxisKey);
        } else {
            data = this.generateAreaChartFakeData(component)
        }

        return (
            <AreaChart width={width} height={height} data={data} margin={{ top: top, left: left }}>
            <defs>
              <linearGradient id="MyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={gradientStart} />
                <stop offset="95%" stopColor={gradientEnd} />
              </linearGradient>
            </defs>
            <XAxis dataKey={nameAxisKey} label={component.nameAxisLabel}>
              { component.title ? ( <Label position="insideBottom" value={component.title} /> ) : null}
            </XAxis>
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey={dataAxisKey} label={component.dataAxisLabel} stroke={strokeColor} strokeWidth={strokeWidth} fillOpacity="1" fill="url(#MyGradient)" dot />
          </AreaChart>
        )
    }

    private generateAreaChartFakeData(component: IAreaChart) {
        const data = [];
        for (var i = 0; i < 10; i++) {
            const obj : {[key: string]: number} = {};
            obj[component.nameAxisKey] = Math.trunc(Math.random() * 30);
            obj[component.dataAxisKey] = Math.trunc(Math.random() * 30);
            data.push(obj);
        }
        return data;
    }

    private renderBarChart(component: IBarChart) {
        const width = component.width ? component.width : 400;
        const height = component.height ? component.height : 400;
        const top = component.top ? component.top : 0;
        const left = component.left ? component.left : 0;
        const fillColor = component.fillColor ? component.fillColor : "#387908";
        let nameAxisKey = component.nameAxisKey;
        let dataAxisKey = component.dataAxisKey;
        let data = component.data;
        if (data) {
            nameAxisKey = this.updateComponentAxis(component.nameAxisKey);
            dataAxisKey = this.updateComponentAxis(component.dataAxisKey);
        } else {
            data = this.generateBarChartFakeData(component);
        }

        return ( 
        <BarChart width={width} height={height} data={data} margin={{ top: top, left: left }} layout="vertical">
            <XAxis type="number" />
            <YAxis dataKey={nameAxisKey} label={component.dataAxisLabel} type="category" />
            <Tooltip />
            <Bar dataKey={dataAxisKey} label={component.nameAxisLabel} fill={fillColor}>
              <LabelList position="right" />
            </Bar>
        </BarChart>
        )
    }

    private generateBarChartFakeData(component: IBarChart) {
        const data = [];
        for (var i = 0; i < 10; i++) {
            const obj : {[key: string]: number} = {};
            obj[component.nameAxisKey] = Math.trunc(Math.random() * 30);
            obj[component.dataAxisKey] = Math.trunc(Math.random() * 30);
            data.push(obj);
        }
        return data;
    }

    private renderScatterChart(component: IScatterChart) {
        const width = component.width ? component.width : 400;
        const height = component.height ? component.height : 400;
        const top = component.top ? component.top : 0;
        const left = component.left ? component.left : 0;
        const fillColor = component.fillColor ? component.fillColor : "#387908";

        let data = component.data;
        let nameAxisKey = component.nameAxisKey;
        let dataAxisKey = component.dataAxisKey;
        if (data) {
            nameAxisKey = this.updateComponentAxis(component.nameAxisKey);
            dataAxisKey = this.updateComponentAxis(component.dataAxisKey);
        } else{
            data = this.generateScatterChartFakeData(component);
        }

        return (
        <ScatterChart width={width} height={height} margin={{ top: top, left: left }}>
            <XAxis type="number" dataKey={nameAxisKey} name={component.nameAxisLabel} unit={component.nameAxisUnit} />
            <YAxis type="number" dataKey={dataAxisKey} name={component.dataAxisLabel} unit={component.dataAxisUnit} />
            <CartesianGrid />
            <Tooltip />
            <Legend/>
            <Scatter name={component.title} data={data} fill={fillColor} label={{ dataKey: nameAxisKey }} />
        </ScatterChart>
        )
    }

    private generateScatterChartFakeData(component: IScatterChart) {
        const data = [];
        for (var i = 0; i < 10; i++) {
            const obj : {[key: string]: number} = {};
            obj[component.nameAxisKey] = Math.trunc(Math.random() * 30);
            obj[component.dataAxisKey] = Math.trunc(Math.random() * 30);
            data.push(obj);
        }
        return data;
    }

    private renderPieChart(component: IPieChart) {
        const width = component.width ? component.width : 600;
        const height = component.height ? component.height : 400;
        const top = component.top ? component.top : 0;
        const left = component.left ? component.left : 0;
        const colors = scaleOrdinal(schemeCategory10).range();

        let data = component.data;
        let nameAxisKey = component.nameAxisKey;
        let dataAxisKey = component.dataAxisKey;
        if (data) {
            nameAxisKey = this.updateComponentAxis(component.nameAxisKey);
            dataAxisKey = this.updateComponentAxis(component.dataAxisKey);
        } else {
            data = this.generatePieChartFakeData(component);
        }

        const renderLabelContent: React.FunctionComponent = (props: any) => {
            //const { value, percent, x, y, midAngle } = props;
            const { percent, x, y, midAngle } = props;
          
            return (
              <g transform={`translate(${x}, ${y})`} textAnchor={ (midAngle < -90 || midAngle >= 90) ? 'end' : 'start'}>
                {/*<text x={0} y={0}>{`Count: ${value}`}</text>*/ }
                {/*<text x={0} y={20}>{`(Percent: ${(percent * 100).toFixed(2)}%)`}</text> */ }
                <text x={0} y={20}>{`${(percent * 100).toFixed(2)}%`}</text>
              </g>
            );
          };

        return (
        <div style={{position: "absolute", width: width, height: height, left: left + "px", top: top + "px"}}>
            <ResponsiveContainer>
                <PieChart>
                <Legend verticalAlign="bottom"/>
                <Pie data={data} nameKey={nameAxisKey} dataKey={dataAxisKey} innerRadius="25%" outerRadius="40%" activeIndex={0}
                    isAnimationActive={false} label={renderLabelContent}>
                    {
                    data.map((entry, index) => (
                        <Cell key={`slice-${index}`} fill={colors[index % 10] as string}/>
                    ))
                    }
                </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
        )
    }

    private generatePieChartFakeData(component: IPieChart) {
        const data = [];
        for (var i = 0; i < 10; i++) {
            const obj : {[key: string]: any} = {};
            obj[component.nameAxisKey] = "Comp" + (i+1);
            obj[component.dataAxisKey] = Math.trunc(Math.random() * 30) ;
            data.push(obj);
        }
        return data;
    }

    private renderRadarChart(component: IRadarChart) {
        const title = component.title ? component.title : "";
        const width = component.width ? component.width : 600;
        const height = component.height ? component.height : 400;
        const top = component.top ? component.top : 0;
        const left = component.left ? component.left : 0;
        const fillColor = component.fillColor ? component.fillColor : "#8884d8";
        const strokeColor = component.strokeColor ? component.strokeColor : "#8884d8";

        let data = component.data;
        let nameAxisKey = component.nameAxisKey;
        let dataAxisKey = component.dataAxisKey;
        if (data) {
            nameAxisKey = this.updateComponentAxis(component.nameAxisKey);
            dataAxisKey = this.updateComponentAxis(component.dataAxisKey);
        } else {
            data = this.generateRadarBarFakeData(component);
        }

        return (
        <div style={{position: "absolute", width: width, height: height, left: left + "px", top: top + "px"}}>
            <ResponsiveContainer>
                <RadarChart data={data}>
                <PolarGrid radialLines={true}/>
                <PolarAngleAxis dataKey={nameAxisKey} label={component.nameAxisLabel} />
                <PolarRadiusAxis />
                <Tooltip />
                <Radar name={title} dataKey={dataAxisKey} label={component.dataAxisLabel} stroke={strokeColor} fill={fillColor} fillOpacity={0.6} connectNulls>
                    <LabelList />
                </Radar>
                </RadarChart>
            </ResponsiveContainer>
        </div>
        )
    }

    private generateRadarBarFakeData(component: IRadarChart) {
        const data = [];
        for (var i = 0; i < 10; i++) {
            const obj : {[key: string]: any} = {};
            obj[component.nameAxisKey] = "Comp" + (i+1);
            obj[component.dataAxisKey] = Math.trunc(Math.random() * 30) ;
            data.push(obj);
        }
        return data;
    }

    private renderRadialBarChart(component: IRadialBarChart) {
        const width = component.width ? component.width : 500;
        const height = component.height ? component.height : 300;
        const top = component.top ? component.top : 0;
        const left = component.left ? component.left : 0;
        const style = { lineHeight: '24px', left: 300 };

        let data = component.data;
        let nameAxisKey = component.nameAxisKey;
        let dataAxisKey = component.dataAxisKey;
        if (data) {
            nameAxisKey = this.updateComponentAxis(nameAxisKey);
            dataAxisKey = this.updateComponentAxis(dataAxisKey);
            this.generateRadialBarChartName(nameAxisKey, dataAxisKey, data);
        } else {
            data = this.generateRadialBarChartFakeData(component);
            this.generateRadialBarChartName(nameAxisKey, dataAxisKey, data);
        }

        return (
        <RadialBarChart width={width} height={height} cx={150} cy={150} innerRadius={20} margin={{left: left, top: top}}
            outerRadius={140} data={data} startAngle={90} endAngle={-270}>
            <RadialBar background dataKey={dataAxisKey}>
              <LabelList position="end" />
            </RadialBar>
            <Legend iconSize={10} width={150} height={height/2} layout="vertical" verticalAlign="top" wrapperStyle={style} />
            <Tooltip/>
        </RadialBarChart>
        );
    }

    private generateRadialBarChartName(nameAxisKey: string, dataAxisKey: string, data: any[]) {
        const colors = scaleOrdinal(schemeCategory10).range();
        for (let i = 0; i < data.length; i++) {
            const line : {[key: string] : any} = data[i];
            if (nameAxisKey !== "name" && dataAxisKey !== "name") {
                line["name"] = line[nameAxisKey];
            }
            line["fill"] = colors[i % 10] as string;
        }
    }

    private generateRadialBarChartFakeData(component: IRadialBarChart) {
        const data = [];
        for (var i = 0; i < 10; i++) {
            const obj : {[key: string]: any} = {};
            obj["name"] = "Comp" + (i+1);
            obj[component.dataAxisKey] = Math.trunc(Math.random() * 30) ;
            data.push(obj);
        }
        return data;
    }

    

    private renderTreeMap(component: ITreeMap) {
        const width = component.width ? component.width : 500;
        const height = component.height ? component.height : 250;
        const top = component.top ? component.top : 0;
        const left = component.left ? component.left : 0;
        const title = component.title ? component.title : "";

        let data = component.data;
        let nameAxisKey = component.nameAxisKey;
        let dataAxisKey = component.dataAxisKey;
        if (data) {
            nameAxisKey = this.updateComponentAxis(nameAxisKey);
            dataAxisKey = this.updateComponentAxis(dataAxisKey);
        } else {
            data = this.generateTreeMapFakeData(component);
        }

        return (
        <Treemap width={width} height={height} data={data} isAnimationActive={false} style={{margin: {left: left, top: top }}}
            nameKey={nameAxisKey} dataKey={dataAxisKey} type="nest"
            nestIndexContent={(item) => {
              return (
                <div>
                  {`${item.name || title}`}
                </div>
              );
            }
            }
          >
            <Tooltip />
          </Treemap>
        )
    }

    private generateTreeMapFakeData(component: ITreeMap) {
        const data = [];
        for (var i = 0; i < 10; i++) {
            const obj : {[key: string]: any} = {};
            obj[component.nameAxisKey] = "Comp" + (i+1);
            obj[component.dataAxisKey] = Math.trunc(Math.random() * 30) ;
            data.push(obj);
        }
        return data;
    }

    private renderStack(component: IStack) {
        const orientation : ResponsiveStyleValue<"column" | "row" | "column-reverse" | "row-reverse"> = component.orientation as ResponsiveStyleValue<"column" | "row" | "column-reverse" | "row-reverse"> || ORIENTATION_TYPE.VERTICAL;
        let style : React.CSSProperties = {position: "relative"};
        return (
            <Stack direction={orientation} style={style}>
            { component.subObject.map(o => { return this.renderComponent(o); })}
            </Stack>
        )
    }

}

