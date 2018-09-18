import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Menu extends Component {
  constructor(props) {
    super(props);
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
                    Year (Newest)
                  </button>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="#">Alphabetical</a>
                    <a className="dropdown-item" href="#">Year (Newest)</a>
                    <a className="dropdown-item" href="#">Year (Oldest)</a>
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

  };
}

function mapStateToDispatch(disptach) {
  return bindActionCreators({

  });
}

export default connect(mapStateToProps, mapStateToDispatch)(Menu);