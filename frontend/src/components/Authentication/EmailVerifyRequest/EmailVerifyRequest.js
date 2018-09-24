import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { sendEmailVerifyLink } from '../../../actions/authentication';

class EmailVerifyRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: {
        status: 0, 
        message: ''
      }
    };
  }

  componentDidMount() {
    this.props.sendEmailVerifyLink(this.props.token);
  }

  componentDidUpdate(prevProps) {
    if (this.props.emailVerifyRequestStatus !== prevProps.emailVerifyRequestStatus) {
        if (this.props.emailVerifyRequestStatus.status === 200) {
          setTimeout(() => this.setState({
            response: {
              status: 1, 
              message: 'Email verification link has been sent successfully!'
            }
          }), 500);
        } else if (this.props.emailVerifyRequestStatus.status === 400 && this.props.emailVerifyRequestStatus.data.hasOwnProperty('email_verified')) {
          setTimeout(() => this.setState({
            response: {
              status: 2, 
              message: 'This email address has already been verified.'
            }
          }), 500);
        } else {
          setTimeout(() => this.setState({
            response: {
              status: 0, 
              message: 'Email verification link has failed to send.'
            }
          }), 500);
        }
    }
  }

  render() {
    return (
      <div className="row justify-content-center mt-3">
        <div className="col-11 center-block p-3">
          <div className="text-center">
            <h1 className="font-weight-light text-warning mb-1">Account Settings</h1>
            <h4 className="font-weight-light text-white-50 mb-1">Verification Link Request</h4>
          </div>
          <hr className="border-black" />
          {(this.props.token && (this.props.userInfo.provider !== 'facebook'))
            ? (
              <div className="text-white-50 text-center">
                <div className="justify-content-center d-flex my-2">
                  {this.state.response.message ? this.state.response.message : <div className="loader my-3" />}
                </div>
                {this.state.response.status === 1 && <div className="mb-5">Please check your inbox to continue.</div>}
                {this.state.response.status === 0 && this.state.response.message && <div className="mb-5">Please try again at a later time.</div>}
                <div className="text-center">
                  <Link className="text-link text-warning" to='/account/settings'>Back to Settings</Link>
                </div>
              </div>
            )
            : (
              <div className="text-white-50">
                <div className="text-center">
                  <div className="my-2">
                    You do not have access to this page.
                  </div>
                  <div className="mb-5">
                    Please login to continue.
                  </div>
                </div>
                <div className="text-center">
                  <Link className="text-link text-warning" to='/'>Back to Homepage</Link>
                </div>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    emailVerifyRequestStatus: state.emailVerifyRequestStatus, 
    token: state.token,
    userInfo: state.userInfo
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    sendEmailVerifyLink: sendEmailVerifyLink
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerifyRequest);