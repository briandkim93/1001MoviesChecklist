import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, Switch, Route, Redirect } from 'react-router-dom';

import './Checklist.css';
import Menu from '../Menu/Menu';
import AlphabeticalList from '../AlphabeticalList/AlphabeticalList';
import AlphabeticalLetterList from '../AlphabeticalLetterList/AlphabeticalLetterList';
import { fetchMovies } from '../../actions/'

class Checklist extends Component {
  constructor(props) {
    super(props);
    this.props.fetchMovies();
    this.state = {
      moviesChecklistAll: this.props.moviesChecklistAll,
      letter: this.checkLetterParam()
    };
  }

  componentDidMount() {
    this.setState({
      letter: this.checkLetterParam()
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.moviesChecklistAll !== prevProps.moviesChecklistAll) {
      this.setState({
        moviesChecklistAll: this.props.moviesChecklistAll,
      });
    }
  }

  checkLetterParam() {
    const hrefArray = window.location.href.split('/');
    const pageIndicator = hrefArray[hrefArray.length - 2];
    if (pageIndicator === 'list') {
      return 'all';
    } else {
      return pageIndicator.toLowerCase();
    }
  }

  handleLetterChange(letter) {
    this.setState({letter: letter.toLowerCase()});
  }

  createAlphabeticPaginationList() {
    const letters = ['All', 'no', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'Y', 'Z'];
    const alphabeticPaginationList = letters.map((letter, i) => {
      return (
        <li key={`letter-${i + 1}`} className={`page-item ${this.state.letter === letter.toLowerCase() && 'active'}`} onClick={() => this.handleLetterChange(letter.toLowerCase())}>
          <Link className="page-link" to={`/alphabetical/${letter === 'All' ? 'list' : letter.toLowerCase()}/1`}>{letter === 'no' ? '#' : letter}</Link>
        </li>
      );
    });
    return (
      <nav className="my-2">
        <ul className="pagination pagination-sm justify-content-center">
          {alphabeticPaginationList}
        </ul>
      </nav>
    )
  }

  handlePageChange(i) {
    if (this.state.currentPage !== 1 && i === 'prev') {
      this.setState({currentPage: this.state.currentPage - 1});
    } else if (this.state.currentPage !== this.state.totalPages && i === 'next') {
      this.setState({currentPage: this.state.currentPage + 1});
    } else if (typeof(i) === 'number') {
      this.setState({currentPage: i + 1});
    }
  }

  createChecklistHTML(moviesChecklist) {
    const checklistHTML = moviesChecklist.map(movie => {
      const genreArray = movie.genres.substr(0, movie.genres.length - 1).substr(1).split(',');
      const genres = genreArray.map((genre, index) => {
        genre = genre.replace(/'/g, '')
        if (index !== genreArray.length - 1) {
          return genre + ', ';
        } else {
          return genre;
        }
      });
      return (
        <li className="media" key={`movie-${movie.id}`}>
          <img className="movie-poster img-responsive mr-3" src={`/images/movie_posters/${movie.image_filename}`} alt={`Movie poster for ${movie.title}`} />
          <div className="media-body">
            <h5 className="mt-0 mb-1">{movie.title} ({movie.release_year})</h5>
            <div>{genres}</div>
            <div>{movie.length}</div>
            <div>{movie.summary} <cite>(☞ LETTERBOXD)</cite></div>
            <div><a href={movie.imdb_url} target="_blank">More Info</a></div>
          </div>
        </li>
      )
    });
    return checklistHTML;
  }

  createNumericPaginationList(currentPage, totalPages, pageAdder, pageChangeHandler, opts) {
    const numericPaginationList = [];
    if (totalPages <= 10) {
      for (let i = 0; i < totalPages; i += 1) {
          pageAdder(numericPaginationList, i);
      }
    } else if (currentPage >= 1 && currentPage <= 6) {
      for (let i = 0; i < 10; i += 1) {
          pageAdder(numericPaginationList, i);
      }
    } else if (currentPage + 4 > totalPages) {
      for (let i = totalPages - 9; i < totalPages; i += 1) {
          pageAdder(numericPaginationList, i);
      }
    } else if (currentPage >= 6) {
      for (let i = currentPage - 6; i < currentPage + 4; i += 1) {
          pageAdder(numericPaginationList, i);
      }
    }
    const prevLink = (
      <Link 
        className="page-link" 
        to={`${opts.link}/${opts.currentPage > 1 ? opts.currentPage - 1 : opts.currentPage}`} 
      >
        <span>&laquo;</span>
      </Link>
    );
    const nextLink = (
      <Link 
        className="page-link" 
        to={`${opts.link}/${opts.currentPage < opts.totalPages ? opts.currentPage + 1 : opts.currentPage}`} 
      >
        <span>&raquo;</span>
      </Link>
    );
    return (
      <nav className="my-2">
        <ul className="pagination pagination-sm justify-content-center">
          <li className="page-item" onClick={() => pageChangeHandler('prev')}>
            {prevLink}
          </li>
          {numericPaginationList}
          <li className="page-item" onClick={() => pageChangeHandler('next')}>
            {nextLink}
          </li>
        </ul>
      </nav>
    );
  }

  render() {
    return (
      <div>
        <Menu />
        {this.createAlphabeticPaginationList()}
        <Switch>
          <Redirect 
            from='/alphabetical/' 
            to={{pathname: '/alphabetical/list/1', state: this.state}} 
            exact 
          />
          <Redirect 
            from='/alphabetical/list' 
            to={{pathname: '/alphabetical/list/1', state: this.state}} 
            exact 
          />
          <Route 
            exact path="/alphabetical/list/:number" 
            render={
              (props) => <AlphabeticalList {...props} 
                state={this.state} 
                createNumericPaginationList={this.createNumericPaginationList}
                handlePageChange={this.handlePageChange}
                createChecklistHTML={this.createChecklistHTML}
              />
            } 
          />
          <Route 
            exact path="/alphabetical/:letter/:number" 
            render={
              (props) => <AlphabeticalLetterList {...props} 
                state={this.state} 
                createNumericPaginationList={this.createNumericPaginationList}
                handlePageChange={this.handlePageChange}
                createChecklistHTML={this.createChecklistHTML}
              />
            } 
          />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    moviesChecklistAll: state.moviesChecklistAll
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchMovies: fetchMovies
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Checklist);