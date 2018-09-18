import ACTION_TYPES from '../actions/types';

function TokenReducer(state=null, action) {
  switch (action.type) {
    case ACTION_TYPES.LOGIN:
      if (action.payload.status === 200) {
        return action.payload.data.token;
      } else {
        return state;
      }
    case ACTION_TYPES.FACEBOOK_LOGIN:
      if (action.payload.status === 200) {
        return action.payload.data.access_token;
      } else {
        return state;
      }
    case ACTION_TYPES.LOGOUT:
      return null;
    case ACTION_TYPES.DEACTIVATE_ACCOUNT:
      if (action.payload.status === 200) {
        return null;
      } else {
        return state;
      }
    case ACTION_TYPES.CLEAR_STATE:
      return null;
    default:
      return state;
  }
}

export default TokenReducer;