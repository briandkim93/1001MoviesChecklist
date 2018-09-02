import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div></div>
  }
}

export default connect(null, null)(Home);