import React, { Component } from 'react';

import Header from '../../containers/Header/Header';
import Signup from '../../containers/Signup/Signup';
import Login from '../../containers/Login/Login';
import Main from '../Main/Main';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Header />
        <div className="absolute-form-container">
          <Signup />
          <Login />
        </div>
        <Main />
      </div>
    );
  }
}

export default App;
