import ACTION_TYPES from '../actions/types';

function UserInfoReducer(state={}, action) {
  switch (action.type) {
    case ACTION_TYPES.LOGIN:
      if (action.payload.status === 200) {
        return {
          uid: action.payload.data.user.id,
          username: action.payload.data.user.username,
          email: action.payload.data.user.email,
          emailVerified: action.payload.data.user.email_verified,
          completedMovies: action.payload.data.user.completed_movies,
          dateJoined: action.payload.data.user.date_joined
        };
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

export default UserInfoReducer;