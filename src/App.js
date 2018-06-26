import React, { Component } from 'react';
import './App.css';
import NavbarFeatures from './Components/Navbar/NavbarFeatures';
import RoamMap from './Components/Map/Map';

class App extends Component {
  

//   componentDidMount() {
//     const leafletMap = this.leafletMap.leafletElement;
//     leafletMap.on('zoomend', () => {
//         console.log("Current Zoom level -> ", leafletMap.getZoom());
//     });
// }



  render() {
    return (
      <div className="App">
        <NavbarFeatures />
        <RoamMap />
        {/* <RoamMap ref={m => { this.leafletMap = m; }}>
        </RoamMap> */}
      </div>
    );
  }
}

export default App;
