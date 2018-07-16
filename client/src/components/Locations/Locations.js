import React, { Component } from "react";
import DeleteBtn from "../DeleteBtn";
import { Col, Row, Container } from "../Grid";
import { List, ListItem } from "../List";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardGroup,
  Fa
} from "mdbreact";
import "../Card";
import "./Locations.css";

class Locations extends Component {
  render() {
    return (
      <Container fluid className="cards">
        <Row>
          <Col size="sm-12">
            <div className="card">
              <div className="card-header">
                <h4>{this.props.username}'s Locations</h4>
              </div>
              <div className="card-body">
                {this.props.savedLocations.length ? (
                  <CardGroup>
                    {this.props.savedLocations.map((location, index) => (
                      <Card key={`${location._id}-${index}`}>
                        <CardBody>
                          <CardTitle tag="h3">
                            <a href={location.url}>{location.name}</a>
                          </CardTitle>
                          <CardText>
                            <strong>{location.category}</strong>
                            <p>{location.comments}</p>
                          </CardText>
                          <DeleteBtn
                            onClick={() => this.props.deleteCard(location._id)}
                          />
                        </CardBody>
                      </Card>
                    ))}
                  </CardGroup>
                ) : (
                  <h6 className="text-center">No Saved Locations</h6>
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
