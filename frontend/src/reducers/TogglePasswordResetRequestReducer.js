import ACTION_TYPES from '../actions/types';

function TogglePasswordResetRequestReducer(state=false, action) {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_RESET:
      if (state === false) {
        return true;
      } else {
        return false;
      }
    case ACTION_TYPES.CLOSE_RESET:
      return false;
    default:
      return state;
  }
}

export default TogglePasswordResetRequestReducer;