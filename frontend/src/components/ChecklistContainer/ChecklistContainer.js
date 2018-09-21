import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, Switch, Route, Redirect } from 'react-router-dom';

import './ChecklistContainer.css';
import Menu from '../Menu/Menu';
import Checklist from '../Checklist/Checklist';
import ChecklistLetter from '../ChecklistLetter/ChecklistLetter';
import { toggleSignup, closeLogin, closePasswordResetRequest } from '../../actions/authentication'
import { fetchMovies, updateCompletedMovies } from '../../actions/'

class ChecklistContainer extends Component {
  constructor(props) {
    super(props);
    this.props.fetchMovies();
    this.state = {
      moviesChecklistAll: this.props.moviesChecklistAll.slice(),
      letter: this.checkLetterParam()
    };

    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.createChecklistHTML = this.createChecklistHTML.bind(this);
  }

  componentDidMount() {
    this.setState({
      letter: this.checkLetterParam()
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.moviesChecklistAll !== prevProps.moviesChecklistAll) {
      this.setState({
        moviesChecklistAll: this.props.moviesChecklistAll.slice(),
      });
    }
    if (this.props.sortBy !== prevProps.sortBy || this.props.filterBy !== prevProps.filterBy) {
      let sortedMoviesChecklistArray = this.props.moviesChecklistAll.slice();
      if (this.props.sortBy === 'newest') {
        sortedMoviesChecklistArray.sort((a, b) => this.sortByYear(a, b, 'descending'));
      } else if (this.props.sortBy === 'oldest') {
        sortedMoviesChecklistArray.sort((a, b) => this.sortByYear(a, b, 'ascending'));
      }
      sortedMoviesChecklistArray = sortedMoviesChecklistArray.filter(movie => {
        const genreArray = JSON.parse("[" + movie.genres.replace(/'/g, '"') + "]")[0];
        return !this.props.filterBy.genre || genreArray.includes(this.props.filterBy.genre);
      });
      sortedMoviesChecklistArray = sortedMoviesChecklistArray.filter(movie => {
        return !this.props.filterBy.year || movie.release_year === this.props.filterBy.year;
      });
      this.setState({
        moviesChecklistAll: sortedMoviesChecklistArray,
      });
    }
  }

  checkLetterParam() {
    const hrefArray = window.location.href.split('/');
    const pageIndicator = hrefArray[hrefArray.length - 2];
    if (pageIndicator === 'checklist') {
      return 'all';
    } else {
      return pageIndicator.toLowerCase();
    }
  }

   sortByYear(a, b, direction) {
      if (parseInt(a.release_year, 10) > parseInt(b.release_year, 10)) {
        return direction === 'descending' ? -1 : 1;
      } else if (parseInt(a.release_year, 10) < parseInt(b.release_year, 10)) {
        return direction === 'descending' ? 1 : -1;
      }
      return a.id > b.id ? 1 : -1;
   }

  handleLetterChange(letter) {
    this.setState({letter: letter.toLowerCase()});
  }

  createAlphabeticPaginationList() {
    const letters = ['All', 'no', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'Y', 'Z'];
    const alphabeticPaginationList = letters.map((letter, i) => {
      return (
        <li key={`letter-${i + 1}`} className={`page-item ${this.state.letter === letter.toLowerCase() && 'active'}`} onClick={() => this.handleLetterChange(letter.toLowerCase())}>
          <Link className="page-link" to={`/checklist${letter === 'All' ? '' : '/' + letter.toLowerCase()}/1`}>{letter === 'no' ? '#' : letter}</Link>
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

  handleStatusChange(movieId) {
    let method;
    if (this.props.token) {
      this.props.userInfo.completedMovies.includes(movieId) ? method = 'delete' : method = 'add';
    } else {
      this.props.toggleSignup();
      this.props.closeLogin();
      this.props.closePasswordResetRequest();
    }
    this.props.updateCompletedMovies(this.props.userInfo.uid, this.props.token, [movieId], method);
  }

  createChecklistHTML(moviesChecklistArray, sortBy) {
    const checklistHTML = moviesChecklistArray.map(movie => {
      const genreArray = JSON.parse("[" + movie.genres.replace(/'/g, '"') + "]")[0];
      const formattedGenreArray = genreArray.map((genre, i) => {
        if (i !== genreArray.length - 1) {
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
            <div>
              <button type="button" className="btn btn-warning" onClick={() => this.handleStatusChange(movie.id)}>
                {this.props.token && this.props.userInfo.completedMovies.includes(movie.id) ? 'Undo' : 'Mark as Complete'}
              </button>
            </div>
            <div>{formattedGenreArray}</div>
            <div>{movie.length}</div>
            <div>{movie.summary} <cite>(☞ LETTERBOXD)</cite></div>
            <div><a href={movie.imdb_url} target="_blank">More Info</a></div>
          </div>
        </li>
      )
    });
    return checklistHTML;
  }

  createNumericPaginationList(currentPage, totalPages, pageAdder, pageChangeHandler, link) {
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
        to={`${link}/${currentPage > 1 ? currentPage - 1 : currentPage}`} 
      >
        <span>&laquo;</span>
      </Link>
    );
    const nextLink = (
      <Link 
        className="page-link" 
        to={`${link}/${currentPage < totalPages ? currentPage + 1 : currentPage}`} 
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
          <Route 
            exact path="/checklist/:number" 
            render={
              (props) => <Checklist {...props} 
                state={this.state}
                createNumericPaginationList={this.createNumericPaginationList}
                handlePageChange={this.handlePageChange}
                createChecklistHTML={this.createChecklistHTML}
              />
            } 
          />
          <Route 
            exact path="/checklist/:letter/:number" 
            render={
              (props) => <ChecklistLetter {...props} 
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
    moviesChecklistAll: state.moviesChecklistAll,
    filterBy: state.filterBy,
    sortBy: state.sortBy,
    token: state.token,
    userInfo: state.userInfo
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleSignup: toggleSignup,
    closeLogin: closeLogin,
    closePasswordResetRequest: closePasswordResetRequest,
    fetchMovies: fetchMovies,
    updateCompletedMovies: updateCompletedMovies
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChecklistContainer);