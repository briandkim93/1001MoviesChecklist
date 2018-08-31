import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { toggleSignup, signup } from '../../actions';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password1: '',
      password2: '',
      response: {status: 0, position: 0, message: ''}
    };

    this.baseState = this.state;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleInputChange(event) {
    this.setState({[event.target.id.replace('signup-', '')]: event.target.value});
  }
  handleFormSubmit(event) {
    event.preventDefault();
    if (this.state.username !== '' || this.state.email !== '' || this.state.password1 !== '' || this.state.password2 !== '') {
      if (this.state.username.match(/^[\w._]+$/)) {
        if (this.state.username.length <= 30) {
          if (this.state.password1.length >= 8) {
            if (this.state.password1.length <= 128) {
              if (this.state.password1 === this.state.password2) {
                this.props.signup(this.state.username.toLowerCase(), this.state.email.toLowerCase(), this.state.password1);
              } else if (this.state.password1 !== this.state.password2) {
                this.setState({
                  password1: '',
                  password2: '',
                  response: {status: 0, position: 4, message: 'Passwords did not match, please try again.'}
                });
              }
            } else if (this.state.password1.length > 128) {
              this.setState({response: {status: 0, position: 3, message: 'Password must not exceed 128 characters.'}});
            }
          } else if (this.state.password1.length < 8) {
              this.setState({response: {status: 0, position: 3, message: 'Password must be at least 8 characters.'}});
          }
        } else if (this.state.username.length > 30) {
          this.setState({response: {status: 0, position: 1, message: 'Username must not exceed 30 characters.'}});
        }
      } else if (!this.state.username.match(/^[\w._]+$/)) {
        this.setState({response: {status: 0, position: 1, message: 'Username may only contain letters, numbers, periods, and underscores.'}});
      }
    } else if (this.state.username === '' || this.state.email === '' || this.state.password1 === '' || this.state.password2 === '') {
      this.setState({response: {status: 0, position: 4, message: 'Please do not leave any blank fields.'}});
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.token !== prevProps.token) {
      this.setState(this.baseState);
    }
    if (this.props.signupStatus !== prevProps.signupStatus) {
      this.setState({
        password1: '',
        password2: '',
        response: {status: 0, position: 0, message: ''}
      });
      if (this.props.signupStatus.status === 201) {
        this.setState({
          username: '',
          email: '',
          password1: '',
          password2: '',
          response: {status: 1, position: 5, message: 'Account created successfully! Please login to continue.'}
        });
      } else if (this.props.signupStatus.status === 400 && this.props.signupStatus.data.hasOwnProperty('username')) {
        this.setState({
          response: {status: 0, position: 1, message: this.props.signupStatus.data.username[0]}
        });
      } else if (this.props.signupStatus.status === 400 && this.props.signupStatus.data.hasOwnProperty('email')) {
        this.setState({
          response: {status: 0, position: 2, message: this.props.signupStatus.data.email[0]}
        });
      } else if (this.props.signupStatus.status === 400 && this.props.signupStatus.data.hasOwnProperty('password')) {
        this.setState({
          response: {status: 0, position: 3, message: this.props.signupStatus.data.password[0]}
        });
      }
    }
  }
  render() {
    if (this.props.displaySignup === true) {
      if (this.state.response.status === 0) {
        return (
          <div className="row justify-content-center">
            <form className="absolute-form col-11 col-sm-6 center-block position-absolute bg-light border p-3 mt-3" encType='multipart/form-data' onSubmit={this.handleFormSubmit}>
              <div>
                <button type="button" className="close" onClick={this.props.toggleSignup}>
                  <span>&times;</span>
                </button>
              </div>
              <h2 className="mb-1">Sign Up</h2>
              <hr />
              <div className="form-group">
                <label htmlFor="signup-username">Username:</label>
                <input type="text" className="form-control" id="signup-username" value={this.state.username} onChange={this.handleInputChange} />
              </div>
              <div className="text-danger small">
                {this.state.response.position === 1 && this.state.response.message}
              </div>
              <div className="form-group">
                <label htmlFor="signup-email">Email:</label>
                <input type="email" className="form-control" id="signup-email" value={this.state.email} onChange={this.handleInputChange} />
              </div>
              <div className="text-danger small">
                {this.state.response.position === 2 && this.state.response.message}
              </div>
              <div className="form-group">
                <label htmlFor="signup-password1">Password:</label>
                <input type="password" className="form-control" id="signup-password1" value={this.state.password1} onChange={this.handleInputChange} />
              </div>
              <div className="text-danger small">
                {this.state.response.position === 3 && this.state.response.message}
              </div>
              <div className="form-group">
                <label htmlFor="signup-password2">Confirm Password:</label>
                <input type="password" className="form-control" id="signup-password2" value={this.state.password2} onChange={this.handleInputChange} />
              </div>
              <div className="text-danger small">
                {this.state.response.position === 4 && this.state.response.message}
              </div>
              <button type="submit" className="btn btn-primary float-right">Sign Up</button>
            </form>
          </div>
        );     
      } else if (this.state.response.status === 1) {
        return (
          <div className="row justify-content-center">
            <form className="absolute-form col-11 col-sm-6 center-block position-absolute bg-light border p-3 mt-3" encType='multipart/form-data' onSubmit={this.handleFormSubmit}>
              <div>
                <button type="button" className="close" onClick={this.props.toggleSignup}>
                  <span>&times;</span>
                </button>
              </div>
              <h1 className="mb-1">Sign Up</h1>
              <hr />
              <div>
                {this.state.response.message}
              </div>
            </form>
          </div>
        );
      }
    } else {
      return <div></div>;
    }
  }
}

function mapPropsToState(state) {
  return {displaySignup: state.displaySignup, signupStatus: state.signupStatus, token: state.token};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({toggleSignup: toggleSignup, signup: signup}, dispatch);
}

export default connect(mapPropsToState, mapDispatchToProps)(Signup);