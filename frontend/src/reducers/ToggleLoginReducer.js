import ACTION_TYPES from '../actions/types';

function ToggleLoginReducer(state=false, action) {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_LOGIN:
      if (state === false) {
        return true;
      } else {
        return false;
      }
    case ACTION_TYPES.CLOSE_LOGIN:
      return false;
    default:
      return state;
  }
}

export default ToggleLoginReducer;