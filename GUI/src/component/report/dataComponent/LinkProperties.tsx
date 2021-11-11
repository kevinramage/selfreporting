import { Typography } from "@material-ui/core";
import { ChangeEvent, Component } from "react";
import { ILink } from "../../../types/reportComponent";
import { onComponentChangeListener } from "../ReportOptions";

import "./BasicProperties.css"

type LinkPropertiesProps = {
    component: ILink,
    componentChangeListener: onComponentChangeListener;
}
type LinkPropertiesState = {
    component: ILink,
    fontSizeText: string,
    leftText: string,
    topText: string,
    componentChangeListener: onComponentChangeListener;
};

export class LinkProperties extends Component<LinkPropertiesProps, LinkPropertiesState> {

    constructor(props: LinkPropertiesProps) {
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
        this.onReferenceChanged = this.onReferenceChanged.bind(this);
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
                    <Typography className="propertyLabel">Link: </Typography>
                    <input value={component.reference} onChange={this.onReferenceChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">Font: </Typography>
                    <input value={font} onChange={this.onFontChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">FontSize: </Typography>
                    <input value={fontSize} type="number" min="8" max="50" step="1" onChange={this.onFontSizeChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">Color: </Typography>
                    <input value={color} type="color" onChange={this.onColorChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">Left: </Typography>
                    <input value={left} type="number" min="0" step="5" onChange={this.onLeftChanged} />
                </div>
                <div>
                    <Typography className="propertyLabel">Top: </Typography>
                    <input value={top} type="number" min="0" step="5" onChange={this.onTopChanged} />
                </div>
            </div>
        )
    }

    onNameChanged(e: ChangeEvent<HTMLInputElement>) {
        const link = this.state.component;
        link.name = e.target.value;
        this.setState({component: link});
        this.state.componentChangeListener(link);
    }
    onTextChanged(e: ChangeEvent<HTMLInputElement>) {
        const link = this.state.component;
        link.text = e.target.value;
        this.setState({component: link});
        this.state.componentChangeListener(link);
    }
    onReferenceChanged(e: ChangeEvent<HTMLInputElement>) {
        const link = this.state.component;
        link.reference = e.target.value;
        this.setState({component: link});
        this.state.componentChangeListener(link);
    }
    onFontChanged(e: ChangeEvent<HTMLInputElement>) {
        const link = this.state.component;
        link.font = e.target.value;
        this.setState({component: link});
        this.state.componentChangeListener(link);
    }
    onFontSizeChanged(e: ChangeEvent<HTMLInputElement>) {
        const value = Number.parseInt(e.target.value);
        if (!isNaN(value)) {
            const link = this.state.component;
            link.fontSize = value;
            this.setState({component: link});
            this.state.componentChangeListener(link);
        }
        this.setState({fontSizeText: e.target.value});
    }
    onColorChanged(e: ChangeEvent<HTMLInputElement>) {
        const link = this.state.component;
        link.color = e.target.value;
        this.setState({component: link});
        this.state.componentChangeListener(link);
    }
    onLeftChanged(e: ChangeEvent<HTMLInputElement>) {
        const value = Number.parseInt(e.target.value);
        if (!isNaN(value)) {
            const link = this.state.component;
            link.left = value;
            this.setState({component: link});
            this.state.componentChangeListener(link);
        }
        this.setState({leftText: e.target.value});
    }
    onTopChanged(e: ChangeEvent<HTMLInputElement>) {
        const value = Number.parseInt(e.target.value);
        if (!isNaN(value)) {
            const link = this.state.component;
            link.top = value;
            this.setState({component: link});
            this.state.componentChangeListener(link);
        }
        this.setState({topText: e.target.value});
    }
}