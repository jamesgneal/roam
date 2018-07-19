import React, { Component } from "react";
import SaveBtn from "../SaveBtn";
import { Col, Row, Container } from "../Grid";
import { List, ListItem } from "../List";
import "./YelpSearchCards.css";

class YelpSearchCards extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="sm-12">
            {this.props.locations.length ? (
              <List>
                {this.props.locations.map((location, index) => (
                  <ListItem key={`${location.id}-${index}`}>
                    <a href={location.url}>
                      <h5 id="location-title">{location.name}</h5>
                    </a>
                    <p>Category: {location.categories[0].title}</p>
                    <p>Rating: {location.rating}/5</p>
                    <p>{location.display_phone}</p>
                    <p>{location.display_address}</p>

                    <SaveBtn
                      onClick={() => {
                        this.props.saveCard({
                          name: location.name,
                          location: {
                            lat: location.coordinates.latitude,
                            long: location.coordinates.longitude
                          },
                          url: location.url,
                          user: this.props.loggedInAs,
                          comments: `Category: ${
                            location.categories[0].title
                          } Rating: ${location.rating}/5\n${
                            location.display_phone
                          }\n${location.display_address}`
                        });
                        this.props.reloadSaved(this.props.loggedInAs);
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h6 className="text-center mt-5">
                Go ahead and search. We'll wait.
              </h6>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default YelpSearchCards;
