import ACTION_TYPES from '../actions/types';

function PasswordChangeStatusReducer(state=null, action) {
  switch (action.type) {
    case ACTION_TYPES.CHANGE_PASSWORD:
      return action.payload;
    default:
      return state;
  }
}

export default PasswordChangeStatusReducer;