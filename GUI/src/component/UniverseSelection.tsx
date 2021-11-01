import { List, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";
import { Component } from "react";
import { UniverseService } from "../business/universe";
import { IUniverse } from "../types/universe";
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import './UniverseSelection.css';

type UniverseSelectionProps = {};
type UniverseSelectionState = {
    universes: IUniverse[];
};

export class UniverseSelectionComponent extends Component<UniverseSelectionProps, UniverseSelectionState> {

    constructor(props : UniverseSelectionProps) {
        super(props);
        this.state = { universes:[] }
    }

    componentDidMount() {
        UniverseService.loadAll().then((universes) => {
            this.setState({universes: universes });
        }).catch((err) => {
            console.error(err);
        });
    }

    render() {
        const { universes } = this.state;
        return (
            <Paper className="universeSelection">
                <Typography variant="h5">Universe :</Typography>
                <List>
                    { universes.map(u => {
                        return (
                            <ListItemButton key={ u.id } >
                                <ListItemIcon><ChromeReaderModeIcon /></ListItemIcon>
                                <ListItemText primary={ u.name } secondary={ u.description }/>
                            </ListItemButton>
                        );
                    })}
                </List>
            </Paper>
        )
    }
}