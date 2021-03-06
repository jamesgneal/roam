import React, { Component } from "react";
import DeleteBtn from "../DeleteBtn";
import { Col, Row, Container } from "../Grid";
import { Card, CardBody, CardText, CardGroup, CardImage } from "mdbreact";
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
                      <CardImage className="img-fluid" src={location.image} />
                        <CardBody>
                          <div className="location-desc">
                          <h5>
                            <a href={location.url}>{location.name}</a>
                          </h5>
                          <CardText>
                            <p>{location.comments}</p>
                          </CardText>
                          </div>
                          <div className="location-action">
                          <DeleteBtn
                            onClick={() => this.props.deleteCard(location._id)}
                          />
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                  </CardGroup>
                ) : (
                  <h6 className="text-center">No saved locations. How dull.</h6>
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
