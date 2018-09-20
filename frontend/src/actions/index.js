import axios from 'axios';

import ACTION_TYPES from './types';
import API_BASE_URL from '../apiInfo';

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