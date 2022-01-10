import React from "react";

class LastNameSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = { result: [], loading: false };
        this.handleClick = this.handleClick.bind(this);
        this.getLastNames = this.getLastNames.bind(this);
    }

    getLastNames() {
        this.setState({ loading: true });
        fetch('/api/greekLastNames')
            .then((res) => res.json())
            .then((data) => {
                if(data.rowCount > 0) {
                    this.setState({ result: data.rows, loading: false });
                }
                else {
                    this.setState({ result: [], loading: false });
                }
            })
    }

    componentDidMount() {
        this.getLastNames();
    }

    handleClick(e) {

    } 

    render() {
        const showHideClassName = this.props.show ? "display-block" : "display-none";
        return (
            <div className={ showHideClassName }>
                <div className="LastNameSelector">
                    <div className="LastNameTableDiv">
                        <table className="LastNameTable">
                            <thead className="lastNameThead">
                                <tr><td>Name</td><td>Meaning</td></tr>
                            </thead>
                            <tbody>
                                {this.state.result.map((row) => (
                                    <tr key={row.name}>
                                        <td><div className="nameRow">{row.lastname}</div></td>
                                        <td><div className="nameRow">{row.meaning}</div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default LastNameSelector;