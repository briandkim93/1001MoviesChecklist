import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { sendEmailVerifyLink } from '../../actions';

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
              status: 0, 
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
          <h1 className="mb-1">Account Settings</h1>
          <hr />
          {(this.props.token && (this.props.userInfo.provider !== 'facebook'))
            ? (
              <div>
                <div>
                  {this.state.response.message ? this.state.response.message : <div className="loader"></div>}
                </div>
                <div className="text-center">
                  <Link to='/account/settings'>Back to Settings</Link>
                </div>
              </div>
            )
            : (
              <div>
                <div>
                  You do not have access to this page.
                </div>
                <div className="text-center">
                  <Link to='/'>Back to Homepage</Link>
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