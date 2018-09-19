import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AlphabeticalLetterList extends Component {
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
    if (this.props.state.moviesChecklistAll !== prevProps.state.moviesChecklistAll) {
      const moviesChecklistArray = this.filterMoviesChecklist(
        this.props.state.moviesChecklistAll, 
        {letter: this.props.state.letter}
      );
      this.setState({
        totalPages: Math.ceil(moviesChecklistArray.length / 15),
        moviesChecklistHTML: this.props.createChecklistHTML(moviesChecklistArray)
      });
    }
    if (this.props.state.letter !== prevProps.state.letter) {
      const moviesChecklistArray = this.filterMoviesChecklist(
        this.props.state.moviesChecklistAll, 
        {letter: this.props.state.letter}
      );
      this.setState({
        letter: this.props.state.letter.toLowerCase(),
        currentPage: this.props.match.params.number,
        totalPages: Math.ceil(moviesChecklistArray.length / 15),
        moviesChecklistHTML: this.props.createChecklistHTML(moviesChecklistArray)
      });
    }
  }
  
  filterMoviesChecklist(checklist, opts) {
    opts.letter = opts.letter.toUpperCase();
    const moviesChecklistArray = checklist.filter(movie => {
      if (opts.letter === 'no' && /^\d+$/.test(movie.title[0])) {
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
      <li key={`page-${i + 1}`} className={`page-item ${parseInt(this.state.currentPage, 10) === i + 1 && 'active'}`} onClick={() => this.handlePageChange(i)}>
        <Link className="page-link" to={`/alphabetical/${this.state.letter.toLowerCase()}/${i + 1}`}>{i + 1}</Link>
      </li>
    )
  }

  render() {
    return (
      <div>
          {
            this.state.totalPages > 1 &&
            this.props.createNumericPaginationList(
              this.state.currentPage, 
              this.state.totalPages, 
              this.addPage, 
              this.handlePageChange, 
              {
                link: '/alphabetical/list', 
                currentPage: this.state.currentPage, 
                totalPages: this.state.totalPages
              }
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
            {
              link: `/alphabetical/${this.state.letter.toLowerCase()}`, 
              letter: this.state.letter.toLowerCase(), 
              currentPage: this.state.currentPage, 
              totalPages: this.state.totalPages
            }
          )
        }
      </div>
    );
  }
}

export default AlphabeticalLetterList