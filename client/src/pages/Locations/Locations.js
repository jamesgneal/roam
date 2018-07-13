import React, { Component } from "react";
import SaveBtn from "../../components/SaveBtn";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import RoamMap from "../../components/Map/Map";
import "./Locations.css";

class Locations extends Component {
state = {
      user: "",
      locations: [],
      category: "",
      savedLocations: [],
      currentLocation: {
        lat: "",
        long: ""
    }
  }


  componentDidUpdate() {
    //console.log(`props for loggedInAs: ${this.props.loggedInAs}`);
    // this.props.getUser();
    // this.setState({
    //   user: this.props.loggedInAs
    // });
    this.loadSaved();
    
  }

  loadSaved = () => {
    console.log;
    API.getSaved(this.props.loggedInAs).then(res => {
      if (res.data.length !== this.state.savedLocations.length) {
        this.setState({
          savedLocations: res.data
        });
      }
      
      console.log(
        `\n****** This is the saved Locations data from mongo ******\n\n`
      );
      this.state.savedLocations.forEach(element => {
        console.log(element);
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
      .then(res => this.loadSaved())
      .catch(err => console.log(err));
  };

  saveLocation = locationData => {
    API.saveLocation(locationData)
      .then(res => this.loadSaved(this.props.loggedInAs))
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
      <Container fluid>
        <Row>
          <Col size="md-12">
            <div id="map-block">
              <RoamMap
                locations={this.state.locations}
                savedLocations={this.state.savedLocations}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <div id="formInput">
              <form onSubmit={this.handleFormSubmit}>
                <Input
                  value={this.state.subject}
                  onChange={this.handleInputChange}
                  name="category"
                  placeholder="Location Category"
                />
                {/* <FormBtn
                  disabled={!this.state.category}
                  onClick={this.handleFormSubmit}
                >
                  Search
                </FormBtn> */}
              </form>
            </div>
          </Col>
        </Row>
        <Row>
          <Col size="lg-6">
            <div className="card">
              <div className="card-header">
                <h4>Search Results</h4>
              </div>
              <div className="card-body">
                {this.state.locations.length ? (
                  <List>
                    {this.state.locations.map((location, index) => (
                      <ListItem key={`${location.id}-${index}`}>
                        <a href={location.url}>
                          <strong>{location.name}</strong>
                        </a>
                        <SaveBtn
                          onClick={() => {
                            this.saveLocation({
                              name: location.name,
                              location: {
                                lat: location.coordinates.latitude,
                                long: location.coordinates.longitude
                              },
                              url: location.url,
                              user: this.props.loggedInAs
                            });
                            console.log({
                              name: location.name,
                              location: {
                                lat: location.coordinates.latitude,
                                long: location.coordinates.longitude
                              },
                              url: location.url
                            });
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <h5 className="text-center">No Results to Display</h5>
                )}
              </div>
            </div>
          </Col>
          {/* </Row>
                <Row> */}
          <Col size="lg-6">
            <div className="card">
              <div className="card-header">
                <h4>Saved Locations</h4>
              </div>
              <div className="card-body">
                {this.state.savedLocations.length ? (
                  <List>
                    {this.state.savedLocations.map((location, index) => (
                      <ListItem key={`${location._id}-${index}`}>
                        <a href={location.url}>
                          <strong>{location.name}</strong>
                        </a>
                        <DeleteBtn
                          onClick={() => this.deleteLocation(location._id)}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <h5 className="text-center">No Saved Locations</h5>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Locations;
