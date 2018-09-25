import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './Signup.css';
import { closeSignup, signup } from '../../../actions/authentication';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password1: '',
      password2: '',
      response: {
        status: 0, 
        position: 0, 
        message: ''
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.id.replace('signup-', '')]: event.target.value
    });
  }

  validate(username, email, password1, password2) {
    if (username !== '' && email !== '' && password1 !== '' && password2 !== '') {
      if (username.match(/^[\w._]+$/)) {
        if (!password1.match(/^\d+$/) && !password1.match(/^[a-zA-Z_.]+$/)) {
          if (username.length <= 30) {
            if (email.length <= 254) {
              if (password1.length >= 8) {
                if (password1.length <= 128) {
                  if (password1 === password2) {
                    return {
                      response: {
                        status: 2
                      }
                    };
                  } else if (password1 !== password2) {
                    return {
                      response: {
                        status: 0, 
                        position: 4, 
                        message: 'Passwords did not match, please try again.'
                      }
                    };
                  }
                } else if (password1.length > 128) {
                  return {
                    response: {
                      status: 0, 
                      position: 3, 
                      message: 'Password must not exceed 128 characters.'
                    }
                  };
                }
              } else if (password1.length < 8) {
                return {
                  response: {
                    status: 0, 
                    position: 3, 
                    message: 'Password must be at least 8 characters.'
                  }
                };
              }
            } else if (email.length > 254) {
              return {
                response: {
                  status: 0, 
                  position: 2, 
                  message: 'Email must not exceed 254 characters.'
                }
              };
            }
          } else if (username.length > 30) {
            return {
              response: {
                status: 0, 
                position: 1, 
                message: 'Username must not exceed 30 characters.'
              }
            };
          }
        } else if (password1.match(/^\d+$/) || password1.match(/^[a-zA-Z_.]+$/)) {
          return {
            response: {
              status: 0, 
              position: 3, 
              message: 'Password must contain at least one number and one letter.'
            }
          };
        }
      } else if (!username.match(/^[\w._]+$/)) {
        return {
          response: {
            status: 0, 
            position: 1, 
            message: 'Username may only contain letters, numbers, periods, and underscores.'}
        };
      }
    } else if (username === '' || email === '' || password1 === '' || password2 === '') {
      return {
        response: {
          status: 0, 
          position: 4, 
          message: 'Please do not leave any blank fields.'}
      };
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.setState({
      password1: '',
      password2: '',
    });
    const validation_response = this.validate(this.state.username, this.state.email, this.state.password1, this.state.password2).response;
    if (validation_response.status === 2) {
      this.props.signup(this.state.username.toLowerCase(), this.state.email.toLowerCase(), this.state.password1);
    } else {
      this.setState({
        response: validation_response
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.displaySignup !== prevProps.displaySignup) {
      if (!this.props.displaySignup) {
        this.setState({
          username: '',
          email: '',
          password1: '',
          password2: '',
          response: {
            status: 0, 
            position: 0, 
            message: ''
          }
        });
      }
    }
    if (this.props.signupStatus !== prevProps.signupStatus) {
      if (this.props.signupStatus.status === 201) {
        this.setState({
          username: '',
          email: '',
          response: {
            status: 1, 
            position: 5, 
            message: 'Account created successfully!'
          }
        });
      } else if (this.props.signupStatus.status === 400 && this.props.signupStatus.data.hasOwnProperty('username')) {
        this.setState({
          response: {
            status: 0, 
            position: 1, 
            message: this.props.signupStatus.data.username[0]
          }
        });
      } else if (this.props.signupStatus.status === 400 && this.props.signupStatus.data.hasOwnProperty('email')) {
        this.setState({
          response: {
            status: 0, 
            position: 2, 
            message: this.props.signupStatus.data.email[0]
          }
        });
      } else if (this.props.signupStatus.status === 400 && this.props.signupStatus.data.hasOwnProperty('password')) {
        this.setState({
          response: {
            status: 0, 
            position: 3, 
            message: this.props.signupStatus.data.password[0]
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
        this.props.closeSignup();
      }
    }
  }

  render() {
    return (
      <div className={`row justify-content-center ${!this.props.displaySignup && "d-none"}`}>
        <form 
          className={`popup-form signup-form col-11 col-sm-6 center-block position-fixed bg-light p-3 mt-3 ${this.state.response.status === 1 && 'signup-form-success'}`} 
          encType='multipart/form-data' 
          onSubmit={this.handleFormSubmit}
        >
          <div>
            <button className="close" type="button" onClick={this.props.closeSignup}>
              <span>&times;</span>
            </button>
          </div>
          <h3 className="font-weight-light text-center mb-1">
            Get Started on Your List
          </h3>
          <h6 className="font-weight-light text-center mb-1">
            Create A Free Account Today
          </h6>
          <hr />
          <div className={`${this.state.response.status === 0 && "d-none"}`}>
            <div className="text-center">
              <h3 className="font-weight-light mb-2 mt-4">
                {this.state.response.message}
              </h3>
              <h6 className="font-weight-light mb-4">
                Please login to continue.
              </h6>
            </div>
          </div>
          <div className={`${this.state.response.status === 1 && "d-none"}`}>
            <div className="form-group">
              <label htmlFor="signup-username">Username:</label>
              <input 
                id="signup-username" 
                className="form-control shadow-sm" 
                type="text" 
                value={this.state.username} 
                onChange={this.handleInputChange} 
              />
            </div>
            <div className="text-danger small">
              {this.state.response.position === 1 && this.state.response.message}
            </div>
            <div className="form-group">
              <label htmlFor="signup-email">Email:</label>
              <input 
                id="signup-email" 
                className="form-control shadow-sm" 
                type="email" 
                value={this.state.email} 
                onChange={this.handleInputChange} 
              />
            </div>
            <div className="text-danger small">
              {this.state.response.position === 2 && this.state.response.message}
            </div>
            <div className="form-group">
              <label htmlFor="signup-password1">Password:</label>
              <input 
                id="signup-password1" 
                className="form-control shadow-sm" 
                type="password" 
                value={this.state.password1} 
                onChange={this.handleInputChange} 
              />
            </div>
            <div className="text-danger small">
              {this.state.response.position === 3 && this.state.response.message}
            </div>
            <div className="form-group">
              <label htmlFor="signup-password2">Confirm Password:</label>
              <input 
                id="signup-password2" 
                className="form-control shadow-sm" 
                type="password" 
                value={this.state.password2} 
                onChange={this.handleInputChange} 
              />
            </div>
            <div className="text-danger small">
              {this.state.response.position === 4 && this.state.response.message}
            </div>
            <div className="w-100 overflow-auto mt-2">
              <button className="btn btn-warning float-right" type="submit">Sign Up</button>
            </div>
            <div>
              <p className="popup-form-seperator w-100 font-weight-bold text-center my-4">
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
          </div>
        </form>
      </div>
    );
  }
}

function mapPropsToState(state) {
  return {
    displaySignup: state.displaySignup, 
    facebookLoginStatus: state.facebookLoginStatus,
    facebookLoginRenderStatus: state.facebookLoginRenderStatus,
    signupStatus: state.signupStatus, 
    token: state.token,
    userInfo: state.userInfo
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    closeSignup: closeSignup, 
    signup: signup
  }, dispatch);
}

export default connect(mapPropsToState, mapDispatchToProps)(Signup);