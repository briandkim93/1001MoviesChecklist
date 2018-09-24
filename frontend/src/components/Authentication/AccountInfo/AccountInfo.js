import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './AccountInfo.css';

class AccountInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: {
        status: 0, 
        message: ''
      }
    };
  }
  
  render() {
    return (
      <div className="row justify-content-center font-weight-light text-white-50 mt-3">
        <div className="account-settings-form col-11 center-block p-3">
          <h1 className="font-weight-light text-center text-warning mb-1">
            Account Settings
          </h1>
          <hr className="border-black" />
          {this.props.token && this.props.userInfo.provider !== 'facebook'
            ? (
              <div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item bg-dark-grey">
                    <div className="account-info-field d-inline-block text-right">
                      Username:
                    </div>
                    <div className="d-inline-block text-center pl-5">
                      {this.props.userInfo.username}
                    </div>
                  </li>
                  <li className="list-group-item bg-dark-grey border-black">
                    <div className="account-info-field d-inline-block text-right">
                      Password:
                    </div>
                    <div className="d-inline-block text-center pl-5">
                      ••••••••
                    </div>
                    <Link to='/account/settings/password' className='float-right text-link text-violet small'>Change</Link>
                  </li>
                  <li className="list-group-item bg-dark-grey border-black">
                    <div className="account-info-field d-inline-block text-right">
                      Email:
                    </div>
                    <div className="d-inline-block text-center pl-5">
                      {this.props.userInfo.email}
                    </div>
                    <Link to='/account/settings/email' className='float-right text-link text-violet small'>Change</Link>
                  </li>
                  <li className="list-group-item bg-dark-grey border-black">
                    <div className="account-info-field d-inline-block text-right">
                      Email Verified:
                    </div>
                    <div className="d-inline-block text-center pl-5">
                      {this.props.userInfo.emailVerified ? 'Yes' : 'No'}
                    </div>
                    <Link to='/account/settings/verify' className='float-right text-link text-violet small'>Resend</Link>
                  </li>
                  <li className="list-group-item bg-dark-grey border-black">
                    <div className="account-info-field d-inline-block text-right">
                      Date Joined:
                    </div>
                    <div className="d-inline-block text-center pl-5">
                      {this.props.userInfo.dateJoined.slice(0, 10)}
                    </div>
                  </li>
                  <li className="list-group-item bg-dark-grey border-black text-center">
                    <Link className="text-link text-danger" to='/account/settings/deactivate'>Deactivate Account</Link>
                  </li>
                  <hr />
                </ul>
              </div>
            )
            : (
              <div className="text-center">
                <div className="my-2">
                  You do not have access to this page.
                </div>
                <div className="mb-5">
                  Please login to continue.
                </div>
              </div>
            )
          }
          <div className="text-center">
            <Link className="text-link text-warning" to='/'>Back to Homepage</Link>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.token, 
    userInfo: state.userInfo
  };
}

export default connect(mapStateToProps)(AccountInfo);