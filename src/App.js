import React, { Component } from 'react';
import './App.css';
import NavbarFeatures from './Components/NavbarFeatures';
import LeafletMap from './Components/Map';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavbarFeatures />
        {/* <Map /> */}
      </div>
    );
  }
}

export default App;
