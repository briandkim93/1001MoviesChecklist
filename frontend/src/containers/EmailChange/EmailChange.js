import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { changeEmail } from '../../actions'

class EmailChange extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email1: '',
      email2: '',
      response: {status: 0, message: ''}
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleInputChange(event) {
    this.setState({[event.target.id.replace('change-', '')]: event.target.value});
  }
  handleFormSubmit(event) {
    event.preventDefault();
    if (this.state.email1 !== '' || this.state.email2 !== '') {
        if (this.state.email1.length <= 254) {
          if (this.state.email1 === this.state.email2) {
            this.props.changeEmail(this.state.email1, this.props.userInfo['uid'], this.props.token);
          } else if (this.state.email1 !== this.state.email2) {
            this.setState({
              email1: '',
              email2: '',
              response: {status: 0, message: 'Emails did not match, please try again.'}
            });
          }
        } else if (this.state.email1.length > 254) {
          this.setState({
            response: {status: 0, message: 'Email must not exceed 254 characters.'}
          });
        }
    } else if (this.state.email1 === '' || this.state.email2 === '') {
      this.setState({response: {status: 0, message: 'Please do not leave any blank fields.'}});
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.emailChangeStatus !== prevProps.emailChangeStatus) {
      this.setState({
        response: {status: 0, message: ''}
      });
        if (this.props.emailChangeStatus.status === 200) {
          this.setState({
            email1: '',
            email2: '',
            response: {status: 1, message: 'Email has been changed successfully!'}
          });
          setTimeout(() => window.location = '/account/settings', 3000);
        } else if (this.props.emailChangeStatus.status === 400 && this.props.emailChangeStatus.data.hasOwnProperty('email')) {
            this.setState({
              response: {status: 0, message: this.props.emailChangeStatus.data.email[0]}
            });
        }
    }
  }
  render() {
    if (this.state.response.status === 0) {
      return (
        <div className="row justify-content-center mt-3">
          <form className="col-11 center-block p-3" encType='multipart/form-data' onSubmit={this.handleFormSubmit}>
            <h1 className="mb-1">Account Settings</h1>
            <hr />
            <div className="form-group">
              <label htmlFor="change-email1">New Email:</label>
              <input type="email" className="form-control" id="change-email1" value={this.state.email1} onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="change-email2">Confirm New Email:</label>
              <input type="email" className="form-control" id="change-email2" value={this.state.email2} onChange={this.handleInputChange} />
            </div>
            <div className="text-danger small">
              {this.state.response.status === 0 && this.state.response.message}
            </div>
            <button type="submit" className="btn btn-primary float-right">Confirm</button>
          </form>
          <div>
            <Link to='/account/settings'>Back to Settings</Link>
          </div>
        </div>
      );
    } else if (this.state.response.status === 1) {
      return (
        <div className="row justify-content-center mt-3">
          <form className="col-11 center-block p-3" encType='multipart/form-data' onSubmit={this.handleFormSubmit}>
            <h1 className="mb-1">Account Settings</h1>
            <hr />
            <div>
              {this.state.response.message}
            </div>
            <div>
              <span>If you are not automatically redirected in 5 seconds, click <a href='/account/settings'>here</a></span>
            </div>
          </form>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {emailChangeStatus: state.emailChangeStatus, userInfo: state.userInfo, token: state.token}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({changeEmail: changeEmail}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailChange);