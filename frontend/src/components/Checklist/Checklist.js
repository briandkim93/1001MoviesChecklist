import React, { Component } from 'react';
import { connect } from 'react-redux';

class Checklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: parseInt(this.props.match.params.number, 10),
      totalPages: Math.ceil(this.props.state.moviesChecklistAll.length / 35),
      moviesChecklistHTML: this.props.createChecklistHTML(this.props.state.moviesChecklistAll),
      displayLoader: true
    };

    this.createNumericPaginationList = this.props.createNumericPaginationList.bind(this);
    this.handlePageChange = this.props.handlePageChange.bind(this);
  }


  componentDidUpdate(prevProps) {
    if (this.props.state !== prevProps.state || this.props.filterBy !== prevProps.filterBy) {
      this.setState({
        currentPage: parseInt(this.props.match.params.number, 10),
        totalPages: Math.ceil(this.props.state.moviesChecklistAll.length / 35),
        moviesChecklistHTML: this.props.createChecklistHTML(this.props.state.moviesChecklistAll),
        displayLoader: false
      });
    }
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
                'all',
                this.handlePageChange, 
                '/checklist'
              )
            }
            <div className="row justify-content-center">
              <ul className="col-11 list-unstyled">
                {this.state.moviesChecklistHTML.slice(this.state.currentPage * 35 - 35, this.state.currentPage * 35)}
              </ul>
            </div>
            {
              this.state.totalPages > 1 &&
              this.createNumericPaginationList(
                this.state.currentPage, 
                this.state.totalPages, 
                'all',
                this.handlePageChange, 
                '/checklist'
              )
            }
          </div>
        )
        : (
          <div className="row justify-content-center">
            <div className="col-11 text-center text-white-50">
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

export default connect(mapStateToProps)(Checklist);