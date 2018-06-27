import React, { Component } from 'react';
import './App.css';
import NavbarFeatures from './Components/Navbar/NavbarFeatures';
import RoamMap from './Components/Map/Map';

import axios from 'axios'
import { Route } from 'react-router-dom'
// components
import Signup from './components/sign-up'
import LoginForm from './components/login-form'
import Navbar from './components/navbar'

class App extends Component {
  

//   componentDidMount() {
//     const leafletMap = this.leafletMap.leafletElement;
//     leafletMap.on('zoomend', () => {
//         console.log("Current Zoom level -> ", leafletMap.getZoom());
//     });
// }



  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser(userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }
  render() {
    return (
      <div className="App">

        <NavbarFeatures />
        <RoamMap />
        {/* <RoamMap ref={m => { this.leafletMap = m; }}>
        </RoamMap> */}


        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        {/* greet user if logged in: */}
        {this.state.loggedIn &&
          <p>Join the party, {this.state.username}!</p>
        }
        {/* Routes to different components */}
        <Route
          exact path="/"
          render={() =>
            <LoginForm
              updateUser={this.updateUser}
            />}
        />
        <Route
          exact path="/login"
          render={() =>
            <LoginForm
              updateUser={this.updateUser}
            />}
        />
        <Route
          exact path="/signup"
          render={() =>
            <Signup />}
        />

      </div>
    );
  }
}

export default App;
