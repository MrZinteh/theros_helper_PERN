import React from 'react';
import { MeaningExpander } from './meaningExpander';
import { NameRemoverButton } from './NameRemoverButton';

class NameViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { result: [], loading: true, expanded: {} }
        this.getNames = this.getNames.bind(this);
        this.removeName = this.removeName.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    getNames() {
        this.setState({ loading: true });
        fetch('/api/greekNames/current')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if(data.rowCount > 0) {
                    const expandObj = {}
                    data.rows.map((row) => expandObj[row.name] = false);
                    this.setState({ result: data.rows, loading: false, expanded: expandObj });
                }
                else {
                    this.setState({ result: [], loading: false });
                }
            })
    }

    removeName(name) {
        fetch(`/api/greekNames?name=${name}`, {method: 'DELETE'})
            .then(() => {
                this.getNames();
            })
    }

    handleClick(name) {
        const newExpanded = this.state.expanded;
        newExpanded[name] = !newExpanded[name];
        this.setState({ expanded: newExpanded });
    }

    componentDidMount() {
        this.getNames();
    }

    componentDidUpdate(prevProps) {
        if (this.props.recentlyGenerated) {
            this.getNames();
            this.props.toggleRecentlyGenerated();
        }
    }

    render() {
        return (
            <div className='nameViewer'>
                <div className="container">
                    <div className="tableHeaderRow">
                        <div className="tableHeaderColumn">Name</div>
                        <div className="tableHeaderColumn">Last Name</div>
                        <div className="tableHeaderColumn centeredColumn"> </div>
                        <div className="tableHeaderColumn">Purpose</div>
                        <div className="tableHeaderColumn">Gender</div>
                        <div className="tableHeaderColumn centeredColumn"> </div>
                    </div>
                    {this.state.result.map((row, index) => (
                        <div style={{"height": "auto"}} key={row.name}>
                            <div className={index % 2 === 0 ? "tableRow": "tableRow evenRow"} >
                                <div className="tableColumn">{row.name}</div>
                                <div className="tableColumn">{row.lastname}</div>
                                <div className="tableColumn centeredColumn"><MeaningExpander expanded={this.state.expanded} name={row.name} onClick={() => this.handleClick(row.name)}></MeaningExpander></div>
                                <div className="tableColumn">{row.purpose}</div>
                                <div className="tableColumn">{row.gender}</div>
                                <div className="tableColumn centeredColumn"><NameRemoverButton onClick={() => this.removeName(row.name) }></NameRemoverButton></div>
                            </div>
                            <div className="inner-container" key={row.meaning} style={this.state.expanded[row.name] ? {"maxHeight": "300px"} : {"maxHeight": "0px"}}>
                                <div className="inner-tableHeaderRow">
                                    <div className="tableHeaderColumn">First name meaning</div>
                                    <div className="tableHeaderColumn">Last name meaning</div>
                                </div>
                                <div className="tableRow">
                                    <div className="tableColumn">{row.meaning}</div>
                                    <div className="tableColumn">{row.lastmeaning}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
            </div>
        );
    }
}

export default NameViewer;