import React from "react";

export class GeneratorButton extends React.Component {
    render() {
        return (
            <button 
            className="generatorButton"
            onClick = { this.props.onClick }>
                { this.props.loading ? <div className="loader"></div> : "Generate!"}    
            </button>
        );
    }
}