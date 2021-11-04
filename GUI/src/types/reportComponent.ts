export interface IReportComponent {
    name: string;
    type: string;
}

export interface IDataGrid extends IReportComponent {
    columns: IDataGridColumn[];
    rows?: any[];
    pageSize?: number;
    rowPerPage?: number;
    top ?: number;
    left ?: number;
    width ?: number;
    height ?: number;
}

export interface IDataGridColumn {
    fieldName: string;
    headerName: string;
    description?: string;
    width?: number;
}

export interface ILabel extends IReportComponent {
    text: string;
    font?: string;
    fontSize?: number;
    color?: string;
    left?: number;
    top?: number;
}

export interface IRating  extends IReportComponent{
    text: string;
    rating: number;
    left ?: number;
    top ?: number;
}

export interface ILink extends ILabel {
    reference: string;
}

export interface ILineChart extends IReportComponent {
    width?: number;
    height?: number;
    xAxisKey: string;
    yAxisKey: string;
    xAxisLabel: string;
    yAxisLabel: string;
    tooltipEnabled?: boolean
    horizontalGridEnabled?: boolean;
    verticalGridEnabled?: boolean;
    strikeColor?: string;
    data ?: any[];
    left ?: number;
    top ?: number;
}

export interface IStack extends IReportComponent {
    orientation?: string;
    subObject: IReportComponent[];
}

export interface IAreaChart extends IReportComponent {
    xAxisLabel: string;
    yAxisLabel: string;
    title ?: string;
    strokeColor ?: string;
    strokeWidth ?: number;
    gradientStart ?: string;
    gradientEnd ?: string;
    width ?: number;
    height ?: number;
    data ?: any[];
    left ?: number;
    top ?: number;
}

export interface IBarChart extends IReportComponent {
    xAxisLabel: string;
    yAxisLabel: string;
    fillColor ?: string;
    width ?: number;
    height ?: number;
    data ?: any[];
    left ?: number;
    top ?: number;
}

export interface IScatterChart extends IReportComponent {
    xAxisKey: string;
    xAxisLabel: string;
    xAxisUnit?: string;
    yAxisKey: string;
    yAxisLabel: string;
    yAxisUnit?: string;
    title ?: string;
    fillColor ?: string;
    width ?: number;
    height ?: number;
    data ?: any[];
    left ?: number;
    top ?: number;
}

export interface IPieChart extends IReportComponent {
    nameAxisKey: string;
    dataAxisKey: string;
    width ?: number;
    height ?: number;
    data ?: any[];
    left ?: number;
    top ?: number;
}

export interface IRadarChart extends IReportComponent {
    angleAxisLabel: string;
    dataAxisLabel: string;
    title ?: string;
    fillColor ?: string;
    strokeColor ?: string;
    width ?: number;
    height ?: number;
    data ?: any[];
    left ?: number;
    top ?: number;
}

export interface IRadialBarChart extends IReportComponent {
    nameAxisKey: string;
    dataAxisKey: string;
    width ?: number;
    height ?: number;
    data ?: any[];
    left ?: number;
    top ?: number;
}

export interface ITreeMap extends IReportComponent {
    nameAxisKey: string;
    dataAxisKey: string;
    title ?: string;
    width ?: number;
    height ?: number;
    data ?: any[];
    left ?: number;
    top ?: number;
}

export module COMPONENT_TYPE {
    export const DATAGRID = "DATAGRID";
    export const LABEL = "LABEL";
    export const RATING = "RATING";
    export const LINK = "LINK";
    export const LINECHART = "LINECHART";
    export const AREACHART = "AREACHART";
    export const BARCHART = "BARCHART";
    export const SCATTERCHART = "SCATTERCHART";
    export const PIECHART = "PIECHART";
    export const RADARCHART = "RADARCHART";
    export const RADIALBARCHART = "RADIALBARCHART";
    export const TREEMAP = "TREEMAP";
    export const STACK = "STACK";
}

export module ORIENTATION_TYPE {
    export const HORIZONTAL = "row";
    export const VERTICAL = "column";
}