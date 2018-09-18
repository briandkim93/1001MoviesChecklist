import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { confirmCredentials, deactivateAccount, logout } from '../../../actions/authentication';

class AccountDeactivate extends Component {
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

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.id.replace('deactivate-', '')]: event.target.value
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.setState({
      password: ''
    });
    if (this.state.username !== '' && this.state.password !== '') {
      this.props.confirmCredentials(this.state.username, this.state.password, 'accountDeactivate');
    } else {
      this.setState({
        response: {
          status: 0, 
          message: 'Please do not leave any empty fields.'
        }
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.confirmCredentialsStatus && this.props.confirmCredentialsStatus !== prevProps.confirmCredentialsStatus) {
      if (this.props.confirmCredentialsStatus.data.context === 'accountDeactivate') {
        if (this.props.confirmCredentialsStatus.status === 200) {
          this.props.deactivateAccount(this.props.userInfo['uid'], this.props.token);
          this.props.logout(this.props.token);
          if (this.props.userInfo.provider === 'facebook' || this.props.userInfo.provider === 'facebook-local') {
            window.FB.logout(function(response) {
              return;
            });
          }
        } else {
          this.setState({
            response: {
              status: 0, 
              message: 'Invalid username or password. Please try again.'
            }
          });
        }
      }
    }
    if (this.props.accountDeactivateStatus !== prevProps.accountDeactivateStatus) {
        if (this.props.accountDeactivateStatus.status === 200) {
          this.setState({
            response: {
              status: 1, 
              message: 'Account successfully deactivated.'
            }
          });
        } else {
          this.setState({
            response: {
              status: 0, 
              message: 'We were unable to deactivate your account. Please try again at a later time.'
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
          {this.props.token && this.state.response.status === 0 &&
            (
              <div>          
                <div className="form-group">
                  <label htmlFor="deactivate-username">Username:</label>
                  <input type="text" className="form-control" id="deactivate-username" value={this.state.username} onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="deactivate-password">Password:</label>
                  <input type="password" className="form-control" id="deactivate-password" value={this.state.password} onChange={this.handleInputChange} />
                </div>
                <div className="text-danger small">
                  {this.state.response.status === 0 && this.state.response.message}
                </div>
                <button type="submit" className="btn btn-danger float-right">Deactivate Account</button>
              </div>
            )
          }
          {!this.props.token && (this.state.response.status === 1
            ? (
              <div>
                <div>
                  {this.state.response.message}
                </div>
                <div>
                  Log in at any time to reactivate your account.
                </div>
              </div>
            )
            : (
              <div>
                You must be logged in to view this page.
              </div>
            )
          )}
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
    accountDeactivateStatus: state.accountDeactivateStatus, 
    confirmCredentialsStatus: state.confirmCredentialsStatus, 
    token: state.token,
    userInfo: state.userInfo
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    confirmCredentials: confirmCredentials, 
    deactivateAccount: deactivateAccount,
    logout: logout
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountDeactivate);