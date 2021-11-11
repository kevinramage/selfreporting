import { Typography } from "@material-ui/core";
import { ChangeEvent, Component } from "react";
import { IRating } from "../../../types/reportComponent";
import { onComponentChangeListener } from "../ReportOptions";

import "./BasicProperties.css"

type RatingPropertiesProps = {
    component: IRating,
    componentChangeListener: onComponentChangeListener;
}
type RatingPropertiesState = {
    ratingText: string;
    component: IRating,
    leftText: string,
    topText: string,
    componentChangeListener: onComponentChangeListener;
};

export class RatingProperties extends Component<RatingPropertiesProps, RatingPropertiesState> {

    constructor(props: RatingPropertiesProps) {
        super(props);
        this.state = { 
            component: props.component, 
            ratingText: props.component.rating + "",
            leftText: props.component.left ? props.component.left + "" : "",
            topText : props.component.top ? props.component.top + "" : "",
            componentChangeListener: props.componentChangeListener 
        };

        this.onNameChanged = this.onNameChanged.bind(this);
        this.onTextChanged = this.onTextChanged.bind(this);
        this.onRatingChanged = this.onRatingChanged.bind(this);
        this.onLeftChanged = this.onLeftChanged.bind(this);
        this.onTopChanged = this.onTopChanged.bind(this);
    }

    render() {
        const { component, ratingText } = this.state;
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
                    <Typography className="propertyLabel">Rating: </Typography>
                    <input value={ratingText} type="number" min="0" max="5" onChange={this.onRatingChanged} />
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
        const rating = this.state.component;
        rating.name = e.target.value;
        this.setState({component: rating});
        this.state.componentChangeListener(rating);
    }
    onTextChanged(e: ChangeEvent<HTMLInputElement>) {
        const rating = this.state.component;
        rating.text = e.target.value;
        this.setState({component: rating});
        this.state.componentChangeListener(rating);
    }
    onRatingChanged(e: ChangeEvent<HTMLInputElement>) {
        const value = Number.parseInt(e.target.value);
        if (!isNaN(value)) {
            const rating = this.state.component;
            rating.rating = value;
            this.setState({component: rating});
            this.state.componentChangeListener(rating);
        }
        this.setState({ ratingText: e.target.value });
    }
    onLeftChanged(e: ChangeEvent<HTMLInputElement>) {
        const value = Number.parseInt(e.target.value);
        if (!isNaN(value)) {
            const rating = this.state.component;
            rating.left = value;
            this.setState({component: rating});
            this.state.componentChangeListener(rating);
        }
        this.setState({leftText: e.target.value});
    }
    onTopChanged(e: ChangeEvent<HTMLInputElement>) {
        const value = Number.parseInt(e.target.value);
        if (!isNaN(value)) {
            const rating = this.state.component;
            rating.top = value;
            this.setState({component: rating});
            this.state.componentChangeListener(rating);
        }
        this.setState({topText: e.target.value});
    }
}