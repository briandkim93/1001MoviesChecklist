import ACTION_TYPES from '../../actions/types';

function ToggleSignupReducer(state=false, action) {
  switch (action.type){
    case ACTION_TYPES.TOGGLE_SIGNUP:
      if (state) {
        return false;
      } else {
        return true;
      }
    case ACTION_TYPES.CLOSE_SIGNUP:
      return false;
    default:
      return state;
  }
}

export default ToggleSignupReducer;