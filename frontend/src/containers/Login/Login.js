import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { toggleSignup, closeSignup, closeLogin, togglePasswordResetRequest, closeReset, login } from '../../actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      response: {status: 0, message: ''}
    }

    this.baseState = this.state;

    this.handleTogglePasswordResetRequest = this.handleTogglePasswordResetRequest.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }
  handleTogglePasswordResetRequest() {
    this.props.togglePasswordResetRequest();
    this.props.closeSignup();
    this.props.closeLogin();
  }
  handleInputChange(event) {
    this.setState({[event.target.id.replace('login-', '')]: event.target.value});
  }
  handleSubmitForm(event) {
    event.preventDefault();
    if (this.state.username !== '' || this.state.password !== '') {
      this.props.login(this.state.username, this.state.password);
    } else {
      this.setState({response: {status: 0, message: 'Please do not leave any empty fields.'}});
    }
    this.setState({password: ''});
  }
  componentDidUpdate(prevProps) {
    if (this.props.token !== prevProps.token) {
      this.setState(this.baseState);
    }
    if (this.props.loginStatus !== prevProps.loginStatus) {
      if (this.props.loginStatus.status === 200) {
        this.props.closeLogin();
      } else {
        this.setState({response: {status: 0, message: 'Invalid username or password. Please try again.'}});
      }
    }
    if (this.props.displayLogin !== prevProps.displayLogin) {
      if (this.props.displayLogin === false) {
        this.setState(this.baseState);
      }
    }
  }
  render() {
    if (this.props.displayLogin === true) {
      return (
        <div className="row justify-content-center">
          <form className="absolute-form col-11 col-sm-6 center-block position-absolute bg-light border p-3 mt-3" encType='multipart/form-data' onSubmit={this.handleSubmitForm}>
            <div>
              <button type="button" className="close" onClick={this.props.closeLogin}>
                <span>&times;</span>
              </button>
            </div>
            <h2 className="mb-1">Log In</h2>
            <hr />
            <div className="form-group">
              <label htmlFor="login-username">Username:</label>
              <input type="text" className="form-control" id="login-username" value={this.state.username} onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="login-password">Password:</label>
              <input type="password" className="form-control" id="login-password" value={this.state.password} onChange={this.handleInputChange} />
            </div>
            <div className="text-danger small">
              {this.state.response.status === 0 && this.state.response.message}
            </div>
            <div>
              <span className="text-primary btn btn-link btn-sm p-0" onClick={this.handleTogglePasswordResetRequest}>(Forgot Username or Password?)</span>
            </div>
            <button type="submit" className="btn btn-primary float-right">Login</button>
          </form>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

function mapPropsToState(state) {
  return {displayLogin: state.displayLogin, loginStatus: state.loginStatus, token: state.token};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({toggleSignup: toggleSignup, closeSignup: closeSignup, closeLogin: closeLogin, togglePasswordResetRequest: togglePasswordResetRequest, closeReset: closeReset, login: login}, dispatch);
}

export default connect(mapPropsToState, mapDispatchToProps)(Login);