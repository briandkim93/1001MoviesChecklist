import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { changePassword } from '../../actions'

class PasswordChange extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password1: '',
      password2: '',
      response: {status: 0, message: ''}
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleInputChange(event) {
    this.setState({[event.target.id.replace('change-', '')]: event.target.value});
  }
  handleFormSubmit(event) {
    event.preventDefault();
    if (this.state.password1 !== '' || this.state.password2 !== '') {
      if (this.state.password1.length >= 8) {
        if (this.state.password1.length <= 128) {
          if (this.state.password1 === this.state.password2) {
            this.props.changePassword(this.props.userInfo['username'], this.props.userInfo['email'], this.state.password1, this.props.userInfo['uid'], this.props.token);
          } else if (this.state.password1 !== this.state.password2) {
            this.setState({
              password1: '',
              password2: '',
              response: {status: 0, message: 'Passwords did not match, please try again.'}
            });
          }
        } else if (this.state.password1.length > 128) {
          this.setState({
            password1: '',
            password2: '',
            response: {status: 0, message: 'Password must not exceed 128 characters.'}
          });
        }
      } else if (this.state.password1.length < 8) {
          this.setState({
            password1: '',
            password2: '',
            response: {status: 0, message: 'Password must be at least 8 characters.'}
          });
      }
    } else if (this.state.password1 === '' || this.state.password2 === '') {
      this.setState({response: {status: 0, message: 'Please do not leave any blank fields.'}});
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.passwordChangeStatus !== prevProps.passwordChangeStatus) {
      this.setState({
        password1: '',
        password2: '',
        response: {status: 0, message: ''}
      });
        if (this.props.passwordChangeStatus.status === 200) {
          this.setState({
            password1: '',
            password2: '',
            response: {status: 1, message: 'Password has been changed successfully!'}
          });
          setTimeout(() => window.location = '/account/settings', 3000);
        } else if (this.props.passwordChangeStatus.status === 400 && this.props.passwordChangeStatus.data.hasOwnProperty('password')) {
            this.setState({
              response: {status: 0, message: this.props.passwordChangeStatus.data.password[0]}
            });
        }
    }
  }
  render() {
    if (this.state.response.status === 0) {
      return (
        <div className="row justify-content-center mt-3">
          <form className="col-11 center-block p-3" encType='multipart/form-data' onSubmit={this.handleFormSubmit}>
            <h1 className="mb-1">Account Settings</h1>
            <hr />
            <div className="form-group">
              <label htmlFor="change-password1">New Password:</label>
              <input type="password" className="form-control" id="change-password1" value={this.state.password1} onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="change-password2">Confirm New Password:</label>
              <input type="password" className="form-control" id="change-password2" value={this.state.password2} onChange={this.handleInputChange} />
            </div>
            <div className="text-danger small">
              {this.state.response.status === 0 && this.state.response.message}
            </div>
            <button type="submit" className="btn btn-primary float-right">Confirm</button>
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
  }
}

function mapStateToProps(state) {
  return {passwordChangeStatus: state.passwordChangeStatus, userInfo: state.userInfo, token: state.token}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({changePassword: changePassword}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChange);