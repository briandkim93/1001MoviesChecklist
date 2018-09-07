import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '../../logo.png';
import { toggleSignup, closeSignup, toggleLogin, closeLogin, closeReset, logout } from '../../actions';

class Header extends Component {
  constructor(props) {
    super(props);

    this.handleToggleSignup = this.handleToggleSignup.bind(this);
    this.handleToggleLogin = this.handleToggleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleToggleSignup() {
    this.props.toggleSignup();
    this.props.closeLogin();
    this.props.closeReset();
  }
  handleToggleLogin() {
    this.props.toggleLogin();
    this.props.closeSignup();
    this.props.closeReset();
  }
  handleLogout() {
    this.props.logout(this.props.token);
    window.location = '/';
  }
  render() {
    if (this.props.token) {
      return (
        <div className="row">
          <nav className="navbar navbar-expand-sm navbar-dark bg-dark col-12">
            <span className="navbar-brand"><img className="mr-3" src={logo} alt="1001 Movies Checklist Logo" />Movies Checklist</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <div className="navbar-nav ml-auto">
                <span><Link to='/account/settings' className="nav-link btn">Account</Link></span>
                <span className="nav-link btn" onClick={this.handleLogout}>Logout</span>
              </div>
            </div>
          </nav>
        </div>
      );     
    } else if (!this.props.token) {
      return (
        <div className="row">
          <nav className="navbar navbar-expand-sm navbar-dark bg-dark col-12">
            <span className="navbar-brand"><img className="mr-3" src={logo} alt="1001 Movies Checklist Logo" />Movies Checklist</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <div className="navbar-nav ml-auto">
                <span className="nav-link btn" onClick={this.handleToggleSignup}>Sign Up</span>
                <span className="nav-link btn" onClick={this.handleToggleLogin}>Login</span>
              </div>
            </div>
          </nav>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    token: state.token
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleSignup: toggleSignup,
    closeSignup: closeSignup,
    toggleLogin: toggleLogin,
    closeLogin: closeLogin,
    closeReset: closeReset,
    logout: logout,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);