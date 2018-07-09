import React, { Component } from "react";
import footerStyle from "./Footer.css"
import { Link } from 'react-router-dom'
import axios from 'axios'

class Footer extends Component {
  constructor() {
    super()
    this.logout = this.logout.bind(this)
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
      console.log('Logout error')
    })
  }
  render() {
    const loggedIn = this.props.loggedIn;
    console.log('navbar render, props: ')
    console.log(this.props);

    return (
      <nav
        className="navbar fixed-bottom navbar-dark bg-dark navbar-expand-sm"
        data-toggle="affix"
        style={footerStyle}
      >
        <div className="mx-auto d-sm-flex d-block flex-sm-nowrap">
          <div className="text-center">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#">SEARCH</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">HOME</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">SAVED</a>
              </li>
              {loggedIn ? (
                <li className="nav-item">
                  <Link to="#" className="nav-link" onClick={this.logout}>
                    LOGOUT</Link>
                </li>
              ) : (
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      LOGIN</Link>
                  </li>
                )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Footer;
