import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { confirmResetPassword } from '../../../actions/authentication';

class PasswordReset extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password1: '',
      password2: '',
      response: {
        status: 0, 
        message: ''
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.id.replace('reset-', '')]: event.target.value
    });
  }

  validate(password1, password2) {
    if (password1 !== '' && password2 !== '') {
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
                message: 'Passwords did not match, please try again.'
              }
            };
          }
        } else if (password1.length > 128) {
          return {
            response: {
              status: 0, 
              message: 'Password must not exceed 128 characters.'
            }
          };
        }
      } else if (password1.length < 8) {
          return {
            response: {
              status: 0, 
              message: 'Password must be at least 8 characters.'
            }
          };
      }
    } else if (password1 === '' || password2 === '') {
      return {
        response: {
          status: 0, 
          message: 'Please do not leave any blank fields.'
        }
      };
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.setState({
      password1: '',
      password2: '',
    });
    const validation_response = this.validate(this.state.password1, this.state.password2).response;
    if (validation_response.status === 2) {
      this.props.confirmResetPassword(this.state.password1, this.state.password2, this.props.match.params.uid, this.props.match.params.token);
    } else {
      this.setState({
        response: validation_response
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.passwordResetStatus !== prevProps.passwordResetStatus) {
      if (this.props.passwordResetStatus.status === 200) {
        this.setState({
          response: {
            status: 1, 
            message: 'Password reset successfully!'
          }
        });
      } else if (this.props.passwordResetStatus.status === 400 && this.props.passwordResetStatus.data.hasOwnProperty('new_password1')) {
        this.setState({
          response: {
            status: 0, 
            message: this.props.passwordResetStatus.data.new_password1[0]
          }
        });
      } else if (this.props.passwordResetStatus.status === 400 && this.props.passwordResetStatus.data.hasOwnProperty('new_password2')) {
        this.setState({
          response: {
            status: 0, 
            message: this.props.passwordResetStatus.data.new_password2[0]
          }
        });
      } else {
        this.setState({
          response: {
            status: 0, 
            message: 'This link has expired.'
          }
        });
      }
    }
  }
  
  render() {
    return (
      <div>
        <div className="row justify-content-center mt-3">
          <form 
            className="account-settings-form col-11 center-block text-white-50 p-3" 
            encType='multipart/form-data' 
            onSubmit={this.handleFormSubmit}
          >
            <div className="text-center">
              <h1 className="font-weight-light text-warning mb-1">
                Password Reset
              </h1>
            </div>
            <hr className="border-black" />
            {this.state.response.status === 1
              ? (
                  <div className="text-center">
                    <div className="my-2">
                      {this.state.response.message}
                    </div>
                    <div className="mb-5">
                      Please login to continue.
                    </div>
                  </div>
              )
              : (
                <div>
                  <div className="form-group">
                    <label htmlFor="reset-password1">New Password:</label>
                    <input 
                      id="reset-password1" 
                      className="account-settings-input form-control border-black" 
                      type="password" 
                      value={this.state.password1} 
                      onChange={this.handleInputChange} 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="reset-password2">Confirm Password:</label>
                    <input 
                      id="reset-password2" 
                      className="account-settings-input form-control border-black" 
                      type="password" 
                      value={this.state.password2} 
                      onChange={this.handleInputChange} 
                    />
                  </div>
                  <div className="text-danger small">
                    {this.state.response.message}
                  </div>
                  <button className="btn btn-warning float-right" type="submit">
                    Confirm
                  </button>
                </div>
              )
            }
          </form>
        </div>
        <div className="row justify-content-center">
          <div className="col-11 center-block text-center">
            <Link className="text-link text-warning" to='/'>Back to Homepage</Link>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    passwordResetStatus: state.passwordResetStatus
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    confirmResetPassword: confirmResetPassword
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);