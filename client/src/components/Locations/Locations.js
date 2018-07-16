import React, { Component } from "react";
import DeleteBtn from "../DeleteBtn";
import { Col, Row, Container } from "../Grid";
import { List, ListItem } from "../List";
import { Input, FormBtn } from "../Form";
import "./Locations.css";

class Locations extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="sm-12">
            <div className="card">
              <div className="card-header">
                <h4>Saved Locations</h4>
              </div>
              <div className="card-body">
                {this.props.savedLocations.length ? (
                  <List>
                    {this.props.savedLocations.map((location, index) => (
                      <ListItem key={`${location._id}-${index}`}>
                        <a href={location.url}>
                          <strong>{location.name}</strong>
                        </a>
                        <DeleteBtn
                          onClick={() => this.props.deleteCard(location._id)}
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
