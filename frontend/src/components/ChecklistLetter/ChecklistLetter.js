import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class LetterChecklist extends Component {
  constructor(props) {
    super(props);
    const moviesChecklistArray = this.filterMoviesChecklist(
      this.props.state.moviesChecklistAll, 
      {letter: this.props.match.params.letter}
    );
    this.state = {
      letter: this.props.match.params.letter.toLowerCase(),
      currentPage: parseInt(this.props.match.params.number, 10),
      totalPages: Math.ceil(moviesChecklistArray.length / 15),
      moviesChecklistHTML: this.props.createChecklistHTML(moviesChecklistArray)
    };

    this.addPage = this.addPage.bind(this);
    this.handlePageChange = this.props.handlePageChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.state !== prevProps.state || this.props.userInfo.completedMovies !== prevProps.userInfo.completedMovies) {
      const moviesChecklistArray = this.filterMoviesChecklist(
        this.props.state.moviesChecklistAll, 
        {letter: this.props.state.letter}
      );
      this.setState({
        letter: this.props.state.letter.toLowerCase(),
        currentPage: parseInt(this.props.match.params.number, 10),
        totalPages: Math.ceil(moviesChecklistArray.length / 15),
        moviesChecklistHTML: this.props.createChecklistHTML(moviesChecklistArray)
      });
    }
  }
  
  filterMoviesChecklist(checklist, opts) {
    opts.letter = opts.letter.toUpperCase();
    const moviesChecklistArray = checklist.filter(movie => {
      if (opts.letter === 'NO' && /^\d+$/.test(movie.title[0])) {
        return true;
      }
      if (movie.title[0] === 'À' && opts.letter === 'A') {
        return true;
      }
      return movie.title[0].toUpperCase() === opts.letter
    });
    return moviesChecklistArray;
  }

  addPage(paginationList, i) {
    paginationList.push(
      <li key={`page-${i + 1}`} className={`page-item ${this.state.currentPage === i + 1 && 'active'}`} onClick={() => this.handlePageChange(i)}>
        <Link className="page-link" to={`/alphabetical/${this.state.letter.toLowerCase()}/${i + 1}`}>{i + 1}</Link>
      </li>
    )
  }

  render() {
    return (
      (this.state.moviesChecklistHTML.length >= 1
        ? (
          <div>
              {
                this.state.totalPages > 1 &&
                this.props.createNumericPaginationList(
                  this.state.currentPage, 
                  this.state.totalPages, 
                  this.addPage, 
                  this.handlePageChange, 
                  `/alphabetical/${this.state.letter.toLowerCase()}`
                ) 
              }
            <div className="row justify-content-center">
              <ul className="col-10 list-unstyled">
                {this.state.moviesChecklistHTML.slice(this.state.currentPage * 15 - 15, this.state.currentPage * 15)}
              </ul>
            </div>
            {
              this.state.totalPages > 1 &&
              this.props.createNumericPaginationList(
                this.state.currentPage, 
                this.state.totalPages, 
                this.addPage, 
                this.handlePageChange, 
                `/alphabetical/${this.state.letter.toLowerCase()}`
              )
            }
          </div>
        )
        : (
          <div>No Results Found</div>
        )
      )
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.token,
    userInfo: state.userInfo
  };
}

export default connect(mapStateToProps)(LetterChecklist);