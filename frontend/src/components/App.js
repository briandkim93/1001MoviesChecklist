import React, { Component } from 'react';

import Header from '../containers/Header/Header';
import Signup from '../containers/Signup/Signup';
import Login from '../containers/Login/Login';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Header />
        <Signup />
        <Login />
      </div>
    );
  }
}

export default App;
