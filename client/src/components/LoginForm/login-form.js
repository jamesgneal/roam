import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./login-form.css";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      redirectTo: null,
      errorMessage: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate() {
      if (this.props.user) {
          this.setState({
              redirectTo: "/home/pins"
          })
      }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("handleSubmit");

    axios
      .post("/api/user/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log("login response: ");
        console.log(response);
        if (response.status === 200) {
          // update App.js state
          this.props.updateUser({
            loggedIn: true,
            username: response.data.username
          });
          // update the state to redirect to home
          this.setState({
            redirectTo: "/home/pins"
          });
        }
      })
      .catch(error => {
        console.log(`login error:\n${error}`);
        this.setState({
          errorMessage:
            "Username and password not found. Please try again or sign up."
        });
      });
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div className="container">
          <form id="form-mainbox">
            <h1>roam</h1>
            <p className="error-message">{this.state.errorMessage}</p>
            <div className="form-group-row">
              <label htmlFor="username" className="col-sm-4 col-form-label">
                USERNAME
              </label>
              <div className="col-sm-8">
                <input
                  className="form-input"
                  type="text"
                  id="username"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-group-row">
              <label htmlFor="password" className="col-sm-4 col-form-label">
                PASSWORD
              </label>
              <div className="col-sm-8">
                <input
                  className="form-input bottom-form-input"
                  id="password"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <button
              className="btn btn-dark col-mr-auto"
              onClick={this.handleSubmit}
              type="submit"
            >
              Log In
            </button>
            <br />
            <a href="/signup">
              Not a member? Register here.
            </a>
          </form>
          {/* </div>
          </div> */}
        </div>
      );
    }
  }
}

export default LoginForm;
