import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavItem, NavLink } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';

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
                <Navbar color="indigo" dark expand="md" scrolling>
                    <NavbarBrand href="/">
                        <strong>Navbar</strong>
                    </NavbarBrand>
                
                    
                        <NavbarNav left>
                          <NavItem active>
                              <NavLink to="#">Home</NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink to="#">Map</NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink to="#">Saved Locations</NavLink>
                          </NavItem>
                          
                        </NavbarNav>
                        
                
                </Navbar>
            </Router>
        );
    }
}

export default NavbarFeatures;