import ACTION_TYPES from '../actions/types';

function PasswordResetRequestStatusReducer(state={}, action) {
  switch (action.type) {
    case ACTION_TYPES.SEND_PASSWORD_RESET_LINK:
      return action.payload;
    default:
      return state;
  }
}

export default PasswordResetRequestStatusReducer;