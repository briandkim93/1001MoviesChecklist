import ACTION_TYPES from '../actions/types';

function TokenReducer(state=null, action) {
  switch (action.type) {
    case ACTION_TYPES.LOGIN:
      if (action.payload.status === 200) {
        return action.payload.data.token;
      } else {
        return state;
      }
    case ACTION_TYPES.LOGOUT:
      if (action.payload.status === 204) {
        return null;
      } else {
        return state;
      }
    default:
      return state;
  }
}

export default TokenReducer;