import { Chip, MenuItem, Paper, Select, Stack, Typography } from "@mui/material";
import { Component, MouseEvent } from "react";
import { IUniverseObject } from "../../types/universeObject";
import "./DataSourceEditor.css"

type DataSourceEditorProps = {
    objectsSelected: IUniverseObject[];
};
type DataSourceEditorState = {
    objectsSelected: IUniverseObject[];
};

export class DataSourceEditor extends Component<DataSourceEditorProps, DataSourceEditorState> {

    constructor(props: DataSourceEditorProps) {
        super(props);
        this.state = { objectsSelected: [] }
    }

    componentDidUpdate() {
        //console.info("componentDidUpdate");
    }

    shouldComponentUpdate(nextProps: Readonly<DataSourceEditorProps>, nextState: Readonly<DataSourceEditorState>, nextContext: any) : boolean{
        if (nextProps.objectsSelected && nextProps.objectsSelected.length > this.state.objectsSelected.length) {
            this.setState({objectsSelected: this.props.objectsSelected});
            return true;
        } else {
            this.forceUpdate();
            return false;
        }
    }

    render() {
        return (
        <Paper className="dataSourceEditor">
            <div>
                <Typography className="selectLabel">Selection</Typography>
                <Stack direction="row" spacing={1}>
                    { this.state.objectsSelected.map(o => {
                        return (
                            <Chip key={o.id} label={o.name} variant="outlined" onDelete={this.deleteObject.bind(this, o)} />
                        )
                    })}
                </Stack>
            </div>
            <div>
                <Typography className="restrictionLabel">Restriction</Typography>
                <Stack direction="column" spacing={1}>
                    <div className="restrictionLine">
                        <Chip label="productId" variant="outlined" />
                        <Select label="Operand" value="Equals">
                            <MenuItem value="Equals">Equals</MenuItem>
                            <MenuItem value="NotEquals">Not equals</MenuItem>
                            <MenuItem value="Matches">Matches</MenuItem>
                            <MenuItem value="NotMatches">Not matches</MenuItem>
                        </Select>
                        <Select label="Operator type" value="Constant">
                            <MenuItem value="Constant">Constant</MenuItem>
                            <MenuItem value="Field">Field</MenuItem>
                        </Select>
                    </div>
                </Stack>
            </div>
        </Paper>
        )
    }

    deleteObject(object: IUniverseObject, event: MouseEvent) {
        const index = this.state.objectsSelected.indexOf(object);
        if (index > -1) {
            const objects = this.state.objectsSelected;
            objects.splice(index, 1);
            this.setState({ objectsSelected: objects});
        }
        event.stopPropagation();
    }
}