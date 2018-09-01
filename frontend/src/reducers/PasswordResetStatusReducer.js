import ACTION_TYPES from '../actions/types';

function PasswordResetStatusReducer(state={}, action) {
  switch (action.type) {
    case ACTION_TYPES.CONFIRM_RESET_PASSWORD:
      return action.payload;
    default:
      return state;
  }
}

export default PasswordResetStatusReducer;