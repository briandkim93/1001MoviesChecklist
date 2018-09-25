import React, { Component } from 'react';
import { connect } from 'react-redux';

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
      moviesChecklistHTML: this.props.createChecklistHTML(moviesChecklistArray),
      displayLoader: true
    };

    this.createNumericPaginationList = this.props.createNumericPaginationList.bind(this);
    this.handlePageChange = this.props.handlePageChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.state !== prevProps.state || this.props.filterBy !== prevProps.filterBy) {
      const moviesChecklistArray = this.filterMoviesChecklist(
        this.props.state.moviesChecklistAll, 
        {letter: this.props.state.letter}
      );
      this.setState({
        letter: this.props.state.letter.toLowerCase(),
        currentPage: parseInt(this.props.match.params.number, 10),
        totalPages: Math.ceil(moviesChecklistArray.length / 15),
        moviesChecklistHTML: this.props.createChecklistHTML(moviesChecklistArray),
        displayLoader: false
      });
    }
    if (this.state !== prevState) {
      if (this.state.currentPage < 1 || this.state.currentPage > this.state.totalPages || !this.state.currentPage) {
        this.setState({
          currentPage: 1
        });
        this.props.history.push(`/checklist/${this.state.letter}/1`)
      }
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

  render() {
    return (
      (this.state.moviesChecklistHTML.length >= 1
        ? (
          <div>
              {
                this.state.totalPages > 1 &&
                this.createNumericPaginationList(
                  this.state.currentPage, 
                  this.state.totalPages, 
                  'letter',
                  this.handlePageChange, 
                  `/checklist/${this.state.letter.toLowerCase()}`
                ) 
              }
            <div className="row justify-content-center">
              <ul className="col-11 list-unstyled">
                {this.state.moviesChecklistHTML.slice(this.state.currentPage * 15 - 15, this.state.currentPage * 15)}
              </ul>
            </div>
            {
              this.state.totalPages > 1 &&
              this.createNumericPaginationList(
                this.state.currentPage, 
                this.state.totalPages, 
                'letter',
                this.handlePageChange, 
                `/checklist/${this.state.letter.toLowerCase()}`
              )
            }
          </div>
        )
        : (
          <div className="row justify-content-center">
            <div className="col-11 text-center">
              {this.state.displayLoader && !Object.keys(this.props.filterBy).length 
                ? (
                  <div className="justify-content-center d-flex my-5">
                    <div className="loader loader-lg" />
                  </div>
                  )
                : (
                  <div className="text-white-50">
                    <div className="mb-2">
                      No Results Found
                    </div>
                    <div>
                      Please Try Using A Different Filter Group
                    </div>
                  </div>
                  )
              }
            </div>
          </div>
        )
      )
    );
  }
}

function mapStateToProps(state) {
  return {
    filterBy: state.filterBy,
    token: state.token,
    userInfo: state.userInfo
  };
}

export default connect(mapStateToProps)(LetterChecklist);