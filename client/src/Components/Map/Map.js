import React from "react";
import therosMap from './theros-map.png';

class Map extends React.Component {

    render() {
        return (
            <div className="Map">
                <img className="theros-map" src={ therosMap } alt="theros map"></img>
            </div>
        );
    }
}

export default Map;