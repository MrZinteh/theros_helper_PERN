import React from "react";

export class MeaningExpander extends React.Component {
    constructor(props) {
        super(props);
        this.state = { content: <div className="quest-active"><b>&#9660;</b></div> }
        this.updateComponent = this.updateComponent.bind(this);
    }

    updateComponent() {
        this.setState({
            content: this.props.expanded[this.props.name] ? <div className="quest" style={{"transform": "rotate(-180deg)"}}><b>&#9660;</b></div> : <div className="quest"><b>&#9660;</b></div>
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.updateComponent();
        }
    }

    render() {
        return (
            <button
            className="meaningExpander"
            onClick = { this.props.onClick }>
                {this.state.content}
            </button>
        );
    }
}