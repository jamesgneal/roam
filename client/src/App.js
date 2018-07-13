import React, { createRef, Component } from "react";
import axios from "axios";
import { Route } from "react-router-dom";
import NavbarFeatures from "./components/Navbar/navbar";
import API from "./utils/API";
import Signup from "./components/SignUp";
import LoginForm from "./components/LoginForm";
import RoamMap from "./components/Map";
import Toolbar from "./components/Toolbar/toolbar";
import SearchBar from "./components/Form/SearchBar";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    (this.state = {
      userLocations: [],
      yelpLocations: [],
      roamLocations: [],
      loggedIn: false,
      username: null,
      newCity: ""
    }),
      (this.getUser = this.getUser.bind(this));
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
    this.loadSaved();
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  getUser() {
    axios.get("/api/user/").then(response => {
      console.log("Get user response: ");
      console.log(response.data);
      if (response.data.user) {
        console.log("Get User: There is a user saved in the server session: ");

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        });
      } else {
        console.log("Get user: no user");
        this.setState({
          loggedIn: false,
          username: null
        });
      }
    });
  }

  loadSaved = username => {
    API.getSaved(username).then(res => {
      this.setState({
        userLocations: res.data
      });
      // console.log(
      //   `\n****** This is the saved Locations data from mongo ******\n\n`
      // );
      // this.state.userLocations.forEach(element => {
      //   console.log(element);
      // });
    });
  };

  loadLocations = () => {
    API.getLocations()
      .then(res => {
        this.setState({
          locations: res
        });
      })
      .catch(err => console.log(err));
  };

  deleteLocation = id => {
    API.deleteLocations(id)
      .then(res => this.loadSaved())
      .catch(err => console.log(err));
  };

  saveLocation = locationData => {
    API.saveLocation(locationData)
      .then(res => this.loadSaved())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.getLocations(this.state.category)
      // come back to this with proper dot notation for YELP response \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/
      .then(response => {
        /* const cleanResponse = JSON.stringify(
          response.data.jsonBody.businesses,
          null,
          4
        ); */
        this.setState({ locations: response.data.jsonBody.businesses });
        //console.log(`\n\n${cleanResponse}\n\n`);
      })
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    return (
      <div className="App">
        <Route exact path="/" render={() => <Signup />} />
        <Route
          exact
          path="/login"
          render={() => <LoginForm updateUser={this.updateUser} />}
        />
        <Route
          exact
          path="/home"
          render={() => (
            <div>
              <form onSubmit={this.handleFormSubmit}>
                <SearchBar 
                  name="newCity"
                  placeholder="Change City"
                  value={this.state.newCity}
                  onChange={this.handleInputChange}
                />
              </form>
              <Toolbar />
              <RoamMap 
                userLocations={this.state.userLocations}
                yelpLocations={this.state.yelpLocations}
                roamLocations={this.state.yelpLocations}
                newCity={this.state.newCity}
              />
              <NavbarFeatures />
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;
