import React, { Component } from 'react';

import Header from '../../containers/Header/Header';
import Signup from '../../containers/Authentication/Signup/Signup';
import Login from '../../containers/Authentication/Login/Login';
import FacebookLoginSDK from '../../containers/Authentication/FacebookLoginSDK/FacebookLoginSDK';
import PasswordResetRequest from '../../containers/Authentication/PasswordResetRequest/PasswordResetRequest';
import TokenAuthenticator from '../../containers/Authentication/TokenAuthenticator/TokenAuthenticator';
import Menu from '../../containers/Menu/Menu';
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
        <Menu />
        <Main />
      </div>
    );
  }
}

export default App;
