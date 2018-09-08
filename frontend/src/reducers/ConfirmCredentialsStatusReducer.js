import ACTION_TYPES from '../actions/types';

function ConfirmCredentialsStatusReducer(state=null, action) {
  switch (action.type) {
    case ACTION_TYPES.CONFIRM_CREDENTIALS_DELETE_ACCOUNT:
      action.payload.data.context = 'accountDelete';
      return action.payload;
    case ACTION_TYPES.DELETE_ACCOUNT:
      return null;
    default:
      return state;
  }
}

export default ConfirmCredentialsStatusReducer;