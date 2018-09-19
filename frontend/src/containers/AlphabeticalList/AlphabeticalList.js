import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AlphabeticalList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: parseInt(this.props.match.params.number, 10),
      totalPages: Math.ceil(this.props.state.moviesChecklist.length / 35),
      checklistHTML: this.createChecklistHTML(this.props.state.moviesChecklist)
    };

    this.addPage = this.addPage.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.state.moviesChecklist !== prevProps.state.moviesChecklist) {
      this.setState({
        totalPages: Math.ceil(this.props.state.moviesChecklist.length / 35)
      });
      this.setState({
        checklistHTML: this.createChecklistHTML(this.props.state.moviesChecklist)
      });
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
            <div>{movie.summary}</div>
            <div><a href={movie.imdb_url} target="_blank">More Info</a></div>
          </div>
        </li>
      )
    });
    return checklistHTML;
  }

  addPage(paginationList, i) {
    paginationList.push(
      <li key={`page-${i + 1}`} className={`page-item ${parseInt(this.state.currentPage, 10) === i + 1 && 'active'}`} onClick={() => this.handlePageChange(i)}>
        <Link className="page-link" to={`/alphabetical/list/${i + 1}`}>{i + 1}</Link>
      </li>
    )
  }

  createNumericPaginationList(currentPage, totalPages) {
    const numericPaginationList = [];

    if (totalPages <= 10) {
      for (let i = 0; i < totalPages; i += 1) {
          this.addPage(numericPaginationList, i);
      }
    } else if (currentPage >= 1 && currentPage <= 6) {
      for (let i = 0; i < 10; i += 1) {
          this.addPage(numericPaginationList, i);
      }
    } else if (currentPage + 4 > totalPages) {
      for (let i = totalPages - 9; i < totalPages; i += 1) {
          this.addPage(numericPaginationList, i);
      }
    } else if (currentPage >= 6) {
      for (let i = currentPage - 6; i < currentPage + 4; i += 1) {
          this.addPage(numericPaginationList, i);
      }
    }
    return numericPaginationList;
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

  render() {
    return (
      this.state.currentPage >= 1 && this.state.currentPage <= this.state.totalPages
        ? (
          <div>
            <div className="row justify-content-center">
              <ul className="col-10 list-unstyled">
                {this.state.checklistHTML.slice(this.state.currentPage * 35 - 35, this.state.currentPage * 35)}
              </ul>
            </div>
            <nav className="my-2">
              <ul className="pagination pagination-sm justify-content-center">
                <li className="page-item" onClick={() => this.handlePageChange('prev')}>
                  <Link className="page-link" to={`/alphabetical/list/${this.state.currentPage > 1 ? this.state.currentPage - 1 : this.state.currentPage}`}>
                    <span>&laquo;</span>
                  </Link>
                </li>
                {this.createNumericPaginationList(this.state.currentPage, this.state.totalPages)}
                <li className="page-item" onClick={() => this.handlePageChange('next')}>
                  <Link className="page-link" to={`/alphabetical/list/${this.state.currentPage < this.state.totalPages ? this.state.currentPage + 1 : this.state.currentPage}`}>
                    <span>&raquo;</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )
        : (
          <div>Page not found</div>
        )
    );
  }
}

export default AlphabeticalList