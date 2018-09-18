import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
            message: 'Email sent successfully. Check your inbox for a password reset link.'
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
        <form className="absolute-form col-11 col-sm-6 center-block position-absolute bg-light border p-3 mt-3" encType='multipart/form-data' onSubmit={this.handleFormSubmit}>
          <div>
            <button type="button" className="close" onClick={this.props.closePasswordResetRequest}>
              <span>&times;</span>
            </button>
          </div>
          <h2 className="mb-1">Reset Password</h2>
          <hr />
          {this.state.response.status === 1
            ? (  
              <div>
                {this.state.response.message}
              </div>
            )
            : (
              <div>
                <div className="form-group">
                  <label htmlFor="reset-email">Email:</label>
                  <input type="email" className="form-control" id="reset-email" value={this.state.email} onChange={this.handleInputChange} />
                </div>
                <div className="text-danger small">
                  {this.state.response.message}
                </div>
                <button type="submit" className="btn btn-primary float-right">Send</button>
              </div>
            )
          }
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