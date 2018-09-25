import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { toggleSignup, closeSignup, toggleLogin, closeLogin, closePasswordResetRequest, logout } from '../../actions/authentication';

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
    this.props.closePasswordResetRequest();
  }

  handleToggleLogin() {
    this.props.toggleLogin();
    this.props.closeSignup();
    this.props.closePasswordResetRequest();
  }

  handleLogout() {
    this.props.logout(this.props.token);
    if (this.props.userInfo.provider === 'facebook' || this.props.userInfo.provider === 'facebook-local') {
      window.FB.logout(function(response) {
        return;
      });
    }
  }

  render() {
    return (
      <div className="row bg-black">
        <nav className="col-12 navbar navbar-expand-sm navbar-dark bg-black">
          <span className="navbar-brand">
            <Link className="text-link mr-3" to='/'>
              <img className="align-middle" src="/static/logo.png" alt="1001 Movies Checklist Logo" />
            </Link>
            <h1 className="d-inline-block align-middle mb-0">Movies Checklist</h1>
          </span>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse">
            <span className="navbar-toggler-icon" />
          </button>
          <div id="navbarCollapse" className="collapse navbar-collapse">
          {this.props.token
            ? (
              <div className="navbar-nav ml-auto">
                <span>{this.props.userInfo.provider !== 'facebook' && <Link className="nav-link btn border-0 text-link" to='/account/settings'>Account</Link>}</span>
                <span onClick={this.handleLogout}><Link className="nav-link btn border-0 text-link" to='/'>Logout</Link></span>
              </div>
            )
            : (
              <div className="navbar-nav ml-auto">
                <span className="nav-link btn border-0" onClick={this.handleToggleSignup}>Sign Up</span>
                <span className="nav-link btn border-0" onClick={this.handleToggleLogin}>Login</span>
              </div>
            )
          }
          </div>
        </nav>
        <h6 className="w-100 text-center text-sm-left text-white-50 ml-3 pb-3">
          Based on <i>1001 Movies You Must See Before You Die (7th Edition)</i>
        </h6>
        {this.props.location.pathname.includes('checklist')
          ? (
            <hr className="w-100 border-dark my-0" />
          )
          : (
            <div className="navbar-gradient w-100" />
          )
        }

      </div>
    );     
  }
}

function mapStateToProps(state) {
  return {
    token: state.token,
    userInfo: state.userInfo
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleSignup: toggleSignup,
    closeSignup: closeSignup,
    toggleLogin: toggleLogin,
    closeLogin: closeLogin,
    closePasswordResetRequest: closePasswordResetRequest,
    logout: logout
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));