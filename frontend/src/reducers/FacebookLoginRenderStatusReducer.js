import ACTION_TYPES from '../actions/types';

function FacebookLoginRenderStatusReducer(state=true, action) {
  switch (action.type) {
    case ACTION_TYPES.CONCLUDE_FACEBOOK_LOGIN_RENDER:
      return action.payload;
    default:
      return state;
  }
}

export default FacebookLoginRenderStatusReducer;