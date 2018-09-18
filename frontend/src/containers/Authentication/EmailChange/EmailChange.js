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
          return {
            response: {
              status: 2,
            }
          };
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
          response: {
            status: 0, 
            message: this.props.emailChangeStatus.data.email[0]
          }
        });
      } else {
        this.setState({
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
                  <label htmlFor="change-email1">New Email:</label>
                  <input type="email" className="form-control" id="change-email1" value={this.state.email1} onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="change-email2">Confirm New Email:</label>
                  <input type="email" className="form-control" id="change-email2" value={this.state.email2} onChange={this.handleInputChange} />
                </div>
                <div className="text-danger small">
                  {this.state.response.message}
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