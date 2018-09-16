import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { concludeFacebookLoginRender, facebookLogin, } from '../../actions';
import { SOCIAL_AUTH_FACEBOOK_KEY } from '../../confidential.js';

class Home extends Component {
  constructor(props) {
    super(props);

    this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
  }

  handleFacebookLogin() {
    window.FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        window.FB.api('/me', {fields: 'id, email'}, function(graphResponse) {
          if (graphResponse.id) {
            this.props.facebookLogin(response.authResponse.accessToken, graphResponse.id, graphResponse.email);
          }
        }.bind(this));
      }
    }.bind(this));
  }

  loadFacebookLoginSDK() {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId      : SOCIAL_AUTH_FACEBOOK_KEY,
        cookie     : true,
        xfbml      : true,
        version    : 'v3.1'
      });
      window.FB.AppEvents.logPageView();
      window.FB.Event.subscribe('xfbml.render', this.props.concludeFacebookLoginRender);
      window.FB.Event.subscribe('auth.statusChange', function(response) {
        if (response.authResponse) {
          this.handleFacebookLogin();
        }
      }.bind(this));
    }.bind(this);

    (function(d, s, id) {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s); 
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  componentDidMount() {
    this.loadFacebookLoginSDK();
  }

  render() {
    return <div></div>;
  }
}

function mapStateToProps(state) {
  return {
    facebookLoginStatus: state.facebookLoginStatus,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    concludeFacebookLoginRender: concludeFacebookLoginRender,
    facebookLogin: facebookLogin
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);