import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { changeEmail } from '../../../actions/authentication';

class EmailChange extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email1: '',
      email2: '',
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
      [event.target.id.replace('change-', '')]: event.target.value}
    );
  }

  validate(email1, email2) {
    if (email1 !== '' && email2 !== '') {
      if (email1.length <= 254) {
        if (email1 === email2) {
          if (email1 !== this.props.userInfo.email) {
            return {
              response: {
                status: 2,
              }
            };
          } else if (email1 === this.props.userInfo.email) {
            return {
              response: {
                status: 0, 
                message: 'This is your current email address.'
              }
            };
          }
        } else if (email1 !== email2) {
          return {
            response: {
              status: 0, 
              message: 'Emails did not match, please try again.'
            }
          };
        }
      } else if (email1.length > 254) {
        return {
          response: {
            status: 0, 
            message: 'Email must not exceed 254 characters.'
          }
        };
      }
    } else if (email1 === '' || email2 === '') {
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
    const validation_response = this.validate(this.state.email1, this.state.email2).response;
    if (validation_response.status === 2) {
      this.props.changeEmail(this.state.email1, this.props.userInfo['uid'], this.props.token);
    } else {
      this.setState({
        email2: '',
        response: validation_response
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.emailChangeStatus !== prevProps.emailChangeStatus) {
      if (this.props.emailChangeStatus.status === 200) {
        this.setState({
          email1: '',
          email2: '',
          response: {
            status: 1, 
            message: 'Email has been changed successfully!'
          }
        });
      } else if (this.props.emailChangeStatus.status === 400 && this.props.emailChangeStatus.data.hasOwnProperty('email')) {
        this.setState({
          email2: '',
          response: {
            status: 0, 
            message: this.props.emailChangeStatus.data.email[0]
          }
        });
      } else {
        this.setState({
          email2: '',
          response: {
            status: 0, 
            message: 'Sorry, we were unable to change your email address at this time.'
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
                Account Settings
              </h1>
              <h4 className="font-weight-light text-white-50 mb-1">
                Change Email
              </h4>
            </div>
            <hr className="border-black" />
            {(this.props.token && (this.props.userInfo.provider !== 'facebook')) && (this.state.response.status === 1
              ? (
                <div className="text-center">
                  <div className="my-2">
                    {this.state.response.message}
                  </div>
                  <div className="mb-5">
                    Please check your inbox to verify your new email address.
                  </div>
                </div>
              )
              : (
                <div>
                  <div className="form-group">
                    <label htmlFor="change-email1">New Email:</label>
                    <input 
                      id="change-email1" 
                      className="account-settings-input form-control border-black" 
                      type="email" 
                      value={this.state.email1} 
                      onChange={this.handleInputChange} 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="change-email2">Confirm New Email:</label>
                    <input 
                      id="change-email2" 
                      className="account-settings-input form-control border-black" 
                      type="email" 
                      value={this.state.email2} 
                      onChange={this.handleInputChange} 
                    />
                  </div>
                  <div className="text-danger small">
                    {this.state.response.message}
                  </div>
                  <button type="submit" className="btn btn-warning float-right">Confirm</button>
                </div>
              )
            )}
            {(!this.props.token || (this.props.userInfo.provider === 'facebook')) && 
              (
                <div className="text-center">
                  <div className="my-2">
                    You do not have access to this page.
                  </div>
                  <div className="mb-5">
                    Please login to continue.
                  </div>
                </div>
              )
            }
          </form>
        </div>
        <div className="row justify-content-center">
          <div className="col-11 center-block text-center">
            {this.props.token
              ? (
                <Link className="text-link text-warning" to='/account/settings'>Back to Settings</Link>
              )
              : (
                <Link className="text-link text-warning" to='/'>Back to Homepage</Link>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    emailChangeStatus: state.emailChangeStatus, 
    token: state.token,
    userInfo: state.userInfo
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeEmail: changeEmail
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailChange);