import ACTION_TYPES from '../actions/types';

function PasswordLinkStatusReducer(state={}, action) {
  switch (action.type) {
    case ACTION_TYPES.SEND_RESET_PASSWORD_LINK:
      return action.payload;
    default:
      return state;
  }
}

export default PasswordLinkStatusReducer;