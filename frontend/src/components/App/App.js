import React, { Component } from 'react';

import Header from '../../containers/Header/Header';
import Signup from '../../containers/Signup/Signup';
import Login from '../../containers/Login/Login';
import FacebookLoginSDK from '../../containers/FacebookLoginSDK/FacebookLoginSDK';
import PasswordResetRequest from '../../containers/PasswordResetRequest/PasswordResetRequest';
import TokenAuthenticator from '../../containers/TokenAuthenticator/TokenAuthenticator';
import Main from '../Main/Main';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Header />
        <div className="absolute-form-container position-relative">
          <Signup />
          <Login />
          <FacebookLoginSDK />
          <PasswordResetRequest />
          <TokenAuthenticator />
        </div>
        <Main />
      </div>
    );
  }
}

export default App;
