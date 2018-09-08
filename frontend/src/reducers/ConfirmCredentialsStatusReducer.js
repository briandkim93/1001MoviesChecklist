import ACTION_TYPES from '../actions/types';

function ConfirmCredentialsStatusReducer(state=null, action) {
  switch (action.type) {
    case ACTION_TYPES.CONFIRM_CREDENTIALS_DELETE_ACCOUNT:
      action.payload.data.context = 'accountDelete';
      return action.payload;
    case ACTION_TYPES.CONFIRM_CREDENTIALS_CHANGE_PASSWORD:
      action.payload.data.context = 'passwordChange';
      return action.payload;
    case ACTION_TYPES.CONFIRM_CREDENTIALS_VERIFY_EMAIL:
      action.payload.data.context = 'emailVerify';
      return action.payload;
    case ACTION_TYPES.DELETE_ACCOUNT:
      return null;
    case ACTION_TYPES.CHANGE_PASSWORD:
      return null;
    case ACTION_TYPES.VERIFY_EMAIL:
      return null;
    default:
      return state;
  }
}

export default ConfirmCredentialsStatusReducer;