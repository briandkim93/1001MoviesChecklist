import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { confirmVerifyEmail } from '../../actions'

class EmailVerify extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: {status: 0, message: ''}
    }
  }
  componentDidMount() {
    this.props.confirmVerifyEmail(this.props.match.params.token);
  }
  componentDidUpdate(prevProps) {
    if (this.props.emailVerificationStatus !== prevProps.emailVerificationStatus) {
      if (this.props.emailVerificationStatus.status === 200) {
        this.setState({response: {status: 1, message: 'Your email address has been successfully verified.'}});
        setTimeout(() => window.location = '/', 3000);
      } else if (this.props.emailVerificationStatus.status === 400 || this.props.emailVerificationStatus.status === 404) {
        this.setState({response: {status: 0, message: 'This link has expired.'}});
        setTimeout(() => window.location = '/', 3000);
      }
    }
  }
  render() {
    if (this.state.response.status === 0 && this.state.response.message === '') {
      return (
        <div className="row justify-content-center mt-3">
          <div className="col-11 center-block p-3">
            <h1 className="mb-1">Email Verification</h1>
            <hr />
            <div>
              Please wait...
            </div>
          </div>
        </div>
      );
    } else if (this.state.response.status === 0 && this.state.response.message !== '') { 
      return (
        <div className="row justify-content-center mt-3">
          <div className="col-11 center-block p-3">
            <h1 className="mb-1">Email Verification</h1>
            <hr />
            <div>
              {this.state.response.message}
            </div>
            <div>
              <span>If you are not automatically redirected in 5 seconds, click <a href='/'>here</a></span>
            </div>
          </div>
        </div>
      );
    } else if (this.state.response.status === 1) {
      return (
        <div className="row justify-content-center mt-3">
          <div className="col-11 center-block p-3">
            <h1 className="mb-1">Email Verification</h1>
            <hr />
            <div>
              {this.state.response.message}
            </div>
            <div>
              <span>If you are not automatically redirected in 5 seconds, click <a href='/'>here</a></span>
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {emailVerificationStatus: state.emailVerificationStatus}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({confirmVerifyEmail: confirmVerifyEmail}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerify);