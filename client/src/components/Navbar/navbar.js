import React from 'react';
import { Navbar, Button, ButtonGroup, NavbarNav, NavItem, NavLink, Fa } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
//import ToolbarFeatures from '../Toolbar/toolbar';
import './navbar.css';


class NavbarFeatures extends React.Component {

    render() {
        return (

            <div>
                {/* <div className="input-group md-form form-sm form-1 pl-0">
                    <div className="input-group-prepend">
                        <span className="input-group-text black lighten-3" id="basic-text1"><i className="fa fa-search text-white" aria-hidden="true"></i></span>
                    </div>
                    <input className="form-control my-0 py-1" type="text" placeholder="City,  State,  or Zip Code" aria-label="Search" />
                </div> */}
                {/* <ToolbarFeatures /> */}
                <Router>
                    <Navbar dark color="black" expand fixed="bottom">
                        <NavbarNav center="true">
                            <NavItem>
                                <NavLink to="/home">
                                    <Fa icon="map-marker" />
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/search">
                                    <Fa icon="binoculars" />
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/saved">
                                    <Fa icon="list" />
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/logout">
                                    <Fa icon="sign-out" />
                                </NavLink>
                            </NavItem>
                        </NavbarNav>
                    </Navbar>
                </Router>
                {/* <div className="time-btn-group">
                    <ButtonGroup className="time">
                        <Button className="time-btn" href="#">H</Button>
                        <Button className="time-btn" href="#">D</Button>
                        <Button className="time-btn" href="#">W</Button>
                        <Button className="time-btn" href="#">M</Button>
                        <Button className="time-btn" href="#">Y</Button>
                    </ButtonGroup>
                </div> */}
            </div>
        );
    }
}

export default NavbarFeatures;