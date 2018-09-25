import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, Switch, Route } from 'react-router-dom';

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

  componentDidUpdate(prevProps) {
    if (this.props.moviesChecklistAll !== prevProps.moviesChecklistAll || this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({
        moviesChecklistAll: this.props.moviesChecklistAll.slice(),
        letter: this.checkLetterParam()
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
    const pathnameArray = this.props.location.pathname.split('/');
    const pageIndicator = pathnameArray[pathnameArray.length - 2];
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
        <li 
          key={`letter-${i + 1}`} 
          className={`checklist-page-item page-item ${this.state.letter === letter.toLowerCase() && 'bg-warning'}`} 
          onClick={() => this.handleLetterChange(letter.toLowerCase())}
        >
          <Link 
            className={`checklist-page-link page-link border-dark rounded-0 text-link ${this.state.letter === letter.toLowerCase() ? 'checklist-active-page' : 'bg-black text-white'}`} 
            to={`/checklist${letter === 'All' ? '' : '/' + letter.toLowerCase()}/1`}
          >
            {letter === 'no' ? '#' : letter}
          </Link>
        </li>
      );
    });
    return (
      <nav className="my-3 text-center">
        <div className="d-inline-block">
          <ul className="pagination pagination-sm justify-content-center text-center m-0">
            {alphabeticPaginationList.slice(0, 14)}
          </ul>
        </div>
        <div className="d-inline-block">
          <ul className="pagination pagination-sm justify-content-center text-center m-0">
            {alphabeticPaginationList.slice(14, 27)}
          </ul>
        </div>
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
      this.props.updateCompletedMovies(this.props.userInfo.uid, this.props.token, [movieId], method);
    } else {
      this.props.toggleSignup();
      this.props.closeLogin();
      this.props.closePasswordResetRequest();
    }
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
        <div key={`movie-${movie.id}`}>
          <li className="media my-2">
            <img 
              className={`movie-poster btn img-responsive mr-3 ${this.props.token && this.props.userInfo.completedMovies.includes(movie.id) && 'movie-poster-transparent'}`} 
              src={`/static/movie_posters/${movie.image_filename}`} 
              alt={`Movie poster for ${movie.title}`} 
              onClick={() => this.handleStatusChange(movie.id)}
            />
            <div className={`col-12 media-body ${this.props.token && this.props.userInfo.completedMovies.includes(movie.id) ? 'text-secondary': 'text-white-50'}`}>
              <h5 className={`movie-title col-12 col-sm-9 d-inline-block text-center text-sm-left mb-1 mt-0 pl-0 pr-1 ${this.props.token && this.props.userInfo.completedMovies.includes(movie.id) ? 'text-secondary': 'text-white'}`}>
                {movie.title} ({movie.release_year})
              </h5>
              <div className="col-12 col-sm-3 d-inline-block align-top text-center text-sm-right p-0">
                {this.props.token && this.props.userInfo.completedMovies.includes(movie.id) 
                  ? (
                    <button className="btn btn-sm checklist-btn checklist-undo-btn btn-outline-secondary font-weight-bold my-3 my-sm-0" type="button" onClick={() => this.handleStatusChange(movie.id)}>
                      Undo
                    </button>
                    )
                  : (
                    <button className="btn btn-sm checklist-btn btn-warning font-weight-bold my-3 my-sm-0" type="button" onClick={() => this.handleStatusChange(movie.id)}>
                      Complete
                    </button>
                  )
                }
              </div>
              <div className={`movie-info text-center my-2 ${this.props.token && this.props.userInfo.completedMovies.includes(movie.id) ? 'text-secondary': 'text-white-50'}`}>
                <div className="col-12 col-sm-9 d-inline-block text-sm-left p-0">{formattedGenreArray}</div>
                <div className="col-12 col-sm-3 d-inline-block align-top text-sm-right p-0">{movie.length}</div>
              </div>
              <div className={`movie-info movie-summary d-none d-sm-block ${this.props.token && this.props.userInfo.completedMovies.includes(movie.id) ? 'text-secondary': 'text-white'}`}>
                {movie.summary}&nbsp;
                <cite className={`d-inline-block font-weight-bold small ${this.props.token && this.props.userInfo.completedMovies.includes(movie.id) ? 'text-secondary': 'text-white-50'}`}>
                  (SOURCE: LETTERBOXD)
                </cite>
              </div>
              <div className="text-center text-sm-left mt-lg-3" >
                <a 
                  className={`movie-info ${this.props.token && this.props.userInfo.completedMovies.includes(movie.id) ? 'text-secondary': 'text-warning'}`} 
                  href={movie.imdb_url} 
                  target="_blank"
                >
                  More Info (IMDB)
                </a>
              </div>
            </div>
            <hr />
          </li>
          <hr />
        </div>
      )
    });
    return checklistHTML;
  }

  addPage(paginationList, i) {
    paginationList.push(
      <li key={`page-${i + 1}`} className="checklist-page-item page-item" onClick={() => this.handlePageChange(i)}>
        <Link 
          className={`checklist-page-link page-link border-dark text-link ${this.state.currentPage === i + 1 ? 'checklist-active-page' : 'bg-black text-white'}`} 
          to={`/checklist/${i + 1}`}
        >
          {i + 1}
        </Link>
      </li>
    )
  }

  createNumericPaginationList(currentPage, totalPages, listType, pageChangeHandler, link) {
    function addPage(paginationList, i) {
      if (listType === 'all') {
        paginationList.push(
          <li key={`page-${i + 1}`} className="checklist-page-item page-item" onClick={() => this.handlePageChange(i)}>
            <Link 
              className={`checklist-page-link page-link border-dark text-link ${this.state.currentPage === i + 1 ? 'checklist-active-page' : 'bg-black text-white'}`} 
              to={`/checklist/${i + 1}`}
            >
              {i + 1}
            </Link>
          </li>
        )
      }
      if (listType === 'letter') {
        paginationList.push(
          <li key={`page-${i + 1}`} className="checklist-page-item page-item" onClick={() => this.handlePageChange(i)}>
            <Link 
              className={`checklist-page-link page-link border-dark text-link ${this.state.currentPage === i + 1 ? 'checklist-active-page' : 'bg-black text-white'}`} 
              to={`/checklist/${this.state.letter.toLowerCase()}/${i + 1}`}
            >
              {i + 1}
            </Link>
          </li>
        )
      }
    }
    const bindedAddPage = addPage.bind(this)
    const numericPaginationList = [];
    if (totalPages <= 10) {
      for (let i = 0; i < totalPages; i += 1) {
          bindedAddPage(numericPaginationList, i);
      }
    } else if (currentPage >= 1 && currentPage <= 6) {
      for (let i = 0; i < 10; i += 1) {
          bindedAddPage(numericPaginationList, i);
      }
    } else if (currentPage + 4 > totalPages) {
      for (let i = totalPages - 9; i < totalPages; i += 1) {
          bindedAddPage(numericPaginationList, i);
      }
    } else if (currentPage >= 6) {
      for (let i = currentPage - 6; i < currentPage + 4; i += 1) {
          bindedAddPage(numericPaginationList, i);
      }
    }
    const prevLink = (
      <Link 
        className="checklist-page-link page-link bg-black border-dark text-link text-white" 
        to={`${link}/${currentPage > 1 ? currentPage - 1 : currentPage}`} 
      >
        <span>&laquo;</span>
      </Link>
    );
    const nextLink = (
      <Link 
        className="checklist-page-link page-link bg-black border-dark text-link text-white" 
        to={`${link}/${currentPage < totalPages ? currentPage + 1 : currentPage}`} 
      >
        <span>&raquo;</span>
      </Link>
    );
    return (
      <nav className="text-center my-4">
        <div className="d-inline-block">
          <ul className="pagination pagination-sm justify-content-center text-center m-0">
            <li className="checklist-page-item page-item" onClick={() => pageChangeHandler('prev')}>
              {prevLink}
            </li>
            {numericPaginationList.slice(0, 5)}
          </ul>
        </div>
        <div className="d-inline-block">
          <ul className="pagination pagination-sm justify-content-center text-center m-0">
            {numericPaginationList.slice(5, 10)}
            <li className="checklist-page-item page-item" onClick={() => pageChangeHandler('next')}>
              {nextLink}
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  render() {
    return (
      <div>
        <Menu />
        {this.createAlphabeticPaginationList()}
        <hr className="border-black" />
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