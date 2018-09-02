import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { confirmResetPassword } from '../../actions'

class PasswordReset extends Component {
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
    this.setState({[event.target.id.replace('reset-', '')]: event.target.value});
  }
  handleFormSubmit(event) {
    event.preventDefault();
    if (this.state.password1 !== '' || this.state.password2 !== '') {
      if (this.state.password1.length >= 8) {
        if (this.state.password1.length <= 128) {
          if (this.state.password1 === this.state.password2) {
            this.props.confirmResetPassword(this.state.password1, this.state.password2, this.props.match.params.uid, this.props.match.params.token);
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
    } else if (this.state.username === '' || this.state.email === '' || this.state.password1 === '' || this.state.password2 === '') {
      this.setState({response: {status: 0, message: 'Please do not leave any blank fields.'}});
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.passwordResetStatus !== prevProps.passwordResetStatus) {
      console.log(this.props.passwordResetStatus.status);
      this.setState({
        password1: '',
        password2: '',
        response: {status: 0, message: ''}
      });
      if (this.props.passwordResetStatus.status === 200) {
        this.setState({
          password1: '',
          password2: '',
          response: {status: 1, message: 'Password reset successfully! Please login to continue.'}
        });
        setTimeout(() => window.location = '/', 4000);
      } else if (this.props.passwordResetStatus.status === 400 && this.props.passwordResetStatus.data.hasOwnProperty('new_password1')) {
          this.setState({
            response: {status: 0, message: this.props.passwordResetStatus.data.new_password1[0]}
          });
      } else if (this.props.passwordResetStatus.status === 400 && this.props.passwordResetStatus.data.hasOwnProperty('new_password2')) {
          this.setState({
            response: {status: 0, message: this.props.passwordResetStatus.data.new_password2[0]}
          });
      } else if (this.props.passwordResetStatus.status === 400 && this.props.passwordResetStatus.data.hasOwnProperty('uid')) {
          this.setState({
            response: {status: 0, message: 'This link has expired.'}
          });
      } else if (this.props.passwordResetStatus.status === 400 && this.props.passwordResetStatus.data.hasOwnProperty('token')) {
          this.setState({
            response: {status: 0, message: 'This link has expired.'}
          });
      }
    }
  }
  render() {
    if (this.state.response.status === 0) {
      return (
        <div className="row justify-content-center mt-3">
          <form className="col-11 center-block p-3" encType='multipart/form-data' onSubmit={this.handleFormSubmit}>
            <h1 className="mb-1">Password Reset</h1>
            <hr />
            <div className="form-group">
              <label htmlFor="reset-password1">Password:</label>
              <input type="password" className="form-control" id="reset-password1" value={this.state.password1} onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="reset-password2">Confirm Password:</label>
              <input type="password" className="form-control" id="reset-password2" value={this.state.password2} onChange={this.handleInputChange} />
            </div>
            <div className="text-danger small">
              {this.state.response.status === 0 && this.state.response.message}
            </div>
            <button type="submit" className="btn btn-primary float-right">Confirm</button>
          </form>
        </div>
      );
    } else if (this.state.response.status === 1) {
      return (
        <div className="row justify-content-center mt-3">
          <form className="col-11 center-block p-3" encType='multipart/form-data' onSubmit={this.handleFormSubmit}>
            <h1 className="mb-1">Password Reset</h1>
            <hr />
            <div>
              {this.state.response.message}
            </div>
            <div>
              <span>If you are not automatically redirected in 5 seconds, click <Link to='/'>here</Link> </span>
            </div>
          </form>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {passwordResetStatus: state.passwordResetStatus}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({confirmResetPassword: confirmResetPassword}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);