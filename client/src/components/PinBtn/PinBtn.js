import React from "react";
import {
  Button,
  Fa,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "mdbreact";
import "./PinBtn.css";

class PinBtn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      locName: "",
      locComment: "",
      locCategory: ""
    };

    this.toggle = this.toggle.bind(this);
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  render() {
    return (
      <div>
        <Button className="btn-large save-location-btn" onClick={this.toggle}>
          +
        </Button>
        <div className="modal-container">
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          size="fluid"
          position="bottom"
        >
          <ModalHeader className="header">Add New Location</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label> Category:</label>
              <select
                className="form-control"
                onChange={this.handleInputChange}
                name="locCategory"
              >
                <option>Brewery</option>
                <option>Restaurants</option>
                <option>Local Flavor</option>
                <option>Concert Venue</option>
                <option>Parks</option>
              </select>
            </div>
            <label>Location Name</label>
            <input
              type="text"
              className="form-control"
              label="Loaction Name"
              id="location-name"
              name="locName"
              onChange={this.handleInputChange}
            />
            <label>Comments</label>
            <textarea
              type="textarea"
              className="form-control form-control-lg"
              label="Add Comments"
              id="location-comment"
              name="locComment"
              onChange={this.handleInputChange}
            />
            <Button className="btn-large-modal btn-large-left">
              <Fa icon="camera-retro" size="2x" />
            </Button>{" "}
            <span className="add-photo"> Add Photo </span>
          </ModalBody>

          <ModalFooter className="footer">
            <Button className="btn-large-modal" onClick={this.toggle}>
              <Fa icon="times" size="2x" />
            </Button>{" "}
            <Button
              className="btn-large-modal"
              onClick={() => {
                this.props.newPin({
                  name: this.state.locName,
                  location: {
                    lat: this.props.userLoc.lat,
                    long: this.props.userLoc.lng
                  },
                  user: this.props.user,
                  comments: this.state.locComment,
                  category: this.state.locCategory
                });
                this.setState({
                  modal: false
                });
              }}
            >
              <Fa icon="save" size="2x" />
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      </div>
    );
  }
}

export default PinBtn;
