import React, { Component } from 'react';
import axios from 'axios'
import { Route } from 'react-router-dom'
// components
import Signup from './components/SignUp'
import LoginForm from './components/LoginForm'
// import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Location from './pages/Locations'

class App extends Component {

//  greet user if logged in: 
// {this.state.loggedIn &&
//  <p>Join the party, {this.state.username}!</p>
//}
//Routes to different components


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
    axios.get('/api/user/').then(response => {
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
        <Route
          exact path="/"
          render={() =>
            <LoginForm
              updateUser={this.updateUser}
            />}
        />
        <Route
          exact path="/home"
          render={() =>
            <Location />
          }
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
        <Footer updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
      </div>
    );
  }
}

export default App;
