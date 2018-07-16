import React from "react";
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

class LocationCard extends React.Component {
  render() {
    return (
      <div className="container-fluid cards">
        <Card>
          <CardBody>
            <CardTitle tag="h5">{this.props.title}</CardTitle>
            <CardText>  
              {this.props.text}
            </CardText>
            <Button className="btn-circle">
              <Fa icon="map-marker" />
            </Button>
            <Button className="btn-circle" onCLick>
              <Fa icon="trash" />
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default LocationCard;
