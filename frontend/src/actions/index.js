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

export function toggleReset() {
  return {
    type: ACTION_TYPES.TOGGLE_RESET  
  }
}

export function closeReset() {
  return {
    type: ACTION_TYPES.CLOSE_RESET  
  }
}

export function signup(username, email, password) {
  const request = axios.post(
    `${API_BASE_URL}account/`, {
      username: username,
      email: email,
      password: password
    }
  )
  .catch(error => {
    return error.response;
  });
  return {
    type: ACTION_TYPES.SIGNUP,
    payload: request
  };
}

export function login(username, password) {
  const request = axios({
    method: 'post',
    url: `${API_BASE_URL}auth/login/`,
    headers: {
      'Authorization': `Basic ${btoa(username + ':' + password)}`,
    }
  })
  .catch(error => {
    return error.response;
  });
  return {
    type: ACTION_TYPES.LOGIN,
    payload: request
  };
}

export function logout(token) {
  const request = axios({
    method: 'post',
    url: `${API_BASE_URL}auth/logoutall/`,
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  return {
    type: ACTION_TYPES.LOGOUT,
    payload: request
  };
}

export function confirmVerifyEmail(token) {
  const request = axios.post(
    `${API_BASE_URL}auth/email/verify/confirm/`, {
      email_verification_code: token,
    }
  )
  .catch(error => {
    return error.response;
  });
  return {
    type: ACTION_TYPES.CONFIRM_VERIFY_EMAIL,
    payload: request
  };
}

export function sendResetPasswordLink(email) {
  const request = axios.post(
    `${API_BASE_URL}auth/password/reset/`, {
      email: email
    }
  )
  .catch(error => {
    return error.response;
  });
  return {
    type: ACTION_TYPES.SEND_RESET_PASSWORD_LINK,
    payload: request
  }
}

export function confirmResetPassword(password1, password2, uid, token) {
  const request = axios.post(
    `${API_BASE_URL}auth/password/reset/confirm/`, {
      new_password1: password1,
      new_password2: password2,
      uid: uid,
      token: token,
    }
  )
  .catch(error => {
    return error.response;
  });
  return {
    type: ACTION_TYPES.CONFIRM_RESET_PASSWORD,
    payload: request
  }
}

export function changePassword(password, uid, token) {
  const request = axios({
    method: 'patch',
    url: `${API_BASE_URL}account/${uid}/`,
    headers: {
      'Authorization': `Token ${token}`,
    },
    data: {
      password: password,
    }
  })
  .catch(error => {
    return error.response;
  });
  return {
    type: ACTION_TYPES.CHANGE_PASSWORD,
    payload: request
  }
}

export function changeEmail(email, uid, token) {
  const request = axios({
    method: 'patch',
    url: `${API_BASE_URL}account/${uid}/`,
    headers: {
      'Authorization': `Token ${token}`,
    },
    data: {
      email: email,
    }
  })
  .catch(error => {
    return error.response;
  });
  return {
    type: ACTION_TYPES.CHANGE_EMAIL,
    payload: request
  }
}