import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, Switch, Route, Redirect } from 'react-router-dom';

import './Home.css';
import Menu from '../../containers/Menu/Menu';
import AlphabeticalList from '../../containers/AlphabeticalList/AlphabeticalList';
import AlphabeticalLetterList from '../../containers/AlphabeticalLetterList/AlphabeticalLetterList';
import { fetchMovies } from '../../actions/'

class Home extends Component {
  constructor(props) {
    super(props);
    this.props.fetchMovies();

    this.state = {
      moviesChecklist: this.props.moviesChecklist,
      letter: ''
    };
  }

  createAlphabeticPaginationList() {
    const letters = ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'Y', 'Z'];

    const alphabeticPaginationList = letters.map((letter, i) => {
      return (
        <li key={`letter-${i + 1}`} className={`page-item ${parseInt(this.state.currentPage, 10) === i + 1 && 'active'}`} onClick={() => this.handleLetterChange(letter)}>
          <Link className="page-link" to={`/alphabetical/${letter}/1`}>{letter}</Link>
        </li>
      )
    });

    return alphabeticPaginationList;
  }

  handleLetterChange(letter) {
    this.setState({letter: letter});
  }

  render() {
    return (
      <div>
        <Menu />
        <nav className="my-2">
          <ul className="pagination pagination-sm justify-content-center">
            {this.createAlphabeticPaginationList()}
          </ul>
        </nav>
        <Switch>
          <Redirect from='/alphabetical/list' to={{pathname: '/alphabetical/list/1', state: this.state}} exact />
          <Route exact path="/alphabetical/list/:number" render={(props) => <AlphabeticalList {...props} state={this.state} />} />
          <Route exact path="/alphabetical/:letter/:number" render={(props) => <AlphabeticalLetterList {...props} state={this.state} />} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    moviesChecklist: state.moviesChecklist
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchMovies: fetchMovies
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);