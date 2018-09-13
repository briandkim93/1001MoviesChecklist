import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '../../logo.png';
import { toggleSignup, closeSignup, toggleLogin, closeLogin, closePasswordResetRequest, logout } from '../../actions';

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
  }

  render() {
    return (
      <div className="row">
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark col-12">
          <span className="navbar-brand"><Link to='/'><img className="mr-3" src={logo} alt="1001 Movies Checklist Logo" /></Link>Movies Checklist</span>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
          {this.props.token
              ? (
                <div className="navbar-nav ml-auto">
                  <span><Link className="nav-link btn" to='/account/settings'>Account</Link></span>
                  <span><Link className="nav-link btn" to='/' onClick={this.handleLogout}>Logout</Link></span>
                </div>
              )
              : (
                <div className="navbar-nav ml-auto">
                  <span className="nav-link btn" onClick={this.handleToggleSignup}>Sign Up</span>
                  <span className="nav-link btn" onClick={this.handleToggleLogin}>Login</span>
                </div>
              )
          }
          </div>
        </nav>
      </div>
    );     
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
    closePasswordResetRequest: closePasswordResetRequest,
    logout: logout,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);