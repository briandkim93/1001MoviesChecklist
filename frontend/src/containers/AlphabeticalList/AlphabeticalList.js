import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Menu from '../../containers/Menu/Menu';

class AlphabeticalList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: parseInt(this.props.match.params.number, 10),
      totalPages: Math.ceil(this.props.state.checklist.length / 35)
    };

    this.addPage = this.addPage.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.state.checklist !== prevProps.state.checklist) {
      this.setState({
        totalPages: Math.ceil(this.props.state.checklist.length / 35)
      });
    }
  }

  addPage(paginationList, i) {
    paginationList.push(
      <li key={`page-${i + 1}`} className={`page-item ${parseInt(this.state.currentPage, 10) === i + 1 && 'active'}`} onClick={() => this.handlePageChange(i)}>
        <Link className="page-link" to={`/alphabetical/${i + 1}`}>{i + 1}</Link>
      </li>
    )
  }

  createPaginationList(currentPage, totalPages) {
    const paginationList = [];

    if (totalPages <= 10) {
      for (let i = 0; i < totalPages; i += 1) {
          this.addPage(paginationList, i);
      }
    } else if (currentPage >= 1 && currentPage <= 6) {
      for (let i = 0; i < 10; i += 1) {
          this.addPage(paginationList, i);
      }
    } else if (currentPage + 4 > totalPages) {
      for (let i = totalPages - 9; i < totalPages; i += 1) {
          this.addPage(paginationList, i);
      }
    } else if (currentPage >= 6) {
      for (let i = currentPage - 6; i < currentPage + 4; i += 1) {
          this.addPage(paginationList, i);
      }
    }
    return paginationList;
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
            <Menu />
            <div className="row justify-content-center">
              <ul className="col-10 list-unstyled">
                {this.props.state.checklist && this.props.state.checklist.slice(this.props.match.params.number * 35 - 35, this.props.match.params.number * 35)}
              </ul>
            </div>
            <nav className="my-2">
              <ul className="pagination pagination-sm justify-content-center">
                <li className="page-item" onClick={() => this.handlePageChange('prev')}>
                  <Link className="page-link" to={`/alphabetical/${this.state.currentPage}`}>
                    <span>&laquo;</span>
                  </Link>
                </li>
                {this.createPaginationList(this.state.currentPage, this.state.totalPages)}
                <li className="page-item" onClick={() => this.handlePageChange('next')}>
                  <Link className="page-link" to={`/alphabetical/${this.state.currentPage}`}>
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