import ACTION_TYPES from '../actions/types';

function LoginStatusReducer(state={}, action) {
  switch (action.type) {
    case ACTION_TYPES.LOGIN:
      return action.payload;
    default:
      return state;
  }
}

export default LoginStatusReducer;