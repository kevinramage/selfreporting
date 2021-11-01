import { AppBar, Divider, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { Component, MouseEvent } from "react";

import CreateIcon from '@mui/icons-material/Create';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import SaveIcon from '@mui/icons-material/Save';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BuildIcon from '@mui/icons-material/Build';

import "./ReportEditor.css";
import { ReportPresentation } from "./ReportPresentation";
import { ReportService } from "../business/report";
import { IReportResult } from "../types/reportResult";

type ReportEditorProps = {};
type ReportEditorState = {
    reportResult: IReportResult | null;
};

export class ReportEditor extends Component<ReportEditorProps, ReportEditorState>{

    constructor(props: ReportEditorProps) {
        super(props);
        this.state = { reportResult: null}
    }

    componentDidMount() {
        ReportService.execute("5f56c179-aeef-48ef-ae05-0a349e9478b9").then((reportResult) => {
            console.info(reportResult);
            this.setState({reportResult: reportResult });
        }).catch((err) => {
            console.error(err);
        });
    }

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Typography variant="h6" color="inherit" component="div">MyReport</Typography>
                    </Toolbar>
                </AppBar>
                <Stack direction="row">
                    <IconButton disabled={false}><CreateIcon /></IconButton>
                    <IconButton disabled={false}><FolderOpenIcon /></IconButton>
                    <IconButton disabled={false}><SaveIcon /></IconButton>
                    <IconButton disabled={false}><DescriptionIcon /></IconButton>
                    <Divider orientation="vertical" />
                    <IconButton onClick={this.clickOnDataSource.bind(this)}><StorageIcon /></IconButton>
                    <IconButton disabled={false}><AssessmentIcon /></IconButton>
                    <IconButton disabled={false}><BuildIcon /></IconButton>
                </Stack>
                <Divider orientation="horizontal"></Divider>
                <div className="workspace">
                    <div className="actionBar">&nbsp;

                    </div>
                    <div className="contentBar">&nbsp;
                        <ReportPresentation reportResult={this.state.reportResult} />
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
}