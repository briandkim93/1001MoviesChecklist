import ACTION_TYPES from '../../actions/types';

function FacebookLoginStatusReducer(state=null, action) {
  switch (action.type) {
    case ACTION_TYPES.FACEBOOK_LOGIN:
      return action.payload;
    default:
      return state;
  }
}

export default FacebookLoginStatusReducer;