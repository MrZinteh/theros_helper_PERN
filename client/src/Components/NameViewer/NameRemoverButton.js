import React from "react";

export class NameRemoverButton extends React.Component {
    render() {
        return (
            <button 
            className="NameRemoverButton"
            onClick = { this.props.onClick }>
                X  
            </button>
        );
    }
}