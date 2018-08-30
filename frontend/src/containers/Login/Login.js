import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { toggleLogin, login } from '../../actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      response: {status: 0, message: ''}
    }

    this.baseState = this.state;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }
  handleInputChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }
  handleSubmitForm(event) {
    event.preventDefault();
    if (this.state.username !== '' || this.state.password !== '') {
      this.props.login(this.state.username, this.state.password);
    } else {
      this.setState({response: {status: 0, message: 'Please do not leave any empty fields.'}});
    }
    this.setState({password: ''});
  }
  componentDidUpdate(prevProps) {
    if (this.props.token !== prevProps.token) {
      this.setState(this.baseState);
    }
    if (this.props.loginStatus !== prevProps.loginStatus) {
      if (this.props.loginStatus.status === 200) {
        this.props.toggleLogin();
      } else {
        this.setState({response: {status: 0, message: 'Invalid username or password. Please try again.'}});
      }
    }
  }
  render() {
    if (this.props.displayLogin === true) {
      return (
        <div className="row justify-content-center mt-5">
          <form className="col-11 col-sm-6 center-block position-absolute border p-3" encType='multipart/form-data' onSubmit={this.handleSubmitForm}>
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
            <div className="text-danger small">
              {this.state.response.status === 0 && this.state.response.message}
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
  return {displayLogin: state.displayLogin, loginStatus: state.loginStatus, token: state.token};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({toggleLogin: toggleLogin, login: login}, dispatch);
}

export default connect(mapPropsToState, mapDispatchToProps)(Login);