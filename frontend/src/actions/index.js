import axios from 'axios';

import ACTION_TYPES from './types';
import API_BASE_URL from '../api_info';

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
  axios.defaults.xsrfCookieName = 'csrftoken';
  const request = axios.post(
    `${API_BASE_URL}account/`, {
      username: username,
      email: email,
      password: password
    }
  );
  return {
    type: ACTION_TYPES.SIGNUP,
    payload: request
  }
}