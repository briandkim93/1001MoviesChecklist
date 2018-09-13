import ACTION_TYPES from '../actions/types';

function EmailVerifyStatusReducer(state=null, action) {
  switch (action.type) {
    case ACTION_TYPES.CONFIRM_EMAIL_VERIFY:
      return action.payload;
    default:
      return state;
  }
}

export default EmailVerifyStatusReducer;