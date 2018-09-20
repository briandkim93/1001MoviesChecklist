import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { updateSortBy } from '../../actions';

class Menu extends Component {
  constructor(props) {
    super(props);
  }

  toInterfaceText(sortBy) {
    if (sortBy === 'alphabetical') {
      return 'Alphabetical';
    } else if (sortBy === 'newest') {
      return 'Year (Newest)';
    } else if (sortBy === 'oldest') {
      return 'Year (Oldest)';
    }
  }

  getFirstPageLink(pathname) {
    if (pathname[pathname.length + 1] === '/') {
      pathname = pathname.slice(0, pathname.length + 1);
    }
    pathname = pathname.slice(0, pathname.lastIndexOf('/') + 1);
    pathname = `${pathname}1`
    return pathname
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-10">
          <div className="row">
            <div className="col-9 col-md-5 order-1 order-md-1 btn-toolbar d-inline-block" role="toolbar">
              <div className="btn-toolbar d-inline-block" role="toolbar">
                <div className="btn-group">
                  <span className="text-muted btn" disabled="true">Sort By: </span>
                  <button type="button" className="btn dropdown-toggle" data-toggle="dropdown">
                    {this.toInterfaceText(this.props.sortBy)}
                  </button>
                  <div className="dropdown-menu">
                    <span className="dropdown-item btn" onClick={() => this.props.updateSortBy('alphabetical')}>
                      <Link to={this.getFirstPageLink(this.props.location.pathname)}>Alphabetical</Link>
                    </span>
                    <span className="dropdown-item btn" onClick={() => this.props.updateSortBy('newest')}>
                      <Link to={this.getFirstPageLink(this.props.location.pathname)}>Year (Newest)</Link>
                    </span>
                    <span className="dropdown-item btn" onClick={() => this.props.updateSortBy('oldest')}>
                      <Link to={this.getFirstPageLink(this.props.location.pathname)}>Year (Oldest)</Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-5 order-3 order-md-2 btn-toolbar d-inline-block" role="toolbar">
              <div className="btn-group">
                <span className="text-muted btn" disabled="true">Filter: </span>
                <button type="button" className="btn dropdown-toggle" data-toggle="dropdown">
                  Genre
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">Action</a>
                  <a className="dropdown-item" href="#">Adventure</a>
                  <a className="dropdown-item" href="#">Comedy</a>
                </div>
              </div>
              <div className="btn-group">
                <button type="button" className="btn dropdown-toggle" data-toggle="dropdown">
                  Year
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">2018</a>
                  <a className="dropdown-item" href="#">2017</a>
                  <a className="dropdown-item" href="#">2016</a>
                </div>
              </div>
            </div>
            <div className="col-3 col-md-2 order-2 order-md-3 btn-toolbar d-inline-block" role="toolbar">
              <div className="btn-group"> 
                <button type="button" className="btn btn-default">
                    <img src="/images/line-view.png" />
                </button> 
                <button type="button" className="btn btn-default">
                    <img src="/images/block-view.png" />
                </button>
              </div> 
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sortBy: state.sortBy
  };
}

function mapStateToDispatch(dispatch) {
  return bindActionCreators({
    updateSortBy: updateSortBy
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapStateToDispatch)(Menu));