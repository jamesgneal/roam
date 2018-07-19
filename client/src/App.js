import React, { Component } from "react";
import axios from "axios";
import { Route } from "react-router-dom";
import NavbarFeatures from "./components/Navbar/navbar";
import Locations from "./components/Locations";
import API from "./utils/API";
import Signup from "./components/SignUp";
import LoginForm from "./components/LoginForm";
import RoamMap from "./components/Map";
import Toolbar from "./components/Toolbar/toolbar";
import SearchBar from "./components/Form/SearchBar";
import PinBtn from "./components/PinBtn";
import YelpSearchCards from "./components/YelpSearchCards";
import YelpSearchInput from "./components/YelpSearchInput";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      latlng: {
        lat: null,
        lng: null
      },
      userLocations: [],
      yelpLocations: [],
      roamLocations: [],
      loggedIn: false,
      username: null,
      city: "",
      category: ""
    }
    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // ====================== User methods ======================
  updateUser(userObject) {
    this.setState(userObject);
  }

  getUser() {
    axios.get("/api/user/").then(response => {
      if (response.data.user) {
        console.log(
          `getUser found a user saved in the server session: ${
            response.data.user
          }`
        );
        this.setState({
          loggedIn: true,
          username: response.data.user.username
        });
        this.loadUserPins(response.data.user.username);
      } else {
        console.log("Get user: no user");
        this.setState({
          loggedIn: false,
          username: null
        });
      }
    });
  }

  // ====================== Geo methods ======================
  handleUserLocation = loc => {
    this.setState({
      latlng: loc
    });
    this.convertLatLng(this.state.latlng);
  };

  cleanCityString = mapQuestObj => {
    let apiRes = mapQuestObj.data.results[0].locations[0];
    let proxyData = {
      latLng: apiRes.latLng,
      city: apiRes.adminArea5,
      stateAbbrv: apiRes.adminArea3,
      country: apiRes.adminArea1
    };
    let proxyString = "";
    if (proxyData.country === "US") {
      proxyString = `${proxyData.city}, ${proxyData.stateAbbrv}`;
    } else {
      proxyString = `${proxyData.city}, ${proxyData.country}`;
    }
    return proxyString;
  };

  convertLatLng = latLng => {
    API.getRevCity(latLng)
      .then(response => {
        let cityString = this.cleanCityString(response);
        this.setState({
          city: cityString
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  setProxyCity = event => {
    event.preventDefault();
    API.getNewCity(this.state.city)
      .then(response => {
        let proxyLatLng = response.data.results[0].locations[0].latLng;
        let cityString = this.cleanCityString(response);
        this.setState({
          city: cityString,
          latlng: proxyLatLng
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  // ====================== Location methods ======================
  loadUserPins = username => {
    API.getSaved(username).then(res => {
      this.setState({
        userLocations: res.data
      });
    });
  };

  deleteLocation = id => {
    API.deleteLocations(id)
      .then(res => this.loadUserPins(this.state.username))
      .catch(err => console.log(err));
  };

  saveLocation = locationData => {
    API.saveLocation(locationData)
      .then(res => this.loadUserPins(this.state.username))
      .catch(err => console.log(err));
  };

  handleSearchSubmit = event => {
    event.preventDefault();
    API.getLocations(this.state.category, [
      this.state.latlng.lat,
      this.state.latlng.lng
    ])
      .then(response => {
        const cleanResponse = JSON.stringify(
          response.data.jsonBody.businesses,
          null,
          4
        );
        this.setState({ yelpLocations: response.data.jsonBody.businesses });
        console.log(`\n\n${cleanResponse}\n\n`);
      })
      .catch(e => {
        console.log(e);
      });
  };

  handleCategoryButton = (cat, event) => {
    API.getLocations(cat, [this.state.latlng.lat, this.state.latlng.lng])
      .then(response => {
        this.setState({
          yelpLocations: response.data.jsonBody.businesses
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={() => (
            <LoginForm
              updateUser={this.updateUser}
              user={this.state.username}
            />
          )}
        />
        <Route exact path="/signup" render={() => <Signup />} />
        <Route
          exact
          path="/logout"
          render={() => <LoginForm updateUser={this.updateUser} />}
        />
        <Route
          exact
          path="/home/pins"
          render={() => (
            <div>
              <form onSubmit={this.setProxyCity}>
                <SearchBar
                  name="city"
                  placeholder="a new city"
                  value={this.state.city}
                  onChange={this.handleInputChange}
                />
              </form>
              <Toolbar catClick={this.handleCategoryButton} />
              <RoamMap
                userLocations={this.state.userLocations}
                yelpLocations={this.state.yelpLocations}
                roamLocations={this.state.roamLocations}
                city={this.state.latlng}
                passLoc={this.handleUserLocation}
              />
              <PinBtn
                userLoc={this.state.latlng}
                user={this.state.username}
                newPin={this.saveLocation}
              />
            </div>
          )}
        />
        <Route
          exact
          path="/home/search"
          render={() => (
            <div>
              <div id="formInput">
                <form onSubmit={this.handleSearchSubmit}>
                  <YelpSearchInput
                    value={this.state.subject}
                    onChange={this.handleInputChange}
                    name="category"
                  />
                </form>
              </div>
              <YelpSearchCards
                saveCard={this.saveLocation}
                reloadSaved={this.loadUserPins}
                locations={this.state.yelpLocations}
                loggedInAs={this.state.username}
              />
            </div>
          )}
        />
        <Route
          exact
          path="/home/saved"
          render={() => (
            <div>
              <Locations
                username={this.state.username}
                savedLocations={this.state.userLocations}
                deleteCard={this.deleteLocation}
              />
            </div>
          )}
        />
        <Route
          path="/home"
          render={() => (
            <NavbarFeatures
              user={this.state.username}
              updateUser={this.updateUser}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
