import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { confirmCredentials, deleteAccount } from '../../actions'

class AccountDelete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      response: {status: 0, message: ''}
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleInputChange(event) {
    this.setState({[event.target.id.replace('delete-', '')]: event.target.value});
  }
  handleFormSubmit(event) {
    event.preventDefault();
    if (this.state.username !== '' && this.state.password !== '') {
      this.props.confirmCredentials(this.state.username, this.state.password, 'accountDelete');
    } else {
      this.setState({response: {status: 0, message: 'Please do not leave any empty fields.'}});
    }
    this.setState({password: ''});
  }
  componentDidUpdate(prevProps) {
    if (this.props.confirmCredentialsStatus && this.props.confirmCredentialsStatus !== prevProps.confirmCredentialsStatus) {
      if (this.props.confirmCredentialsStatus.data.context === 'accountDelete') {
        if (this.props.confirmCredentialsStatus.status === 200) {
          this.props.deleteAccount(this.props.userInfo['uid'], this.props.token);
        } else {
          this.setState({response: {status: 0, message: 'Invalid username or password. Please try again.'}});
        }
      }
    }
    if (this.props.accountDeleteStatus !== prevProps.accountDeleteStatus) {
        if (this.props.accountDeleteStatus.status === 204) {
          this.setState({response: {status: 1, message: 'Account deleted successfully.'}});
          setTimeout(() => window.location = '/', 3000);
        } else {
          this.setState({response: {status: 0, message: 'We were unable to delete your account at this time. Please try again at a later time.'}});
        }
    }
  }
  render() {
    if (this.props.token) {
      if (this.state.response.status === 0) {
        return (
          <div className="row justify-content-center mt-3">
            <form className="col-11 center-block p-3" encType='multipart/form-data' onSubmit={this.handleFormSubmit}>
              <h1 className="mb-1">Account Settings</h1>
              <hr />
              <div className="form-group">
                <label htmlFor="delete-username">Username:</label>
                <input type="text" className="form-control" id="delete-username" value={this.state.username} onChange={this.handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="delete-password">Password:</label>
                <input type="password" className="form-control" id="delete-password" value={this.state.password} onChange={this.handleInputChange} />
              </div>
              <div className="text-danger small">
                {this.state.response.status === 0 && this.state.response.message}
              </div>
              <button type="submit" className="btn btn-danger float-right">Delete Account</button>
            </form>
            <div>
              <Link to='/account/settings'>Back to Settings</Link>
            </div>
          </div>
        );
      } else if (this.state.response.status === 1) {
        return (
          <div className="row justify-content-center mt-3">
            <form className="col-11 center-block p-3" encType='multipart/form-data' onSubmit={this.handleFormSubmit}>
              <h1 className="mb-1">Account Settings</h1>
              <hr />
              <div>
                {this.state.response.message}
              </div>
              <div>
                <span>If you are not automatically redirected in 5 seconds, click <a href='/account/settings'>here</a></span>
              </div>
            </form>
          </div>
        );
      }
    } else {
      return (
        <div className="row justify-content-center mt-3">
          <div className="col-11 center-block p-3">
            <h1 className="mb-1">Account Settings</h1>
            <hr />
            <div>
              You must be logged in to view this page.
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {confirmCredentialsStatus: state.confirmCredentialsStatus, accountDeleteStatus: state.accountDeleteStatus, userInfo: state.userInfo, token: state.token}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({confirmCredentials: confirmCredentials, deleteAccount: deleteAccount}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountDelete);