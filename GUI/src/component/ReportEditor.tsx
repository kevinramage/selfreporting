import { AppBar, Divider, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { Component, MouseEvent } from "react";
import CreateIcon from '@mui/icons-material/Create';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import SaveIcon from '@mui/icons-material/Save';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BuildIcon from '@mui/icons-material/Build';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { ReportPresentation } from "./ReportPresentation";
import { IReportResult } from "../types/reportResult";

import "./ReportEditor.css";
import { ReportOptions } from "./ReportOptions";
import { IReportComponent } from "../types/reportComponent";

type ReportEditorProps = {
    reportId: string | null;
};
type ReportEditorState = {
    reportId: string | null;
    reportName: string;
    reportResult: IReportResult | null;
    reportComponent: IReportComponent | null;
};


export class ReportEditor extends Component<ReportEditorProps, ReportEditorState>{

    constructor(props: ReportEditorProps) {
        super(props);
        this.state = { 
            reportResult: null, 
            reportId: props.reportId,
            reportName: "New report",
            reportComponent: null
        }

        this.changeComponent = this.changeComponent.bind(this);
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
        return (
            <div>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Typography variant="h6" color="inherit" component="div">{ this.state.reportName }</Typography>
                    </Toolbar>
                </AppBar>
                <Stack direction="row">
                    <IconButton disabled={true}><CreateIcon /></IconButton>
                    <IconButton disabled={true}><FolderOpenIcon /></IconButton>
                    <IconButton disabled={true}><SaveIcon /></IconButton>
                    <IconButton><DescriptionIcon /></IconButton>
                    <Divider style={{height: "40px"}} orientation="vertical" />
                    <IconButton onClick={this.clickOnDataSource.bind(this)}><StorageIcon /></IconButton>
                    <IconButton disabled={true}><AssessmentIcon /></IconButton>
                    <IconButton disabled={true}><BuildIcon /></IconButton>
                    <IconButton disabled={true}><AutorenewIcon /></IconButton>
                </Stack>
                <Divider orientation="horizontal"></Divider>
                <div className="workspace">
                    <div className="actionBar">
                        <ReportOptions reportComponent={this.state.reportComponent} componentChangeListener={this.changeComponent} />
                    </div>
                    <div className="contentBar">
                        <ReportPresentation reportComponent={this.state.reportComponent} />
                    </div>
                </div>
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

    clickOnDataSource(e: MouseEvent) {

    }

    clickOnGraphicComponent(e: MouseEvent) {

    }

    clickOnConfiguration(e: MouseEvent) {

    }

    changeComponent(component: IReportComponent|null) {
        this.setState({reportComponent: component});
    }
}