import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class PasswordReset extends Component {
  render() {
    return (
      <div className="row justify-content-center mt-3">
        <form className="col-11 center-block p-3" encType='multipart/form-data' onSubmit={this.handleSubmitForm}>
          <h1 className="mb-1">Password Reset</h1>
          <hr />
          <div className="form-group">
            <label htmlFor="username">New Password:</label>
            <input type="text" className="form-control" id="username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Confirm Password:</label>
            <input type="password" className="form-control" id="password" />
          </div>
          <button type="submit" className="btn btn-primary float-right">Reset</button>
        </form>
      </div>
    );
  }
}

export default connect(null, null)(PasswordReset);