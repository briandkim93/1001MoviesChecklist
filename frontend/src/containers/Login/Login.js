import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { toggleLogin } from '../../actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }
  render() {
    if (this.props.displayLogin === true) {
      return (
        <div className="row justify-content-center mt-5">
          <form className="col-11 col-sm-6 center-block position-absolute border p-3">
            <div>
              <button type="button" className="close" onClick={this.props.toggleLogin}>
                <span>&times;</span>
              </button>
            </div>
            <div className="mb-1">Log In</div>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input type="text" className="form-control" id="username" value={this.state.username} onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" className="form-control" id="password" value={this.state.password} onChange={this.handleInputChange} />
            </div>
            <button type="submit" className="btn btn-primary float-right">Login</button>
          </form>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

function mapPropsToState(state) {
  return {displayLogin: state.displayLogin};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({toggleLogin: toggleLogin}, dispatch);
}

export default connect(mapPropsToState, mapDispatchToProps)(Login);