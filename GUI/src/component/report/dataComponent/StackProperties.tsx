import { Typography } from "@material-ui/core";
import { ChangeEvent, Component } from "react";
import { IStack } from "../../../types/reportComponent";
import { onComponentChangeListener } from "../ReportOptions";

import "./BasicProperties.css"

type StackPropertiesProps = {
    component: IStack,
    componentChangeListener: onComponentChangeListener;
}
type StackPropertiesState = {
    component: IStack,
    componentChangeListener: onComponentChangeListener;
};

export class StackProperties extends Component<StackPropertiesProps, StackPropertiesState> {

    constructor(props: StackPropertiesProps) {
        super(props);
        this.state = { 
            component: props.component,
            componentChangeListener: props.componentChangeListener
        };

        this.onNameChanged = this.onNameChanged.bind(this);
        this.onOrientationChanged = this.onOrientationChanged.bind(this);
    }

    render() {
        const { component } = this.state;
        return (
            <div>
                <div>
                    <Typography className="propertyLabel">Name: </Typography>
                    <input value={component.name} onChange={this.onNameChanged}/>
                </div>
                <div>
                    <Typography className="propertyLabel">Type: </Typography>
                    <input value={component.type} disabled readOnly/>
                </div>
                <div>
                    <Typography className="propertyLabel">Orientation: </Typography>
                    <select value={component.orientation} onChange={this.onOrientationChanged}>
                        <option value="row">Horizontal</option>
                        <option value="column">Vertical</option>
                    </select>
                </div>
            </div>
        )
    }

    onNameChanged(e: ChangeEvent<HTMLInputElement>) {
        const treeMap = this.state.component;
        treeMap.name = e.target.value;
        this.setState({component: treeMap});
        this.state.componentChangeListener(treeMap);
    }
    onOrientationChanged(e: ChangeEvent<HTMLSelectElement>) {
        const stack = this.state.component;
        stack.orientation = e.target.value;
        this.setState({component: stack});
        this.state.componentChangeListener(stack);
    }
}