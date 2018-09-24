import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import './Menu.css';
import { updateFilterBy, updateSortBy } from '../../actions';

class Menu extends Component {
  constructor(props) {
    super(props);

    this.handleFilterSelect = this.handleFilterSelect.bind(this);
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

  handleFilterSelect(event, category) {
    this.props.updateFilterBy({[category]: event.target.textContent});
  }

  createDropdownHTML(category, items) {
    const itemsHTML = items.map((item, i) => {
      return (
        <li 
          key={`${category}-${i + 1}`} 
          className="dropdown-item menu-dropdown-item text-center text-white" 
          onClick={(event) => this.handleFilterSelect(event, category)}
        >
          {item}
        </li>
      );
    });
    itemsHTML.unshift(<hr key={`${category}-0.5`} className="w-75 border-dark my-0" />);
    itemsHTML.unshift(
      <li 
        key={`${category}-0`} 
        className="dropdown-item menu-dropdown-item text-center text-white"
        onClick={(event) => this.handleFilterSelect(event, category)}
      >
        All
      </li>
    )
    return (
      <div className="btn-group">
        <button className="btn dropdown-toggle bg-black text-white-50" type="button" data-toggle="dropdown">
          {this.props.filterBy[category] ? this.props.filterBy[category] : category[0].toUpperCase() + category.slice(1, category.length)}
        </button>
        <ul className="scrollable-dropdown dropdown-menu bg-black border border-dark text-white-50">
          <Link className="dropdown-link text-link" to={this.getFirstPageLink(this.props.location.pathname)}>{itemsHTML}</Link>
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div className="row justify-content-center bg-black">
        <div className="col-11">
          <div className="row">
            <div className="col-12 col-md-6 btn-toolbar d-inline-block text-center" role="toolbar">
              <div className="btn-toolbar d-inline-block" role="toolbar">
                <div className="btn-group my-2">
                  <span className="btn text-white" disabled="true">Sort By: </span>
                  <button className="btn dropdown-toggle bg-black text-white-50" type="button" data-toggle="dropdown">
                    {this.toInterfaceText(this.props.sortBy)}
                  </button>
                  <ul className="dropdown-menu bg-black border border-dark text-center text-white-50">
                    <Link className="dropdown-link text-link" to={this.props.sortBy !== 'alphabetical' ? this.getFirstPageLink(this.props.location.pathname) : this.props.location.pathname}>
                      <li className="menu-dropdown-item dropdown-item text-white" onClick={() => this.props.updateSortBy('alphabetical')}>
                        Alphabetical
                      </li>
                    </Link>
                    <Link className="dropdown-link text-link" to={this.props.sortBy !== 'newest' ? this.getFirstPageLink(this.props.location.pathname) : this.props.location.pathname}>
                      <li className="menu-dropdown-item dropdown-item text-white" onClick={() => this.props.updateSortBy('newest')}>
                        Year (Newest)
                      </li>
                    </Link>
                    <Link className="dropdown-link text-link" to={this.props.sortBy !== 'oldest' ? this.getFirstPageLink(this.props.location.pathname) : this.props.location.pathname}>
                      <li className="menu-dropdown-item dropdown-item text-white" onClick={() => this.props.updateSortBy('oldest')}>
                        Year (Oldest)
                      </li>
                    </Link>
                  </ul>
              </div>
              </div>
            </div>
            <div className="col-12 col-md-6 btn-toolbar d-inline-block text-center" role="toolbar">
              <div className="btn-group my-2">
                <span className="btn text-white" disabled="true">Filter: </span>
                {this.createDropdownHTML('genre', ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction', 'Thriller', 'War', 'Western'])}
                {this.createDropdownHTML('year', ['2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005', '2004', '2003', '2002', '2001', '2000', '1999', '1998', '1997', '1996', '1995', '1994', '1993', '1992', '1991', '1990', '1989', '1988', '1987', '1986', '1985', '1984', '1983', '1982', '1981', '1980', '1979', '1978', '1977', '1976', '1975', '1974', '1973', '1972', '1971', '1970', '1969', '1968', '1967', '1966', '1965', '1964', '1963', '1962', '1961', '1960', '1959', '1958', '1957', '1956', '1955', '1954', '1953', '1952', '1951', '1950', '1949', '1948', '1947', '1946', '1945', '1944', '1943', '1942', '1941', '1940', '1939', '1938', '1937', '1936', '1935', '1934', '1933', '1932', '1931', '1930', '1929', '1928', '1927', '1926', '1925', '1924', '1923', '1922', '1921', '1920', '1919', '1916', '1915', '1903', '1902'])}
              </div>
            </div>
          </div>
        </div>
        <div className="navbar-gradient w-100" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    filterBy: state.filterBy,
    sortBy: state.sortBy
  };
}

function mapStateToDispatch(dispatch) {
  return bindActionCreators({
    updateFilterBy: updateFilterBy,
    updateSortBy: updateSortBy
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapStateToDispatch)(Menu));