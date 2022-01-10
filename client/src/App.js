import './App.css';
import React from 'react';
import GreekNameGenerator from './Components/greek_name_generator/GreekNameGenerator';
import Header from './Components/header/Header';
import NameViewer from './Components/NameViewer/NameViewer';
import NavBar from './Components/NavBar/NavBar';
import Map from './Components/Map/Map';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { recentlyGenerated: false, selectedTab: "Name Generator" }
    this.toggleRecentlyGenerated = this.toggleRecentlyGenerated.bind(this);
    this.selectTab = this.selectTab.bind(this);
  }

  toggleRecentlyGenerated() {
    this.setState({recentlyGenerated: !this.state.recentlyGenerated})
  }

  selectTab(e) {
    this.setState({ selectedTab: e.target.id });
  }

  showTab(tabName) {
    if (tabName === this.state.selectedTab) {
      return {
        display: "grid"
      }
    }
    else {
      return {
        display: "none"
      }
    }
  }

  render() {
    return (
      <div className="App">
        <Header></Header>
        <NavBar selectTab={ this.selectTab } selectedTab={ this.state.selectedTab }></NavBar>
        <div className="NameGeneratorTab" style={ this.showTab("Name Generator") }>
          <GreekNameGenerator toggleRecentlyGenerated={ this.toggleRecentlyGenerated }></GreekNameGenerator>
          <NameViewer recentlyGenerated={ this.state.recentlyGenerated } toggleRecentlyGenerated={ this.toggleRecentlyGenerated }></NameViewer>
        </div>
        <div className="MapTab" style={ this.showTab("Map") }>
          <Map></Map>
        </div>
      </div>
    );
  }
}

export default App;
