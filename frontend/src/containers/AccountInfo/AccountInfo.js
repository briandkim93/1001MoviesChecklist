import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
      <div className="row justify-content-center mt-3">
        <div className="col-11 center-block p-3">
          <h1 className="mb-1">Account Settings</h1>
          <hr />
          {this.props.token
            ? (
              <div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    Username: {this.props.userInfo.username}
                  </li>
                  <li className="list-group-item">
                    Password: ••••••••
                    <Link to='/account/settings/password' className='float-right small'>Change</Link>
                  </li>
                  <li className="list-group-item">
                    Email: {this.props.userInfo.email}
                    <Link to='/account/settings/email' className='float-right small'>Change</Link>
                  </li>
                  <li className="list-group-item">
                    Email Verified: {this.props.userInfo.emailVerified ? 'Yes' : 'No'}
                    <Link to='/account/settings/verify' className='float-right small'>Resend</Link>
                  </li>
                  <li className="list-group-item">
                    Date Joined: {this.props.userInfo.dateJoined}
                  </li>
                  <li className="list-group-item text-center">
                    <Link className="text-danger" to='/account/settings/delete'>Delete Account</Link>
                  </li>
                  <hr />
                </ul>
              </div>
            )
            : (
              <div>
                You must be logged in to view this page.
              </div>
            )
          }
        </div>
        <div>
          <Link to='/'>Back to Homepage</Link>
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