import ACTION_TYPES from '../../actions/types';

function EmailVerifyRequestStatusReducer(state=null, action) {
  switch (action.type) {
    case ACTION_TYPES.SEND_EMAIL_VERIFY_LINK:
      return action.payload;
    default:
      return state;
  }
}

export default EmailVerifyRequestStatusReducer;