import ACTION_TYPES from '../actions/types';

function ConfirmCredentialsStatusReducer(state=null, action) {
  switch (action.type) {
    case ACTION_TYPES.CONFIRM_CREDENTIALS_CHANGE_PASSWORD:
      action.payload.data.context = 'passwordChange';
      return action.payload;
    case ACTION_TYPES.CONFIRM_CREDENTIALS_DEACTIVATE_ACCOUNT:
      action.payload.data.context = 'accountDeactivate';
      return action.payload;
    case ACTION_TYPES.CHANGE_PASSWORD:
      return null;
    case ACTION_TYPES.DEACTIVATE_ACCOUNT:
      return null;
    default:
      return state;
  }
}

export default ConfirmCredentialsStatusReducer;