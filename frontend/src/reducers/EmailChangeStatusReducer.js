import ACTION_TYPES from '../actions/types';

function EmailChangeStatusReducer(state=null, action) {
  switch (action.type) {
    case ACTION_TYPES.CHANGE_EMAIL:
      return action.payload;
    default:
      return state;
  }
}

export default EmailChangeStatusReducer;