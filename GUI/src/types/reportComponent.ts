export interface IReportComponent {
    id: string;
    name: string;
    type: string;
    left ?: number;
    top ?: number;
    parent ?: IReportComponent;
}

export interface IDataComponent extends IReportComponent {
    data?: any[];
}

export interface IDataGrid extends IDataComponent {
    columns: IDataGridColumn[];
    pageSize?: number;
    rowPerPage?: number;
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
}

export interface IRating  extends IReportComponent{
    text: string;
    rating: number;
}

export interface ILink extends ILabel {
    reference: string;
}

export interface ILineChart extends IDoubleAxisComponent {
    width?: number;
    height?: number;
    tooltipEnabled?: boolean
    horizontalGridEnabled?: boolean;
    verticalGridEnabled?: boolean;
    strikeColor?: string;
    data ?: any[];
}

export interface IStack extends IReportComponent {
    orientation?: string;
    subObjects: IReportComponent[];
}

export interface IAreaChart extends IDoubleAxisComponent {
    title ?: string;
    strokeColor ?: string;
    strokeWidth ?: number;
    gradientStart ?: string;
    gradientEnd ?: string;
    width ?: number;
    height ?: number;
    data ?: any[];
}

export interface IBarChart extends IDoubleAxisComponent {
    fillColor ?: string;
    width ?: number;
    height ?: number;
}

export interface IScatterChart extends IDoubleAxisComponent {
    title ?: string;
    nameAxisUnit ?: string;
    dataAxisUnit ?: string;
    fillColor ?: string;
    width ?: number;
    height ?: number;
}

export interface IPieChart extends IDoubleAxisComponent {
    width ?: number;
    height ?: number;
}

export interface IRadarChart extends IDoubleAxisComponent {
    title ?: string;
    fillColor ?: string;
    strokeColor ?: string;
    width ?: number;
    height ?: number;
    data ?: any[];
}

export interface IRadialBarChart extends IDoubleAxisComponent {
    width ?: number;
    height ?: number;
    data ?: any[];
}

export interface ITreeMap extends IDoubleAxisComponent {
    title ?: string;
    width ?: number;
    height ?: number;
    data ?: any[];
}

export interface IDoubleAxisComponent extends IDataComponent {
    nameAxisKey: string;
    dataAxisKey: string;
    nameAxisLabel: string;
    dataAxisLabel: string;
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