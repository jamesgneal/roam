import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import axios from "axios";
import "../LoginForm/login-form.css"

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: "", 
      password: "",
      confirmPassword: "",
      redirectTo: null,
      errorMessage: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSubmit(event) {
    console.log("sign-up handleSubmit, username: ");
    console.log(this.state.username);
    event.preventDefault();

    //request to server to add a new username/password
    axios
      .post("/api/user/", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log(response);
        if (!response.data.errmsg) {
          console.log("successful signup");
          this.setState({
            //redirect to login page
            redirectTo: "/"
          });
        } else {
          this.setState({
            errorMessage:
              "Username unavailable."
          });
          alert("username already taken");
        }
      })
      .catch(error => {
        console.log("signup error: ");
        console.log(error);
      });
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div className="container">
          <form id="form-mainbox">
          <h5>Sign up for</h5>
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
                  className="form-input"
                  id="password"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-group-row">
              <label htmlFor="confirm-password" className="col-sm-4 col-form-label">
                CONFIRM PASSWORD
              </label>
              <div className="col-sm-8">
                <input
                  className="form-input bottom-form-input"
                  id="confirm-password"
                  type="password"
                  name="confirmPassword"
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <button
              className="btn btn-dark col-mr-auto"
              onClick={this.handleSubmit}
              type="submit"
            >
              Sign Up
            </button>
            <br />
            <a href="/login">
              Already a member? Log in here.
            </a>
          </form>
        </div>
      );
    }
  }
}

export default Signup;
