import React, { Component } from "react";
import Button from "mdbreact";
import "./toolbar.css";

class Toolbar extends Component {
  render() {
    return (
      <div>
        <div className="background toolbar">
          <div className="toolbar">
            <Button
              className="btn-circle"
              onClick={e => this.props.catClick("restaurants", e)}
            >
            asdf
              {/* <MaterialIcon icon="restaurant" invert /> */}
            </Button>
            <Button
              className="btn-circle"
              onClick={e => this.props.catClick("bars", e)}
            >
            asdf
              {/* <MaterialIcon icon="local_bar" invert /> */}
            </Button>
            <Button
              className="btn-circle"
              onClick={e => this.props.catClick("coffee", e)}
            >
            asdf
              {/* <MaterialIcon icon="local_cafe" invert /> */}
            </Button>
            <Button
              className="btn-circle"
              onClick={e => this.props.catClick("local flavor", e)}
            >
            asdf
              {/* <MaterialIcon icon="all_inclusive" invert /> */}
            </Button>
            <Button
              className="btn-circle"
              onClick={e => this.props.catClick("parks", e)}
            >
            asdf
              {/* <MaterialIcon icon="local_florist" invert /> */}
            </Button>
            <Button
              className="btn-circle"
              onClick={e => this.props.catClick("swimming", e)}
            >
            asdf
              {/* <MaterialIcon icon="local_bar" invert /> */}
            </Button>
            <Button
              className="btn-circle"
              onClick={e => this.props.catClick("hiking", e)}
            >
            asdf
              {/* <MaterialIcon icon="terrain" invert /> */}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Toolbar;
