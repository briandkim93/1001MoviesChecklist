import ACTION_TYPES from '../actions/types';

function EmailVerifyStatusReducer(state={}, action) {
  switch (action.type) {
    case ACTION_TYPES.CONFIRM_VERIFY_EMAIL:
      return action.payload;
    default:
      return state;
  }
}

export default EmailVerifyStatusReducer;