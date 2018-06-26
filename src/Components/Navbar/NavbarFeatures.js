import React, { Component } from 'react';
import { Navbar, NavbarNav, NavItem, NavLink, Container } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import "./Navbar.css";

class NavbarFeatures extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false,
            dropdownOpen: false
        };
    this.onClick = this.onClick.bind(this);
    this.toggle = this.toggle.bind(this);
    }

    onClick(){
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <Router>
                <Navbar className="roam-navbar" light color="white" fixed="bottom">
                    <Container>
                    
                
                    
                        <NavbarNav center>
                          <NavItem active>
                              <NavLink to="#">Home</NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink to="#">Map</NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink to="#">Saved Locations</NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink to="#">Profile</NavLink>
                          </NavItem>
                          
                        </NavbarNav>
                     </Container>   
                
                </Navbar>
            </Router>
        );
    }
}

export default NavbarFeatures;