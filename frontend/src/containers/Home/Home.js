import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './Home.css';
import { fetchMovies } from '../../actions/'

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checklist: [],
      currentPage: 1,
      totalPages: 0,
      sortBy: 'alphabetical',
      filter: [],
      view: 'line'
    };

    this.createChecklistAlphaAll = this.createChecklistAlphaAll.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageHighlight = this.handlePageHighlight.bind(this);
  }

  componentDidMount() {
    this.props.fetchMovies();
    this.setState({
      checklist: this.createChecklistAlphaAll(this.props.moviesChecklist)
    });
  }

  createChecklistAlphaAll(movies) {
    const checklist = movies.map(movie => {

      const genres = eval(movie.genres).map((genre, index) => {
        if (index !== eval(movie.genres).length - 1) {
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
            <div>{movie.summary}</div>
            <div><a href={movie.imdb_url} target="_blank">More Info</a></div>
          </div>
        </li>
      )
    });
    this.setState({
      totalPages: Math.ceil(checklist.length / 35)
    });
    return checklist
  }

  createPaginationList(currentPage, totalPages) {
    const paginationList = [];
    if (totalPages <= 10) {
      for (let i = 0; i < totalPages; i += 1) {
        paginationList.push(
          <li key={`page-${i + 1}`} className={`page-item ${this.handlePageHighlight(i + 1)}`} onClick={() => this.handlePageChange(i)}>
            <a className="page-link">{i + 1}</a>
          </li>
        )
      }
    } else if (1 <= currentPage && currentPage <= 6) {
      for (let i = 0; i < 10; i += 1) {
        paginationList.push(
          <li key={`page-${i + 1}`} className={`page-item ${this.handlePageHighlight(i + 1)}`} onClick={() => this.handlePageChange(i)}>
            <a className="page-link">{i + 1}</a>
          </li>
        )
      }
    } else if (currentPage + 4 > totalPages) {
      for (let i = totalPages - 9; i < totalPages; i += 1) {
        paginationList.push(
          <li key={`page-${i + 1}`} className={`page-item ${this.handlePageHighlight(i + 1)}`} onClick={() => this.handlePageChange(i)}>
            <a className="page-link">{i + 1}</a>
          </li>
        )
      }
    } else if (currentPage >= 6) {
      for (let i = currentPage - 6; i < currentPage + 4; i += 1) {
        paginationList.push(
          <li key={`page-${i + 1}`} className={`page-item ${this.handlePageHighlight(i + 1)}`} onClick={() => this.handlePageChange(i)}>
            <a className="page-link">{i + 1}</a>
          </li>
        )
      }
    }
    return paginationList;
  }

  handlePageChange(i) {
    if (this.state.currentPage !== 1 && i === 'prev') {
      this.setState({currentPage: this.state.currentPage - 1});
    } else if (this.state.currentPage != this.state.totalPages && i === 'next') {
      this.setState({currentPage: this.state.currentPage + 1});
    } else if (typeof(i) === 'number') {
      this.setState({currentPage: i + 1});
    }
  }

  handlePageHighlight(i) {
    if (this.state.currentPage === i) {
      return 'active';
    } else {
      return '';
    }
  }

  render() {
    return (
      <div>
        <div className="row justify-content-center">
          <ul className="col-10 list-unstyled">
            {this.state.checklist && this.state.checklist.slice(this.state.currentPage * 35 - 35, this.state.currentPage * 35)}
          </ul>
        </div>
        <nav className="my-2" aria-label="Search result list navigation.">
          <ul className="pagination pagination-sm justify-content-center">
            <li className="page-item" onClick={() => this.handlePageChange('prev')}>
              <a className="page-link">
                <span>&laquo;</span>
              </a>
            </li>
            {this.createPaginationList(this.state.currentPage, this.state.totalPages)}
            <li className="page-item" onClick={() => this.handlePageChange('next')}>
              <a className="page-link">
                <span>&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
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