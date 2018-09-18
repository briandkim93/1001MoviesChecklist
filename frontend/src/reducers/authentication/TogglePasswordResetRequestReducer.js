import ACTION_TYPES from '../../actions/types';

function TogglePasswordResetRequestReducer(state=false, action) {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_PASSWORD_RESET_REQUEST:
      if (state) {
        return false;
      } else {
        return true;
      }
    case ACTION_TYPES.CLOSE_PASSWORD_RESET_REQUEST:
      return false;
    default:
      return state;
  }
}

export default TogglePasswordResetRequestReducer;