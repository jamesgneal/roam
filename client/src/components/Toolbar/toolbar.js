import React from "react";
import {
  Button,
  Fa
} from "mdbreact";
import "./toolbar.css";

class ToolbarFeatures extends React.Component { 
  render() {
    return (
      <div>
        <div className="background modal-container">
          <div className="toolbar">
            <Button className="btn-circle" onClick={(e) => this.props.catClick("breweries", e)}>
              <Fa icon="beer" />
            </Button>
            {/* <Button className="btn-circle">
              <Fa icon="shopping-bag" />
            </Button> */}
            <Button className="btn-circle" onClick={(e) => this.props.catClick("restaurants", e)}>
              <Fa icon="apple" id="apple" />
            </Button>
            <Button className="btn-circle" onClick={(e) => this.props.catClick("local flavor", e)}>All</Button>
            <Button className="btn-circle" onClick={(e) => this.props.catClick("concert venues", e)}>
              <Fa icon="headphones" />
            </Button>
            <Button className="btn-circle" onClick={(e) => this.props.catClick("parks", e)}>
              <Fa icon="bicycle" />
            </Button>
            {/* <Button className="btn-circle">
              <Fa icon="users" />
            </Button> */}
          </div>
        </div>

        {/* <div>
          <div className="save-location-btn">
            <Button className="btn-large" onClick={this.toggle}>
              +
            </Button>
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              size="fluid"
              position="bottom"
            >
              <ModalHeader toggle={this.toggle} className="header" />
              <ModalBody>
                <div className="form-group">
                  <label> Choose Category:</label>
                  <select className="form-control">
                    <option>Drinks</option>
                    <option>Shopping</option>
                    <option>Scenic</option>
                    <option>Music</option>
                    <option>Outdoors</option>
                    <option>Misc</option>
                  </select>
                </div>
                <br />
                <label>Add Comments:</label>
                <input
                  type="textarea"
                  className="form-control form-control-lg"
                  label="Add Comments:"
                />
                <br />
                <Button className="btn-large-modal btn-large-left">
                  <Fa icon="camera-retro" size="2x" />
                </Button>{" "}
                <span className="add-photo"> Add Photo </span>
              </ModalBody>

              <ModalFooter className="footer">
                <Button className="btn-large-modal" onClick={this.toggle}>
                  <Fa icon="times" size="2x" />
                </Button>{" "}
                <Button className="btn-large-modal">
                  <Fa icon="save" size="2x" />
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </div> */}
      </div>
    );
  }
}

export default ToolbarFeatures;
