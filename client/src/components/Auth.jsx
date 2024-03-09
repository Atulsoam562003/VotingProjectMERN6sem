import React, { Component } from "react";
import { connect } from "react-redux";
import swal from "sweetalert2";

import { authUser, logout } from "../store/actions";
// import ErrorMessage from "./ErrorMessage";
function isValidEmail(email) {
  return email.endsWith("@iiitg.ac.in");
}
class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      emailSent: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    const { username, password } = this.state;
    const { authType } = this.props;
    e.preventDefault();

    // Validate email format before submission
    if (!isValidEmail(username) && authType === "register") {
      swal.fire({
        title: "Invalid Email Format",
        text: "Please use a valid IIITG email address (e.g., username@iiitg.ac.in).",
        icon: "error",
      });
      this.setState({ username: "", password: "" });
      // window.location.reload();
      return; // Prevent form submission
    }
    this.props.authUser(authType || "login", { username, password });
    this.setState({ username: "", password: "", emailSent: true });
    // window.location.reload();
  }

  render() {
    const { username, password } = this.state;

    return (
      <div>
        <form className="form" onSubmit={this.handleSubmit}>
          <label className="form-label" htmlFor="username">
            emailId
          </label>
          <input
            className="form-input"
            type="text"
            value={username}
            name="username"
            autoComplete="off"
            onChange={this.handleChange}
          />

          <label className="form-label" htmlFor="password">
            password
          </label>
          <input
            className="form-input"
            type="password"
            value={password}
            name="password"
            autoComplete="off"
            onChange={this.handleChange}
          />
          <div className="button-center">
            <button className="button" type="submit">
              Submit
            </button>
          </div>
        </form>
        {/* {emailSent && (
          <div>
            <p>An email has been sent. Please check your inbox.</p>
          </div>
        )} */}
      </div>
    );
  }
}
// first parameter is mapping store to props and second one dispatches to props
export default connect((state) => ({ error: state.error }), {
  authUser,
  logout,
})(Auth);
