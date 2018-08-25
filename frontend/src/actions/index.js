import ACTION_TYPES from './types.js';

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