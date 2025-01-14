import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../store/actions";

const validUser = "atul.soam21b@iiitg.ac.in";
const Navbar = ({ auth, logout }) => (
  <div className="navbar">
    <div className="container">
      <ul className="navbar-container">
        <li>
          <Link className="navbar-brand" to="/">
            Home
          </Link>
        </li>
        {!auth.isAuthenticated && (
          <Fragment>
            <li>
              <Link className="navbar-item" to="/register">
                {" "}
                Register
              </Link>
            </li>
            <li>
              <Link className="navbar-item" to="/login">
                Login
              </Link>
            </li>
          </Fragment>
        )}
        {auth.isAuthenticated && auth.user.username === validUser && (
          <Fragment>
            <li>
              {/* <Link className="navbar-item" to="/test">
            Test
          </Link> */}
              <Link className="navbar-item" to="/poll/new">
                Create Poll
              </Link>
            </li>
          </Fragment>
        )}
        {auth.isAuthenticated && (
          <Fragment>
            <li>
              <Link className="navbar-item" to="/poll">
                Polls
              </Link>
            </li>
            <li>
              <a className="navbar-item" onClick={logout}>
                Logout
              </a>
            </li>
          </Fragment>
        )}
      </ul>
      {auth.isAuthenticated && (
        <p className="navbar-user">Logged in as {auth.user.username}</p>
      )}
    </div>
  </div>
);

export default connect((store) => ({ auth: store.auth }), { logout })(Navbar);
