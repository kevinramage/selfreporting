import { AppBar, Dialog, DialogTitle, Divider, IconButton, ListItemText, Stack, Toolbar, Typography } from "@mui/material";
import { Component, MouseEvent } from "react";
import CreateIcon from '@mui/icons-material/Create';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import SaveIcon from '@mui/icons-material/Save';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BuildIcon from '@mui/icons-material/Build';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import UndoIcon from '@material-ui/icons/Undo';
import ReplayIcon from '@material-ui/icons/Replay';
import HistoryIcon from '@material-ui/icons/History';

import { ReportPresentation } from "./ReportPresentation";

import "./ReportEditor.css";
import { ReportOptions } from "./ReportOptions";
import { COMPONENT_TYPE, IDataComponent, IReportComponent } from "../../types/reportComponent";
import { IDataSource } from "../../types/dataSource";
import { IReport, ReportUtils } from "../../types/report";
import { HistoryManagement, HISTORY_SOURCES } from "../../business/HistoryManagement";
import { List, ListItem } from "@material-ui/core";


type ReportEditorProps = {
    reportId: string;
};
type ReportEditorState = {
    reportId: string;
    report: IReport;
    isOpenHistoryDialog: boolean;
};

const sales = [ { "sales": 150, "month": "01" }, { "sales": 100, "month": "02" }, { "sales": 80, "month": "03" }, { "sales": 60, "month": "04" }, { "sales": 60, "month": "05" }, { "sales": 70, "month": "06" }, { "sales": 90, "month": "07" }, { "sales": 80, "month": "08" }, { "sales": 90, "month": "09" }, { "sales": 100, "month": "10" }, { "sales": 150, "month": "11" }, { "sales": 250, "month": "12" } ];
const dataSource : IDataSource = {
    name: "query1",
    elements: [
        { id: "1", businessName: "Sales amount", type: "number", technicalName: "sales" },
        { id: "2", businessName: "Sales month", type: "string", technicalName: "month" }
    ],
    data: sales
};
const dataSources = [ dataSource ];


export class ReportEditor extends Component<ReportEditorProps, ReportEditorState>{

    constructor(props: ReportEditorProps) {
        super(props);
        this.state = { 
            reportId: props.reportId,
            report: {
                id: "1",
                name: "MyReport",
                description: "",
                dataSources: dataSources,
                rootComponent: null,
                selectFields: []
            },
            isOpenHistoryDialog: false
        }

        const clone = ReportUtils.clone(this.state.report);
        HistoryManagement.instance.registerSource(HISTORY_SOURCES.REPORT, clone);

        this.changeComponent = this.changeComponent.bind(this);
        this.clickOnRefresh = this.clickOnRefresh.bind(this);
        this.clickOnUndo = this.clickOnUndo.bind(this);
        this.clickOnReplay = this.clickOnReplay.bind(this);
        this.clickOnHistory = this.clickOnHistory.bind(this);
        this.closeHistoryDialog = this.closeHistoryDialog.bind(this);
    }

    componentDidMount() {
        if (this.state.reportId) {
            /*
            ReportService.load(this.state.reportId).then((reportData) => {
                console.info(reportData.rootComponent);
                this.setState({reportName: reportData.name });
            }).catch((err) => {
                console.error(err);
            });
            */
        }
    }

