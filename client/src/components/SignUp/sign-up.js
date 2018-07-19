import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "../LoginForm/login-form.css";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      passwordStrength: "",
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
    //this is called after state is set, because if you try to do so simultaneously you will throw an error
    //where a check happens the same time the password state is trying to be set.
    this.strengthCheck();
  }

  strengthCheck() {
    //check strength of password against regex expressions for simplicity and saving space
    //the regex is shamelessly lifted from https://martech.zone/javascript-password-strength/
    const strongRegex = new RegExp(
      "^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$",
      "g"
    );
    const mediumRegex = new RegExp(
      "^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$",
      "g"
    );
    const enoughRegex = new RegExp("(?=.{6,}).*", "g");
    let password = this.state.password;
    if (password.length === 0) {
      this.setState({ passwordStrength: "Enter Password" });
    } else if (!enoughRegex.test(password)) {
      this.setState({ passwordStrength: "Minimum 7 characters" });
    } else if (strongRegex.test(password)) {
      this.setState({ passwordStrength: "Strong!" });
    } else if (mediumRegex.test(password)) {
      this.setState({ passwordStrength: "Ok" });
    } else {
      this.setState({ passwordStrength: "Weak" });
    }
  }

  handleSubmit(event) {
    console.log("sign-up handleSubmit, username: ");
    console.log(this.state.username);
    event.preventDefault();

    //request to server to add a new username/password
    //if password===confirm password, continue, else, exit and alert that passwords must match.
    if (this.state.password === this.state.confirmPassword) {
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
              errorMessage: "Username unavailable."
            });
            alert("username already taken");
          }
        })
        .catch(error => {
          console.log("signup error: ");
          console.log(error);
        });
    } else {
      this.setState({
        errorMessage: "Passwords must match"
      });
    }
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div className="container">
          <div className="login-signup-bg">
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
                  <span className="error-message" id="strength">
                    {this.state.passwordStrength}
                  </span>
                </div>
              </div>
              <div className="form-group-row">
                <label
                  htmlFor="confirm-password"
                  className="col-sm-4 col-form-label"
                >
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
              <a href="/login">Already a member? Log in here.</a>
            </form>
          </div>
        </div>
      );
    }
  }
}

export default Signup;
