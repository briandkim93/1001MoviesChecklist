import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './Login.css';
import { toggleSignup, closeSignup, closeLogin, togglePasswordResetRequest, login } from '../../../actions/authentication';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      response: {
        status: 0, 
        message: ''
      }
    };
    
    this.handleTogglePasswordResetRequest = this.handleTogglePasswordResetRequest.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleTogglePasswordResetRequest() {
    this.props.togglePasswordResetRequest();
    this.props.closeSignup();
    this.props.closeLogin();
  }

  handleInputChange(event) {
    this.setState({
      [event.target.id.replace('login-', '')]: event.target.value
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    if (this.state.username !== '' && this.state.password !== '') {
      this.props.login(this.state.username.toLowerCase(), this.state.password);
    } else {
      this.setState({
        response: {
          status: 0, 
          message: 'Please do not leave any blank fields.'
        }
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.displayLogin !== prevProps.displayLogin) {
      if (!this.props.displayLogin) {
        this.setState({
          username: '',
          password: '',
          response: {
            status: 0, 
            message: ''
          }
        });
      }
    }
    if (this.props.loginStatus !== prevProps.loginStatus) {
      if (this.props.loginStatus.status === 200) {
        this.setState({
          username: '',
          password: '',
          response: {
            status: 0, 
            message: ''
          }
        });
        this.props.closeLogin();
      } else {
        this.setState({
          password: '',
          response: {
            status: 0, 
            message: 'Invalid username or password. Please try again.'
          }
        });
      }
    }
    if (this.props.facebookLoginStatus !== prevProps.facebookLoginStatus) {
      if (this.props.facebookLoginStatus.status === 200) {
        this.setState({
          username: '',
          password: '',
          response: {
            status: 0, 
            message: ''
          }
        });
        this.props.closeLogin();
      }
    }
  }

  render() {
    return (
      <div className={`row justify-content-center ${!this.props.displayLogin ? 'd-none' : ''}`}>
        <form 
          className="popup-form login-form col-11 col-sm-6 center-block position-fixed bg-light p-3 mt-3" 
          encType='multipart/form-data' 
          onSubmit={this.handleFormSubmit}
        >
          <div>
            <button type="button" className="close" onClick={this.props.closeLogin}>
              <span>&times;</span>
            </button>
          </div>
          <h3 className="font-weight-light text-center mb-1">
            Login to Your Account
          </h3>
          <hr />
          <div className="form-group">
            <label htmlFor="login-username">Username:</label>
            <input 
              id="login-username" 
              className="form-control shadow-sm" 
              type="text" 
              value={this.state.username} 
              onChange={this.handleInputChange} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="login-password">Password:</label>
            <input 
              id="login-password" 
              className="form-control shadow-sm" 
              type="password" 
              value={this.state.password} 
              onChange={this.handleInputChange} 
            />
          </div>
          <div className="text-danger small">
            {this.state.response.message}
          </div>
          <div>
            <span className="btn btn-link btn-sm text-primary p-0" onClick={this.handleTogglePasswordResetRequest}>(Forgot Username or Password?)</span>
          </div>
          <div className="w-100 overflow-auto mt-2">
            <button type="submit" className="btn btn-warning float-right">Login</button>
          </div>
          <div>
            <p className="popup-form-seperator my-4">
              <span className="bg-light px-1">OR</span>
            </p>
          </div>
          {this.props.facebookLoginRenderStatus ? <div className="loader loader-fbsdk position-absolute" /> : ''}
          <div className="text-center">
            <div 
              className="fb-login-button" 
              data-max-rows="1" 
              data-size="large" 
              data-button-type="login_with" 
              data-show-faces="false" 
              data-auto-logout-link="false" 
              data-use-continue-as="false" 
              data-scope="email" 
            />
          </div>
        </form>
      </div>
    );
  }
}

function mapPropsToState(state) {
  return {
    displayLogin: state.displayLogin, 
    loginStatus: state.loginStatus, 
    facebookLoginStatus: state.facebookLoginStatus,
    facebookLoginRenderStatus: state.facebookLoginRenderStatus,
    token: state.token,
    userInfo: state.userInfo
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleSignup: toggleSignup, 
    closeSignup: closeSignup, 
    closeLogin: closeLogin, 
    togglePasswordResetRequest: togglePasswordResetRequest,
    login: login
  }, dispatch);
}

export default connect(mapPropsToState, mapDispatchToProps)(Login);