import React, { Component } from 'react';

import Header from '../Header/Header';
import Signup from '../Authentication/Signup/Signup';
import Login from '../Authentication/Login/Login';
import FacebookLoginSDK from '../Authentication/FacebookLoginSDK/FacebookLoginSDK';
import PasswordResetRequest from '../Authentication/PasswordResetRequest/PasswordResetRequest';
import TokenAuthenticator from '../Authentication/TokenAuthenticator/TokenAuthenticator';
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
