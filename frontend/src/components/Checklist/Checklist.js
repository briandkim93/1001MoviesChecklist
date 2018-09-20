import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Checklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: parseInt(this.props.match.params.number, 10),
      totalPages: Math.ceil(this.props.state.moviesChecklistAll.length / 35),
      moviesChecklistHTML: this.props.createChecklistHTML(this.props.state.moviesChecklistAll)
    };

    this.addPage = this.addPage.bind(this);
    this.handlePageChange = this.props.handlePageChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.state !== prevProps.state) {
      this.setState({
        currentPage: parseInt(this.props.match.params.number, 10),
        totalPages: Math.ceil(this.props.state.moviesChecklistAll.length / 35),
        moviesChecklistHTML: this.props.createChecklistHTML(this.props.state.moviesChecklistAll)
      });
    }
  }

  addPage(paginationList, i) {
    paginationList.push(
      <li key={`page-${i + 1}`} className={`page-item ${this.state.currentPage === i + 1 && 'active'}`} onClick={() => this.handlePageChange(i)}>
        <Link className="page-link" to={`/alphabetical/list/${i + 1}`}>{i + 1}</Link>
      </li>
    )
  }

  render() {
    return (
      <div>
        {this.props.createNumericPaginationList(
          this.state.currentPage, 
          this.state.totalPages, 
          this.addPage, 
          this.handlePageChange, 
          '/alphabetical/list'
        )}
        <div className="row justify-content-center">
          <ul className="col-10 list-unstyled">
            {this.state.moviesChecklistHTML.slice(this.state.currentPage * 35 - 35, this.state.currentPage * 35)}
          </ul>
        </div>
        {this.props.createNumericPaginationList(
          this.state.currentPage, 
          this.state.totalPages, 
          this.addPage, 
          this.handlePageChange, 
          '/alphabetical/list'
        )}
      </div>
    );
  }
}

export default Checklist;