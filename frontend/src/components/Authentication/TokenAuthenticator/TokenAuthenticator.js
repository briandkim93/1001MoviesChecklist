import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { clearState, refreshToken } from '../../../actions/authentication';

class TokenAuthenticator extends Component {
  componentDidMount() {
    if (this.props.token) {
      this.props.refreshToken(this.props.token);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.refreshTokenStatus !== prevProps.refreshTokenStatus) {
      if (this.props.refreshTokenStatus.status !== 200) {
        this.props.clearState();
      }
    }
  }

  render() {
    return <div></div>;
  }
}

function mapStateToProps(state) {
  return {
    token: state.token,
    refreshTokenStatus: state.refreshTokenStatus
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    clearState: clearState,
    refreshToken: refreshToken
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenAuthenticator);