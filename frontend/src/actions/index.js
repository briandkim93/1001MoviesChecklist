import axios from 'axios';

import ACTION_TYPES from './types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
axios.defaults.xsrfCookieName = 'csrftoken';

export function fetchMovies() {
  const request = axios({
    method: 'get',
    url: `${API_BASE_URL}movie/`
  });
  return {
    type: ACTION_TYPES.FETCH_MOVIES,
    payload: request
  };
}

export function updateSortBy(param) {
  return {
    type: ACTION_TYPES.UPDATE_SORT_BY,
    payload: param
  }
}

export function updateFilterBy(param) {
  return {
    type: ACTION_TYPES.UPDATE_FILTER_BY,
    payload: param
  }
}

export function updateCompletedMovies(uid, token, movieId, method) {
  const request = axios({
    method: 'patch',
    url: `${API_BASE_URL}auth/account/${uid}/`,
    headers: {
      'Authorization': `Token ${token}`,
    },
    data: {
      completed_movies: movieId,
      completed_movies_method: method
    }
  })
  .catch(error => {
    return error.response;
  });
  return {
    type: ACTION_TYPES.UPDATE_COMPLETED_MOVIES,
    payload: request
  };
}