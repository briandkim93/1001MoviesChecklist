import axios from 'axios';

import ACTION_TYPES from './types';
import API_BASE_URL from '../api_info';

axios.defaults.xsrfCookieName = 'csrftoken';

export function toggleSignup() {
  return {
    type: ACTION_TYPES.TOGGLE_SIGNUP
  }
}

export function closeSignup() {
  return {
    type: ACTION_TYPES.CLOSE_SIGNUP
  }
}

export function toggleLogin() {
  return {
    type: ACTION_TYPES.TOGGLE_LOGIN
  }
}

export function closeLogin() {
  return {
    type: ACTION_TYPES.CLOSE_LOGIN
  }
}

export function signup(username, email, password) {
  const request = axios.post(
    `${API_BASE_URL}account/`, {
      username: username,
      email: email,
      password: password
    }
  ).catch(error => {
    return error.response;
  });
  return {
    type: ACTION_TYPES.SIGNUP,
    payload: request
  }
}

export function login(username, password) {
  axios.defaults.headers.common['Authorization'] = 'Basic ' + btoa(username + ':' + password);
  const request = axios.post(`${API_BASE_URL}auth/login/`)
  .catch(error => {
    return error.response;
  });
  return {
    type: ACTION_TYPES.LOGIN,
    payload: request
  }
}

export function logout(token) {
  axios.defaults.headers.common['Authorization'] = 'Token ' + token;
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  const request = axios.post(`${API_BASE_URL}auth/logout/`);
  return {
    type: ACTION_TYPES.LOGOUT,
    payload: request
  }
}