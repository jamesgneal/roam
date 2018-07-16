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
// import Input from "./components/Form/Input"
import YelpSearchInput from "./components/YelpSearchInput"
import "./App.css";

class App extends Component {
  constructor() {
    super();
    (this.state = {
      latlng: {
        lat: null,
        lng: null
      },
      userLocations: [],
      yelpLocations: [],
      roamLocations: [],
      loggedIn: false,
      username: null,
      newCity: "",
      category: ""
    }),
      (this.getUser = this.getUser.bind(this));
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

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
        //Since a user was found and state was set, now load the user's saved data
        this.loadSaved(this.state.username);
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
      .then(res => this.loadSaved(this.state.username))
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
    API.getNewCity(this.state.newCity)
      .then(response => {
        let newCenter = {
          latLng: response.data.results[0].locations[0].latLng,
          city: response.data.results[0].locations[0].adminArea5,
          stateAbbrv: response.data.results[0].locations[0].adminArea3,
          country: response.data.results[0].locations[0].adminArea1
        };
        let prettyJSON = JSON.stringify(newCenter, null, 4);
        console.log(`This is the updateMapCenter res:\n ${prettyJSON}`);
        this.setState({
          newCity: `${newCenter.city}, ${newCenter.stateAbbrv}, ${
            newCenter.country
          }`
        });
        this.setState({
          latlng: newCenter.latLng
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  handleSearchSubmit = event => {
    event.preventDefault();
    API.getLocations(this.state.category)
      // come back to this with proper dot notation for YELP response \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/
      .then(response => {
        /* const cleanResponse = JSON.stringify(
          response.data.jsonBody.businesses,
          null,
          4
        ); */
        this.setState({ yelpLocations: response.data.jsonBody.businesses });
        //console.log(`\n\n${cleanResponse}\n\n`);
      })
      .catch(e => {
        console.log(e);
      });
  };

  reverseLatLng = latLng => {
    API.getRevCity(latLng)
      .then(response => {
        let newCenter = {
          latLng: response.data.results[0].locations[0].latLng,
          city: response.data.results[0].locations[0].adminArea5,
          stateAbbrv: response.data.results[0].locations[0].adminArea3,
          country: response.data.results[0].locations[0].adminArea1
        };
        let prettyJSON = JSON.stringify(newCenter, null, 4);
        console.log(`This is the updateMapCenter res:\n ${prettyJSON}`);
        this.setState({
          newCity: `${newCenter.city}, ${newCenter.stateAbbrv}, ${
            newCenter.country
          }`
        });
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

  handleUserLocation = loc => {
    this.setState({
      latlng: loc
    });
    this.reverseLatLng(this.state.latlng);
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
              <form onSubmit={this.handleFormSubmit}>
                <SearchBar
                  name="newCity"
                  placeholder="a new city"
                  value={this.state.newCity}
                  onChange={this.handleInputChange}
                />
              </form>
              <Toolbar catClick={this.handleCategoryButton} />
              <RoamMap
                userLocations={this.state.userLocations}
                yelpLocations={this.state.yelpLocations}
                roamLocations={this.state.roamLocations}
                newCity={this.state.latlng}
                passLoc={this.handleUserLocation}
              />
              <PinBtn
                userLoc={this.state.latlng}
                user={this.state.username}
                newPin={this.saveLocation}
              />
              <NavbarFeatures user={this.state.username} updateUser={this.updateUser}/>} />
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
            <NavbarFeatures user={this.state.username} updateUser={this.updateUser}/>
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
              <YelpSearchCards saveCard={this.saveLocation}
              locations={this.state.yelpLocations} />
              <NavbarFeatures user={this.state.username} updateUser={this.updateUser}/>
            </div>
          )}
        />
        {/* <Route path="/home" render={() => <NavbarFeatures user={this.state.username} updateUser={this.updateUser}/>} /> */}
      </div>
    );
  }
}

export default App;
