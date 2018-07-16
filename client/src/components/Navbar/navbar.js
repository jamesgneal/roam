import React from 'react';
import { Navbar, Button, ButtonGroup, NavbarNav, NavItem, Fa } from 'mdbreact';
import { Link, Redirect, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios'
//import ToolbarFeatures from '../Toolbar/toolbar';
import './navbar.css';


class NavbarFeatures extends React.Component {
    constructor() {
        super()
        this.state = {
            redirectTo: null,
        }
        this.logout = this.logout.bind(this)
    }

    componentDidUpdate() {
        if (this.props.user) {
            /* this.setState({
                redirectTo: "/home/pins"
            }) */
        } else {
            this.setState({
                redirectTo: "/"
            })
        }
    }

    logout(event) {
        event.preventDefault()
        console.log('logging out')
        axios.post('/api/user/logout').then(response => {
            console.log(response.data)
            if (response.status === 200) {
                this.props.updateUser({
                    loggedIn: false,
                    username: null
                })
            }
        }).catch(error => {
            console.log('Logout error: ', error)
        })
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />;
        } else {
            return (

                <div>
                    {/* <div className="input-group md-form form-sm form-1 pl-0">
                    <div className="input-group-prepend">
                        <span className="input-group-text black lighten-3" id="basic-text1"><i className="fa fa-search text-white" aria-hidden="true"></i></span>
                    </div>
                    <input className="form-control my-0 py-1" type="text" placeholder="City,  State,  or Zip Code" aria-label="Search" />
                </div> */}
                    {/* <ToolbarFeatures /> */}
                        <Navbar dark color="black" expand fixed="bottom">
                            <NavbarNav center="true">
                                <NavItem>
                                    <Link to="/home/pins" >
                                        <Fa icon="map-marker" />
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/home/search" >
                                        <Fa icon="binoculars" />
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/home/saved" >
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
}

export default NavbarFeatures;