import { Button, Card, CardActions, CardContent } from "@mui/material";
import { Component } from "react";
import { BusinessLayerTree } from "./BusinessLayerTree";
import { DataSourceEditor } from "./DataSourceEditor";
import SaveIcon from '@mui/icons-material/Save';
import "./RequestEditor.css"
import { IUniverseObject } from "../types/universeObject";
import { v4 } from "uuid";
import { IUniverseDimension } from "../types/universeDimension";
import { IUniverseMetric } from "../types/universeMetric";

type RequestEditorProps = {};
type RequestEditorState = {
    objectSelected: IUniverseObject[];
};

export class RequestEditor extends Component<RequestEditorProps, RequestEditorState>{

    constructor(props: RequestEditorProps) {
        super(props);
        this.state = { objectSelected: [] }
    }

    render() {
        return (
            <Card>
                <CardContent>
                    <div className="businessLayerTree">
                        <BusinessLayerTree 
                            onObjectSelected={this.onObjectSelected.bind(this)}
                            onObjectRestricted={this.onObjectRestricted.bind(this)}
                        />
                    </div>
                    <div className="dataSourceEditor"><DataSourceEditor objectsSelected={this.state.objectSelected} /></div>
                </CardContent>
                <CardActions>
                    <Button size="small" variant="contained">Cancel</Button>
                    <Button size="small" variant="contained" color="success" startIcon={<SaveIcon />}>Update</Button>
                </CardActions>
            </Card>
        )
    }

    onObjectSelected(object: IUniverseObject) {

        // Change id and reference
        const newObject = this.cloneObject(object);

        // Add object
        if (newObject !== null) {
            const objects = this.state.objectSelected;
            objects.push(newObject);
            this.setState({objectSelected: objects});
        }
    }

    onObjectRestricted(object: IUniverseObject) {
        
    }

    cloneObject(object: IUniverseObject) {
        if (object.objectType === "DIMENSION") {
            return this.cloneDimensionObject(object as IUniverseDimension);
        } else if (object.objectType === "METRIC") {
            return this.cloneDimensionObject(object as IUniverseMetric);
        } else {
            console.error("RequestEditor.cloneObject - Invalid type: " + object.objectType);
            return null;
        }
    }

    cloneDimensionObject(object: IUniverseDimension) {
        const newObject : IUniverseDimension = {
            id: v4(),
            name: object.name,
            description: object.description,
            objectType: object.objectType,
            referenceId: object.id,
            select: object.select,
            where: object.where,
            tableName: object.tableName,
            isSelected: false
        }
        return newObject;
    }

    cloneMetricObject(object: IUniverseMetric) {
        const newObject : IUniverseMetric = {
            id: v4(),
            name: object.name,
            description: object.description,
            objectType: object.objectType,
            referenceId: object.id,
            select: object.select,
            where: object.where,
            tableName: object.tableName,
            isSelected: false
        }
        return newObject;
    }
}