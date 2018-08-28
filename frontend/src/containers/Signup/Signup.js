import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { toggleSignup, signup } from '../../actions';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password1: '',
      password2: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleInputChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }
  handleFormSubmit(event) {
    event.preventDefault();
    this.props.signup(this.state.username, this.state.email, this.state.password1);
  }
  render() {
    if (this.props.displaySignup === true) {
      return (
        <div className="row justify-content-center mt-5">
          <form className="col-11 col-sm-6 center-block position-absolute border p-3" encType='multipart/form-data' onSubmit={this.handleFormSubmit}>
            <div>
              <button type="button" className="close" onClick={this.props.toggleSignup}>
                <span>&times;</span>
              </button>
            </div>
            <div className="mb-1">Sign Up</div>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input type="text" className="form-control" id="username" value={this.state.username} onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" className="form-control" id="email" value={this.state.email} onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password1">Password:</label>
              <input type="password" className="form-control" id="password1" value={this.state.password1} onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password2">Confirm Password:</label>
              <input type="password" className="form-control" id="password2" value={this.state.password2} onChange={this.handleInputChange} />
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
  return bindActionCreators({toggleSignup: toggleSignup, signup: signup}, dispatch);
}

export default connect(mapPropsToState, mapDispatchToProps)(Signup);