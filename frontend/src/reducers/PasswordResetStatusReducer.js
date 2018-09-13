import ACTION_TYPES from '../actions/types';

function PasswordResetStatusReducer(state=null, action) {
  switch (action.type) {
    case ACTION_TYPES.CONFIRM_PASSWORD_RESET:
      return action.payload;
    default:
      return state;
  }
}

export default PasswordResetStatusReducer;