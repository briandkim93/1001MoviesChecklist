import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { toggleSignup } from '../../actions';

class Signup extends Component {
  render() {
    if (this.props.displaySignup === true) {
      return (
        <div className="row justify-content-center mt-5">
          <form className="col-11 col-sm-6 center-block position-absolute border p-3">
            <div>
              <button type="button" className="close" onClick={this.props.toggleSignup}>
                <span>&times;</span>
              </button>
            </div>
            <div className="mb-1">Sign Up</div>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input type="text" className="form-control" id="username" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" className="form-control" id="email" />
            </div>
            <div className="form-group">
              <label htmlFor="password-1">Password:</label>
              <input type="password" className="form-control" id="password-1" />
            </div>
            <div className="form-group">
              <label htmlFor="password-2">Confirm Password:</label>
              <input type="password" className="form-control" id="password-2" />
            </div>
            <button type="submit" className="btn btn-primary float-right">Sign Up</button>
          </form>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

function mapPropsToState(state) {
  return {displaySignup: state.displaySignup};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({toggleSignup: toggleSignup}, dispatch);
}

export default connect(mapPropsToState, mapDispatchToProps)(Signup);