import React from "react";

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.updateStyle = this.updateStyle.bind(this);
    }

    updateStyle(selectedTab, tabName) {
        if (selectedTab === tabName) {
            return {
                color: "#0F977C",
                fontStyle: "italic"
            }
        }
        else {
            return {
                color: "black",
                fontStyle: "normal"
            }
        }
    }

    render() {
        const selectTab = this.props.selectTab;
        const selectedTab = this.props.selectedTab;
        return(
            <div className="nav-bar">
                <div 
                className="nav-item" 
                id="Name Generator" 
                onClick={selectTab}
                style={ this.updateStyle(selectedTab, "Name Generator") }>Name Generator</div>
                <div 
                className="nav-item" 
                id="Map" 
                onClick={selectTab}
                style={ this.updateStyle(selectedTab, "Map") }>Map</div>
                <div 
                className="nav-item" 
                id="Important NPCs" 
                onClick={selectTab}
                style={ this.updateStyle(selectedTab, "Important NPCs") }>Important NPCs</div>
                <div 
                className="nav-item" 
                id="Players" 
                onClick={selectTab}
                style={ this.updateStyle(selectedTab, "Players") }>Players</div>
            </div>
        );
    }
}

export default NavBar;