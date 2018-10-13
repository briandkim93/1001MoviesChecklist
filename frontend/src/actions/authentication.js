import axios from 'axios';

import ACTION_TYPES from './types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
axios.defaults.xsrfCookieName = 'csrftoken';

export function toggleSignup() {
  return {
    type: ACTION_TYPES.TOGGLE_SIGNUP
  };
}

export function closeSignup() {
  return {
    type: ACTION_TYPES.CLOSE_SIGNUP
  };
}

export function toggleLogin() {
  return {
    type: ACTION_TYPES.TOGGLE_LOGIN
  };
}

export function closeLogin() {
  return {
    type: ACTION_TYPES.CLOSE_LOGIN
  };
}

export function togglePasswordResetRequest() {
  return {
    type: ACTION_TYPES.TOGGLE_PASSWORD_RESET_REQUEST
  };
}

export function closePasswordResetRequest() {
  return {
    type: ACTION_TYPES.CLOSE_PASSWORD_RESET_REQUEST
  };
}

export function signup(username, email, password) {
  const request = axios({
    method: 'post',
    url: `${API_BASE_URL}auth/account/`, 
    data: {
      username: username,
      email: email,
      password: password
    }
  })
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
      'Authorization': `Basic ${btoa(username + ':' + password)}`
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

export function concludeFacebookLoginRender() {
  return {
    type: ACTION_TYPES.CONCLUDE_FACEBOOK_LOGIN_RENDER,
    payload: false
  };
}

export function facebookLogin(accessToken, facebook_id, email) {
  const request = axios({
    method: 'post',
    url: `${API_BASE_URL}auth/social/convert-token/?grant_type=convert_token&backend=facebook&client_id=${process.env.REACT_APP_SOCIAL_CLIENT_ID}&client_secret=${process.env.REACT_APP_SOCIAL_CLIENT_SECRET}&token=${accessToken}`,
    data: {
      email: email,
      facebook_id: facebook_id
    }
  })
  .catch(error => {
    return error.response;
  });
  return {
    type: ACTION_TYPES.FACEBOOK_LOGIN,
    payload: request
  };
}

export function refreshToken(token) {
  const request = axios({
    method: 'post',
    url: `${API_BASE_URL}auth/refresh-token/`,
    headers: {
      'Authorization': `Token ${token}`
    }
  })
  .catch(error => {
    return error.response;
  });
  return {
    type: ACTION_TYPES.REFRESH_TOKEN,
    payload: request
  };
}

export function logout(token) {
  const request = axios({
    method: 'post',
    url: `${API_BASE_URL}auth/logout/`,
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

export function sendEmailVerifyLink(token) {
  const request = axios({
    method: 'post',
    url: `${API_BASE_URL}auth/email/verify/`,
    headers: {
      'Authorization': `Token ${token}`,
    }
  })
  .catch(error => {
    return error.response;
  });
  return {
    type: ACTION_TYPES.SEND_EMAIL_VERIFY_LINK,
    payload: request
  };
}

export function confirmEmailVerify(username, password, email_verification_code) {
  const request = axios({
    method: 'post',
    url: `${API_BASE_URL}auth/email/verify/confirm/`, 
    data: {
      username: username,
      password: password,
      email_verification_code: email_verification_code,
    }
  })
  .catch(error => {
    return error.response;
  });
  return {
    type: ACTION_TYPES.CONFIRM_EMAIL_VERIFY,
    payload: request
  };
}

export function sendPasswordResetLink(email) {
  const request = axios({
    method: 'post',
    url: `${API_BASE_URL}auth/password/reset/`,
    data: {
      email: email
    }
  })
  .catch(error => {
    return error.response;
  });
  return {
    type: ACTION_TYPES.SEND_PASSWORD_RESET_LINK,
    payload: request
  };
}

export function confirmResetPassword(password1, password2, uid, token) {
  const request = axios({
    method: 'post',
    url: `${API_BASE_URL}auth/password/reset/confirm/`, 
    data: {
      new_password1: password1,
      new_password2: password2,
      uid: uid,
      token: token,
    }
  })
  .catch(error => {
    return error.response;
  });
  return {
    type: ACTION_TYPES.CONFIRM_PASSWORD_RESET,
    payload: request
  };
}

export function confirmCredentials(username, password, context) {
  const request = axios({
    method: 'options',
    url: `${API_BASE_URL}auth/login/`,
    headers: {
      'Authorization': `Basic ${btoa(username + ':' + password)}`,
    }
  })
  .catch(error => {
    return error.response;
  });
  if (context === 'accountDeactivate') {
    return {
      type: ACTION_TYPES.CONFIRM_CREDENTIALS_DEACTIVATE_ACCOUNT,
      payload: request
    };
  } else if (context === 'passwordChange') {
    return {
      type: ACTION_TYPES.CONFIRM_CREDENTIALS_CHANGE_PASSWORD,
      payload: request
    };
  }
}

export function changePassword(password, uid, token) {
  const request = axios({
    method: 'patch',
    url: `${API_BASE_URL}auth/account/${uid}/`,
    headers: {
      'Authorization': `Token ${token}`,
    },
    data: {
      password: password
    }
  })
  .catch(error => {
    return error.response;
  });
  return {
    type: ACTION_TYPES.CHANGE_PASSWORD,
    payload: request
  };
}

export function changeEmail(email, uid, token) {
  const request = axios({
    method: 'patch',
    url: `${API_BASE_URL}auth/account/${uid}/`,
    headers: {
      'Authorization': `Token ${token}`,
    },
    data: {
      email: email
    }
  })
  .catch(error => {
    return error.response;
  });
  return {
    type: ACTION_TYPES.CHANGE_EMAIL,
    payload: request
  };
}

export function deactivateAccount(uid, token) {
  const request = axios({
    method: 'patch',
    url: `${API_BASE_URL}auth/account/${uid}/`,
    headers: {
      'Authorization': `Token ${token}`,
    },
    data: {
      active: false
    }
  })
  .catch(error => {
    return error.response;
  });
  return {
    type: ACTION_TYPES.DEACTIVATE_ACCOUNT,
    payload: request
  };
}

export function clearState() {
  return {
    type: ACTION_TYPES.CLEAR_STATE
  };
}