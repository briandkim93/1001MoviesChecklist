import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { closeReset, sendResetPasswordLink } from '../../actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      response: {status: 0, message: ''}
    }

    this.baseState = this.state;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleCloseForm = this.handleCloseForm.bind(this);
  }
  handleInputChange(event) {
    this.setState({email: event.target.value});
  }
  handleSubmitForm(event) {
    event.preventDefault();
    if (this.state.email !== '') {
      this.props.sendResetPasswordLink(this.state.email);
    } else {
      this.setState({response: {status: 0, message: 'Please enter an email address.'}});
    }
  }
  handleCloseForm() {
    this.props.closeReset();
    this.setState(this.baseState);
  }
  componentDidUpdate(prevProps) {
    if (this.props.passwordLinkStatus !== prevProps.passwordLinkStatus) {
      if (this.props.passwordLinkStatus.status === 200) {
        this.setState({response: {status: 1, message: 'Email sent successfully. Check your inbox for a password reset link.'}});
      } else {
        this.setState({response: {status: 0, message: 'Email address does not exist.'}});
      }
    }
  }
  render() {
    if (this.props.displayReset === true) {
      if (this.state.response.status === 0) {
        return (
          <div className="row justify-content-center">
            <form className="absolute-form col-11 col-sm-6 center-block position-absolute bg-light border p-3 mt-3" encType='multipart/form-data' onSubmit={this.handleSubmitForm}>
              <div>
                <button type="button" className="close" onClick={this.props.closeReset}>
                  <span>&times;</span>
                </button>
              </div>
              <h2 className="mb-1">Reset Password</h2>
              <hr />
              <div className="form-group">
                <label htmlFor="reset-email">Email:</label>
                <input type="email" className="form-control" id="reset-email" value={this.state.email} onChange={this.handleInputChange} />
              </div>
              <div className="text-danger small">
                {this.state.response.status === 0 && this.state.response.message}
              </div>
              <button type="submit" className="btn btn-primary float-right">Send</button>
            </form>
          </div>
        );
      } else if (this.state.response.status === 1) {
        return (
          <div className="row justify-content-center">
            <form className="absolute-form col-11 col-sm-6 center-block position-absolute bg-light border p-3 mt-3" encType='multipart/form-data' onSubmit={this.handleSubmitForm}>
              <div>
                <button type="button" className="close" onClick={this.handleCloseForm}>
                  <span>&times;</span>
                </button>
              </div>
              <h2 className="mb-1">Reset Password</h2>
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
  return {displayReset: state.displayReset, passwordLinkStatus: state.passwordLinkStatus};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({closeReset: closeReset, sendResetPasswordLink: sendResetPasswordLink}, dispatch);
}

export default connect(mapPropsToState, mapDispatchToProps)(Login);