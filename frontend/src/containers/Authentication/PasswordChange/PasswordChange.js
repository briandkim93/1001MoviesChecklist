import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { changePassword, confirmCredentials } from '../../../actions/authentication';

class PasswordChange extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password0: '',
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
      [event.target.id.replace('change-', '')]: event.target.value
    });
  }

  validate(password0, password1, password2) {
    if (password0 !== '' && password1 !== '' && password2 !== '') {
      if (password1.length >= 8) {
        if (password1.length <= 128) {
          if (password1 === password2) {
            return {
              response: {
                status: 2, 
              }
            };
          } else if (password1 !== password2) {
            return {
              response: {
                status: 0, 
                position: 2, 
                message: 'Passwords did not match, please try again.'
              }
            };
          }
        } else if (password1.length > 128) {
          return {
            response: {
              status: 0, 
              position: 2, 
              message: 'Password must not exceed 128 characters.'
            }
          };
        }
      } else if (password1.length < 8) {
          return {
            response: {
              status: 0, 
              position: 2, 
              message: 'Password must be at least 8 characters.'
            }
          };
      }
    } else if (password0 === '' || password1 === '' || password2 === '') {
      return {
        response: {
          status: 0, 
          position: 2, 
          essage: 'Please do not leave any blank fields.'
        }
      };
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const validation_response = this.validate(this.state.password0, this.state.password1, this.state.password2).response;
    if (validation_response.status === 2) {
      this.props.confirmCredentials(this.props.userInfo['username'], this.state.password0, 'passwordChange');
    } else {
      this.setState({
        response: validation_response
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.confirmCredentialsStatus && this.props.confirmCredentialsStatus !== prevProps.confirmCredentialsStatus) {
      if (this.props.confirmCredentialsStatus.data.context === 'passwordChange') {
        this.setState({
          password0: '',
          password1: '',
          password2: '',
        });
        if (this.props.confirmCredentialsStatus.status === 200) {
          this.props.changePassword(this.state.password1, this.props.userInfo['uid'], this.props.token);
        } else {
          this.setState({
            response: {
              status: 0, 
              position: 1, 
              message: 'Invalid password. Please try again.'
            }
          });
        }
      }
    }
    if (this.props.passwordChangeStatus !== prevProps.passwordChangeStatus) {
      if (this.props.passwordChangeStatus.status === 200) {
        this.setState({
          response: {
            status: 1, 
            message: 'Password has been changed successfully!'
          }
        });
      } else if (this.props.passwordChangeStatus.status === 400 && this.props.passwordChangeStatus.data.hasOwnProperty('password')) {
          this.setState({
            response: {
              status: 0, 
              position: 2, 
              message: this.props.passwordChangeStatus.data.password[0]
            }
          });
      }
    }
  }
  
  render() {
    return (
      <div className="row justify-content-center mt-3">
        <form className="col-11 center-block p-3" encType='multipart/form-data' onSubmit={this.handleFormSubmit}>
          <h1 className="mb-1">Account Settings</h1>
          <hr />
          {(this.props.token && (this.props.userInfo.provider !== 'facebook')) && (this.state.response.status === 1
            ? (
              <div>
                {this.state.response.message}
              </div>
            )
            : (    
              <div>
                <div className="form-group">
                  <label htmlFor="change-password0">Current Password:</label>
                  <input type="password" className="form-control" id="change-password0" value={this.state.password0} onChange={this.handleInputChange} />
                </div>
                <div className="text-danger small">
                  {this.state.response.position === 1 && this.state.response.message}
                </div>
                <div className="form-group">
                  <label htmlFor="change-password1">New Password:</label>
                  <input type="password" className="form-control" id="change-password1" value={this.state.password1} onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="change-password2">Confirm New Password:</label>
                  <input type="password" className="form-control" id="change-password2" value={this.state.password2} onChange={this.handleInputChange} />
                </div>
                <div className="text-danger small">
                  {this.state.response.position === 2 && this.state.response.message}
                </div>
                <button type="submit" className="btn btn-primary float-right">Confirm</button>
              </div>
            )
          )}
          {(!this.props.token || (this.props.userInfo.provider === 'facebook')) &&
            (
              <div>
                You do not have access to this page.
              </div>
            )
          }
        </form>
        {this.props.token
          ? (
            <div>
              <Link to='/account/settings'>Back to Settings</Link>
            </div>
          )
          : (
            <div>
              <Link to='/'>Back to Homepage</Link>
            </div>
          )
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    confirmCredentialsStatus: state.confirmCredentialsStatus, 
    passwordChangeStatus: state.passwordChangeStatus, 
    token: state.token,
    userInfo: state.userInfo
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changePassword: changePassword, 
    confirmCredentials: confirmCredentials
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChange);