import ACTION_TYPES from '../actions/types';

function RefreshTokenStatusReducer(state=null, action) {
  switch (action.type) {
    case ACTION_TYPES.REFRESH_TOKEN:
      return action.payload;
    default:
      return state;
  }
}

export default RefreshTokenStatusReducer;