    render() {
        const reportHistory = HistoryManagement.instance.getSource(HISTORY_SOURCES.REPORT);
        const { report, isOpenHistoryDialog } = this.state;
        return (
            <div>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Typography variant="h6" color="inherit" component="div">{ report.name }</Typography>
                    </Toolbar>
                </AppBar>
                <Stack direction="row">
                    <IconButton disabled={true}><CreateIcon /></IconButton>
                    <IconButton disabled={true}><FolderOpenIcon /></IconButton>
                    <IconButton disabled={true}><SaveIcon /></IconButton>
                    <IconButton disabled={true}><DescriptionIcon /></IconButton>
                    <Divider style={{height: "40px"}} orientation="vertical" />
                    <IconButton disabled={!reportHistory.isCancelable()} onClick={this.clickOnUndo}><UndoIcon /></IconButton>
                    <IconButton disabled={!reportHistory.isRepeatable()} onClick={this.clickOnReplay}><ReplayIcon /></IconButton>
                    <IconButton onClick={this.clickOnHistory}><HistoryIcon /></IconButton>
                    <Divider style={{height: "40px"}} orientation="vertical" />
                    <IconButton onClick={this.clickOnDataSource}><StorageIcon /></IconButton>
                    <IconButton disabled={true}><AssessmentIcon /></IconButton>
                    <IconButton disabled={true}><BuildIcon /></IconButton>
                    <IconButton onClick={this.clickOnRefresh}><AutorenewIcon /></IconButton>
                </Stack>
                <Divider orientation="horizontal"></Divider>
                <div className="workspace">
                    <div className="actionBar">
                        <ReportOptions report={report} componentChangeListener={this.changeComponent} />
                    </div>
                    <div className="contentBar" style={{overflow: "auto"}}>
                        <ReportPresentation reportComponent={this.state.report.rootComponent} />
                    </div>
                </div>
                <Dialog open={isOpenHistoryDialog} onClose={this.closeHistoryDialog}>
                    <DialogTitle>History</DialogTitle>
                    <List className="historyDialog">
                    { reportHistory.elements.map((e, index) => {
                        return (
                            <ListItem key={index}>
                                <ListItemText primary={ (e.isCurrent ? " > " : "" ) + index + " - '" + e.change + "'"} />
                            </ListItem>
                        )
                    })}
                    </List>
                </Dialog>
                
            </div>
        )
    }

    clickOnCreate(e: MouseEvent) {

    }

    clickOnOpen(e: MouseEvent) {

    }

    clickOnSave(e: MouseEvent) {

    }

    clickOnProperties(e: MouseEvent) {

    }

    clickOnUndo(e: MouseEvent) {
        e.stopPropagation();
        const history = HistoryManagement.instance.getSource(HISTORY_SOURCES.REPORT);
        const report = history.undo() as IReport;
        if (report !== null) {
            const clone = ReportUtils.clone(report);
            this.setState({ report: clone });
        }
    }

    clickOnReplay(e: MouseEvent) {
        e.stopPropagation();
        const history = HistoryManagement.instance.getSource(HISTORY_SOURCES.REPORT);
        const report = history.redo() as IReport;
        if (report !== null) {
            const clone = ReportUtils.clone(report);
            this.setState({ report: clone });
        }
    }

    clickOnHistory(e: MouseEvent) {
        this.setState({ isOpenHistoryDialog: true });
    }

    clickOnDataSource(e: MouseEvent) {

    }

    clickOnGraphicComponent(e: MouseEvent) {

    }

    clickOnConfiguration(e: MouseEvent) {

    }

    clickOnRefresh(e: MouseEvent) {
        e.stopPropagation();
        this.inject(this.state.report.rootComponent);
    }

    closeHistoryDialog() {
        this.setState({ isOpenHistoryDialog: false });
    }

    changeComponent(component: IReportComponent|null) {
        this.setState({report: this.state.report });
    }

    private inject(component: IReportComponent | null) {
        if ( component !== null ) {
            switch (component.type) {
                case COMPONENT_TYPE.LINECHART:
                case COMPONENT_TYPE.AREACHART:
                case COMPONENT_TYPE.BARCHART:
                case COMPONENT_TYPE.SCATTERCHART:
                case COMPONENT_TYPE.PIECHART:
                case COMPONENT_TYPE.RADARCHART:
                case COMPONENT_TYPE.RADIALBARCHART:
                case COMPONENT_TYPE.TREEMAP:
                    this.injectDataComponent(component as IDataComponent);
                break;
            }
        }
    }

    private injectDataComponent(dataComponent: IDataComponent) {
        dataComponent.data = this.getData(this.state.report);
        //this.changeComponent(dataComponent);
    }

    private getData(report: IReport) : any[] {
        const dataSource = report.dataSources.find(d => { return d.name === "query1"});
        if (dataSource) {
            return dataSource.data;
        } else {
            return [];
        }
    }
}