import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";
import { logout } from '../../_actions/authActions'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Navbar extends Component {
  onLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLink = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a href="#" onClick={this.onLogout.bind(this)} className="nav-link">
            Logout
            {this.props.history.push('/login')}
          </a>
        </li>
      </ul>
    );

    const guestLink = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/registration">
            Sign Up
                </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
                </Link>
        </li>
      </ul>
    );


    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            WODLogger
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  {" "}
                  WODs
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLink : guestLink}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  history: PropTypes.object //let's us redirect within action
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(withRouter(Navbar));