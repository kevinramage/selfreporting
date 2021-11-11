import { Button, Card, CardActions, CardContent, Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Component, MouseEvent } from "react";
import { UniverseService } from "../../business/universe";
import { IUniverse } from "../../types/universe";
import { IUniverseObject } from "../../types/universeObject";
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import { IUniverseClass } from "../../types/universeClass";
import "./BusinessLayerTree.css"

export type ObjectSelectedListener = (object: IUniverseObject) => void;
export type ObjectRestrictedListener = (object: IUniverseObject) => void;

type BusinessLayerTreeProps = {
    onObjectSelected: ObjectSelectedListener | null;
    onObjectRestricted: ObjectRestrictedListener | null;
};
type BusinessLayerTreeState = {
    universe: IUniverse | null;
    selectedObject: IUniverseObject | null
    onObjectSelected: ObjectSelectedListener | null;
    onObjectRestricted: ObjectRestrictedListener | null;
};

export class BusinessLayerTree extends Component<BusinessLayerTreeProps, BusinessLayerTreeState> {

    constructor(props : BusinessLayerTreeProps) {
        super(props);
        this.state = { 
            universe: null, 
            selectedObject: null, 
            onObjectSelected: props.onObjectSelected,
            onObjectRestricted: props.onObjectRestricted
        }
    }

    componentDidMount() {
        UniverseService.load("a0c77f50-9f72-40e7-8488-8d8571408842").then((universe) => {
            this.setState({universe: universe });
        }).catch((err) => {
            console.error(err);
        });
    }

    render() {
        return (
            <Card className="tree">
                <CardContent>
                    { this.renderUniverse() }
                </CardContent>
                <CardActions>
                    <Button size="small" variant="outlined" onClick={this.selectObject.bind(this)}>Select</Button>
                    <Button size="small" variant="outlined" onClick={this.restrictObject.bind(this)}>Restrict</Button>
                </CardActions>
            </Card>
        )
    }

    renderUniverse() {
        if ( this.state.universe != null ) {
            return (
                <div>
                    <Typography variant="caption" className="title">Universe: {this.state.universe.name}</Typography>
                    <List>
                        { this.renderUniverseObjects(this.state.universe.objects) }
                    </List>
                </div>
            )
        } else {
            return <div></div>;
        }
    }

    renderUniverseObjects(objects: IUniverseObject[]) {
        return objects.map(o => {
            return (
                this.renderUniverseObject(o)
            )
        })
    }

    renderUniverseSubObjects(object: IUniverseObject) {
        if (object.objectType === "CLASS") {
            const classObject = (object as IUniverseClass);
            if (classObject.subObjects.length > 0) {
                return (
                    <List>
                        { this.renderUniverseObjects(classObject.subObjects) }
                    </List>
                )
            }
        } else {
            return <div></div>
        }
    }

    renderUniverseObject(object: IUniverseObject) {
        return (
            <div key={object.id}>
                <ListItemButton className="button" onClick={this.clickOnItem.bind(this, object)} selected={object.isSelected}>
                    <ListItemIcon>{ this.renderUniverseObjectIcon(object) }</ListItemIcon>
                    <ListItemText className="listItemText" primary={object.name} secondary={object.description} />
                    { this.renderExpandObject(object) }
                </ListItemButton>
                <Collapse className="collapse" in={this.isObjectOpen(object)} timeout="auto" unmountOnExit>
                    { this.renderUniverseSubObjects(object) }
                </Collapse>
            </div>
        )
    }

    renderExpandObject(object: IUniverseObject) {
        if (object.objectType === "CLASS") {
            if ((object as IUniverseClass).isOpen) {
                return <ExpandLess />;
            } else {
                return <ExpandMore />;
            }
        } else {
            return <div></div>;
        }
    }

    renderUniverseObjectIcon(object: IUniverseObject) {
        if (object.objectType === "DIMENSION") {
            return <BubbleChartIcon/>
        } else if (object.objectType === "METRIC") {
            return <ShowChartIcon/>
        } else {
            return <FolderOpenIcon/>
        }
    }

    clickOnItem(object: IUniverseObject) {
        if (object.objectType === "CLASS") {
            const classObject = object as IUniverseClass;
            classObject.isOpen = !classObject.isOpen;
        } else {
            if (!object.isSelected) {
                this.unselectUniverseObjects(this.state.universe as IUniverse);
                this.setState({selectedObject: object});
                object.isSelected = true;
            } else {
                object.isSelected = false;
            }
        }
        this.setState({universe: this.state.universe})
    }

    isObjectOpen(objet: IUniverseObject) {
        return (objet.objectType === "CLASS") && (objet as IUniverseClass).isOpen;
    }

    unselectUniverseObjects(universe: IUniverse) {
        this.unselectAllObjects(universe.objects);
    }

    unselectAllObjects(objects: IUniverseObject[]) {
        for (var key in objects){
            const o = objects[key];
            if (o.objectType === "CLASS") {
                this.unselectAllObjects((o as IUniverseClass).subObjects);
            } else {
                o.isSelected = false;
            }
        }
    }

    selectObject(e: MouseEvent) {
        if (this.state.onObjectSelected != null && this.state.selectedObject) {
            this.state.onObjectSelected(this.state.selectedObject);
        }
        e.stopPropagation();
    }

    restrictObject(e: MouseEvent) {
        if (this.state.onObjectRestricted != null && this.state.selectedObject) {
            this.state.onObjectRestricted(this.state.selectedObject);
        }
        e.stopPropagation();
    }
}