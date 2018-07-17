import React from "react";
import { Navbar, Button, ButtonGroup, NavbarNav, NavItem, Fa } from "mdbreact";
import { Link, Redirect, BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
//import ToolbarFeatures from '../Toolbar/toolbar';
import "./navbar.css";

class NavbarFeatures extends React.Component {
  constructor() {
    super();
    this.state = {
      redirectTo: null
    };
    this.logout = this.logout.bind(this);
  }

  componentDidUpdate() {
    if (this.props.user) {
      /* this.setState({
                redirectTo: "/home/pins"
            }) */
    } else {
      this.setState({
        redirectTo: "/"
      });
    }
  }

  logout(event) {
    event.preventDefault();
    console.log("logging out");
    axios
      .post("/api/user/logout")
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
          this.props.updateUser({
            loggedIn: false,
            username: null
          });
        }
      })
      .catch(error => {
        console.log("Logout error: ", error);
      });
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div>
          <Navbar id="navbar" expand fixed="bottom">
            <NavbarNav center="true">
              <NavItem>
                <Link to="/home/pins">
                  <Fa icon="map-marker" />
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/home/search">
                  <Fa icon="binoculars" />
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/home/saved">
                  <Fa icon="list" />
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/" onClick={this.logout}>
                  <Fa icon="sign-out" />
                </Link>
              </NavItem>
            </NavbarNav>
          </Navbar>
        </div>
      );
    }
  }
}

export default NavbarFeatures;
