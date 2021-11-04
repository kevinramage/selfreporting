import { Typography } from "@material-ui/core";
import { ChangeEvent, Component } from "react";
import { ILabel } from "../../types/reportComponent";
import { onComponentChangeListener } from "../ReportOptions";

import "./LabelProperties.css"

type LabelPropertiesProps = {
    component: ILabel,
    componentChangeListener: onComponentChangeListener;
}
type LabelPropertiesState = {
    component: ILabel,
    fontSizeText: string,
    leftText: string,
    topText: string,
    componentChangeListener: onComponentChangeListener;
};

export class LabelProperties extends Component<LabelPropertiesProps, LabelPropertiesState> {

    constructor(props: LabelPropertiesProps) {
        super(props);
        this.state = { 
            component: props.component,
            fontSizeText: props.component.fontSize ? props.component.fontSize + "" : "",
            leftText: props.component.left ? props.component.left + "" : "",
            topText : props.component.top ? props.component.top + "" : "",
            componentChangeListener: props.componentChangeListener 
        };

        this.onNameChanged = this.onNameChanged.bind(this);
        this.onTextChanged = this.onTextChanged.bind(this);
        this.onFontChanged = this.onFontChanged.bind(this);
        this.onFontSizeChanged = this.onFontSizeChanged.bind(this);
        this.onColorChanged = this.onColorChanged.bind(this);
        this.onLeftChanged = this.onLeftChanged.bind(this);
        this.onTopChanged = this.onTopChanged.bind(this);
    }

    render() {
        const { component } = this.state;
        const font = component.font ? component.font : "";
        const fontSize = component.fontSize ? component.fontSize : "";
        const color = component.color ?component.color :"";
        const left = component.left ? component.left : "";
        const top = component.top ? component.top : "";
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
                    <Typography className="propertyLabel">Text: </Typography>
                    <input value={component.text} onChange={this.onTextChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">Font: </Typography>
                    <input value={font} onChange={this.onFontChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">FontSize: </Typography>
                    <input value={fontSize} onChange={this.onFontSizeChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">Color: </Typography>
                    <input value={color} onChange={this.onColorChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">Left: </Typography>
                    <input value={left} onChange={this.onLeftChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">Top: </Typography>
                    <input value={top} onChange={this.onTopChanged} />
                </div>
            </div>
        )
    }

    onNameChanged(e: ChangeEvent<HTMLInputElement>) {
        const label = this.state.component;
        label.name = e.target.value;
        this.setState({component: label});
        this.state.componentChangeListener(label);
    }
    onTextChanged(e: ChangeEvent<HTMLInputElement>) {
        const label = this.state.component;
        label.text = e.target.value;
        this.setState({component: label});
        this.state.componentChangeListener(label);
    }
    onFontChanged(e: ChangeEvent<HTMLInputElement>) {
        const label = this.state.component;
        label.font = e.target.value;
        this.setState({component: label});
        this.state.componentChangeListener(label);
    }
    onFontSizeChanged(e: ChangeEvent<HTMLInputElement>) {
        const value = Number.parseInt(e.target.value);
        if (!isNaN(value)) {
            const label = this.state.component;
            label.fontSize = value;
            this.setState({component: label});
            this.state.componentChangeListener(label);
        }
        this.setState({fontSizeText: e.target.value});
    }
    onColorChanged(e: ChangeEvent<HTMLInputElement>) {
        const label = this.state.component;
        label.color = e.target.value;
        this.setState({component: label});
        this.state.componentChangeListener(label);
    }
    onLeftChanged(e: ChangeEvent<HTMLInputElement>) {
        const value = Number.parseInt(e.target.value);
        if (!isNaN(value)) {
            const label = this.state.component;
            label.left = value;
            this.setState({component: label});
            this.state.componentChangeListener(label);
        }
        this.setState({leftText: e.target.value});
    }
    onTopChanged(e: ChangeEvent<HTMLInputElement>) {
        const value = Number.parseInt(e.target.value);
        if (!isNaN(value)) {
            const label = this.state.component;
            label.top = value;
            this.setState({component: label});
            this.state.componentChangeListener(label);
        }
        this.setState({topText: e.target.value});
    }
}