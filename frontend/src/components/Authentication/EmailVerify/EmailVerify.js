import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { confirmEmailVerify } from '../../../actions/authentication';

class EmailVerify extends Component {
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
      [event.target.id.replace('verify-', '')]: event.target.value
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.setState({
      password: ''
    });
    if (this.state.username !== '' && this.state.password !== '') {
      this.props.confirmEmailVerify(this.state.username, this.state.password, this.props.match.params.email_verification_code);
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
    if (this.props.emailVerifyStatus !== prevProps.emailVerifyStatus) {
      if (this.props.emailVerifyStatus.status === 200) {
        this.setState({
          response: {
            status: 1, 
            message: 'Your email address has been successfully verified.'
          }
        });
        setTimeout(() => window.location = '/checklist/1', 4000);
      } else if (this.props.emailVerifyStatus.status === 400 && this.props.emailVerifyStatus.data.hasOwnProperty('token')) {
        this.setState({
          response: {
            status: 0, 
            message: 'Invalid username or password. Please try again.'
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
      <div className="row justify-content-center mt-3">
        <form 
          className="account-settings-form col-11 center-block text-white-50 p-3" 
          encType='multipart/form-data' 
          onSubmit={this.handleFormSubmit}
        >
          <div className="text-center">
            <h1 className="font-weight-light text-warning mb-1">
              Verify Email
            </h1>
          </div>
          <hr />
          {this.state.response.status === 1
            ? (
              <div className="text-center">
                <div className="my-2">
                  {this.state.response.message}
                </div>
                <div className="mb-5">
                  If you are not logged in, please login to continue.
                </div>
              </div>
            )
            : (
              <div>
                <div className="form-group">
                  <label htmlFor="verify-username">Username:</label>
                  <input 
                    id="verify-username" 
                    className="account-settings-input form-control border-black" 
                    type="text" 
                    value={this.state.username} 
                    onChange={this.handleInputChange} 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="verify-password">Password:</label>
                  <input 
                    id="verify-password"  
                    className="account-settings-input form-control border-black" 
                    type="password"
                    value={this.state.password} 
                    onChange={this.handleInputChange} 
                  />
                </div>
                <div className="text-danger small">
                  {this.state.response.status === 0 && this.state.response.message}
                </div>
                <button className="btn btn-warning float-right" type="submit">
                  Verify Email
                </button>
              </div>
            )
          }
        </form>
        <div>
          <Link className="text-link text-warning" to='/'>Back to Homepage</Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    emailVerifyStatus: state.emailVerifyStatus
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    confirmEmailVerify: confirmEmailVerify
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerify);