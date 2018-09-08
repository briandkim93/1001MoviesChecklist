import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class AccountInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: {status: 0, message: ''}
    }
  }
  render() {
    if (this.props.token && this.props.userInfo) {
      return (
        <div className="row justify-content-center mt-3">
          <div className="col-11 center-block p-3">
            <h1 className="mb-1">Account Settings</h1>
            <hr />
            <div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Username: {this.props.userInfo.username}
                </li>
                <li className="list-group-item">
                  Password: &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                  <Link to='/account/settings/password' className='small float-right'>Change</Link>
                </li>
                <li className="list-group-item">
                  Email: {this.props.userInfo.email}
                  <Link to='/account/settings/email' className='small float-right'>Change</Link>
                </li>
                <li className="list-group-item">
                  Email Verified: {this.props.userInfo.emailVerified ? 'Yes' : 'No'}
                  <Link to='/account/settings/verify' className='small float-right'>Resend</Link>
                </li>
                <li className="list-group-item">
                  Date Joined: {this.props.userInfo.dateJoined}
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="row justify-content-center mt-3">
          <div className="col-11 center-block p-3">
            <h1 className="mb-1">Account Settings</h1>
            <hr />
            <div>
              You must be logged in to view this page.
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {token: state.token, userInfo: state.userInfo}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);