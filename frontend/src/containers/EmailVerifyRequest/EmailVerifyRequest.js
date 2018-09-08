import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { sendEmailVerifyLink } from '../../actions'

class EmailVerifyRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {response: {status: 0, message: 'Email verification link has failed to send.'}};
  }
  componentDidMount() {
    this.props.sendEmailVerifyLink(this.props.token);
  }
  componentDidUpdate(prevProps) {
    if (this.props.emailVerifyRequestStatus !== prevProps.emailVerifyRequestStatus) {
        if (this.props.emailVerifyRequestStatus.status === 200) {
          this.setState({
            response: {status: 1, message: 'Email verification link has been sent successfully!'}
          });
          setTimeout(() => window.location = '/account/settings', 3000);
        } else if (this.props.emailVerifyRequestStatus.status === 401 || this.props.emailVerifyRequestStatus.status === 405) {
            this.setState({
              response: {status: 0, message: this.props.emailVerifyRequestStatus.data.detail}
            });
        }
    }
  }
  render() {
    if (this.state.response.status === 0) {
      return (
        <div className="row justify-content-center mt-3">
          <div className="col-11 center-block p-3">
            <h1 className="mb-1">Account Settings</h1>
            <hr />
            <div>
              {this.state.response.status === 0 && this.state.response.message}
            </div>
          </div>
          <div>
            <Link to='/account/settings'>Back to Settings</Link>
          </div>
        </div>
      );
    } else if (this.state.response.status === 1) {
      return (
        <div className="row justify-content-center mt-3">
          <div className="col-11 center-block p-3">
            <h1 className="mb-1">Account Settings</h1>
            <hr />
            <div>
              {this.state.response.message}
            </div>
            <div>
              <span>If you are not automatically redirected in 5 seconds, click <a href='/account/settings'>here</a></span>
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {emailVerifyRequestStatus: state.emailVerifyRequestStatus, token: state.token}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({sendEmailVerifyLink: sendEmailVerifyLink}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerifyRequest);