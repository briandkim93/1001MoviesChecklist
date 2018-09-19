import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import './Home.css';
import AlphabeticalList from '../../containers/AlphabeticalList/AlphabeticalList';
import { fetchMovies } from '../../actions/'

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checklist: []
    };

    this.createChecklistAlphaAll = this.createChecklistAlphaAll.bind(this);
  }

  componentDidMount() {
    this.props.fetchMovies();
    this.setState({
      checklist: this.createChecklistAlphaAll(this.props.moviesChecklist)
    });
  }

  createChecklistAlphaAll(movies) {
    const checklist = movies.map(movie => {
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
    return checklist
  }

  render() {
    return (
      <div>
        <Switch>
          <Redirect from='/alphabetical' to={{pathname: '/alphabetical/1', state: this.state}} exact />
          <Route exact path="/alphabetical/:number" render={(props) => <AlphabeticalList {...props} state={this.state} />} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    moviesChecklist: state.moviesChecklist
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchMovies: fetchMovies
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);