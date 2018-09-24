import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './PasswordResetRequest.css';
import { closePasswordResetRequest, sendPasswordResetLink } from '../../../actions/authentication';

class PasswordResetRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      response: {
        status: 0, 
        message: ''
      }
    };
    this.baseState = this.state;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleCloseForm = this.handleCloseForm.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    if (this.state.email !== '') {
      this.props.sendPasswordResetLink(this.state.email);
    } else {
      this.setState({
        response: {
          status: 0, 
          message: 'Please enter an email address.'
        }
      });
    }
  }

  handleCloseForm() {
    this.props.closePasswordResetRequest();
    this.setState(this.baseState);
  }

  componentDidUpdate(prevProps) {
    if (this.props.displayPasswordResetRequest !== prevProps.displayPasswordResetRequest) {
      if (this.props.displayPasswordResetRequest === false) {
        this.setState(this.baseState);
      }
    }
    if (this.props.passwordResetRequestStatus !== prevProps.passwordResetRequestStatus) {
      if (this.props.passwordResetRequestStatus.status === 200) {
        this.setState({
          response: {
            status: 1, 
            message: 'Email sent successfully.'
          }
        });
      } else {
        this.setState({
          response: {
            status: 0, 
            message: 'Email address does not exist.'
          }
        });
      }
    }
  }
  render() {
    return (
      <div className={`row justify-content-center ${!this.props.displayPasswordResetRequest && "d-none"}`}>
        <form 
          className="popup-form password-reset-request-form col-11 col-sm-6 center-block position-absolute bg-light p-3 mt-3" 
          encType='multipart/form-data' 
          onSubmit={this.handleFormSubmit}
        >
          <div>
            <button className="close" type="button" onClick={this.props.closePasswordResetRequest}>
              <span>&times;</span>
            </button>
          </div>
          <h3 className="font-weight-light text-center mb-1">
            Reset Password
          </h3>
          <hr />
          <div className={`${this.state.response.status === 0 && "d-none"}`}>
            <div className="text-center">
              <h3 className="font-weight-light mb-2 mt-4">
                {this.state.response.message}
              </h3>
              <h6 className="font-weight-light mb-4">
                Please login to continue.
              </h6>
            </div>
          </div>
          <div className={`${this.state.response.status === 1 && "d-none"}`}>
            <div>
              <div className="form-group">
                <label htmlFor="reset-email">Email:</label>
                <input 
                  id="reset-email" 
                  className="form-control shadow-sm" 
                  type="email" 
                  value={this.state.email} 
                  onChange={this.handleInputChange} 
                />
              </div>
              <div className="text-danger small">
                {this.state.response.message}
              </div>
              <button type="submit" className="btn btn-warning float-right">
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function mapPropsToState(state) {
  return {
    displayPasswordResetRequest: state.displayPasswordResetRequest, 
    passwordResetRequestStatus: state.passwordResetRequestStatus
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    closePasswordResetRequest: closePasswordResetRequest, 
    sendPasswordResetLink: sendPasswordResetLink
  }, dispatch);
}

export default connect(mapPropsToState, mapDispatchToProps)(PasswordResetRequest);