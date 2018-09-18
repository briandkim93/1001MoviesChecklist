import ACTION_TYPES from '../../actions/types';

function UserInfoReducer(state={}, action) {
  switch (action.type) {
    case ACTION_TYPES.LOGIN:
      if (action.payload.status === 200) {
        return {
          uid: action.payload.data.user.id,
          username: action.payload.data.user.username,
          email: action.payload.data.user.email,
          emailVerified: action.payload.data.user.email_verified,
          dateJoined: action.payload.data.user.date_joined,
          provider: action.payload.data.user.provider
        };
      } else {
        return state;
      }
    case ACTION_TYPES.FACEBOOK_LOGIN:
      if (action.payload.status === 200) {
        return {
          uid: action.payload.data.user.id,
          username: action.payload.data.user.username,
          email: action.payload.data.user.email,
          emailVerified: action.payload.data.user.email_verified,
          dateJoined: action.payload.data.user.date_joined,
          provider: action.payload.data.user.provider
        };
      } else {
        return state;
      }
    case ACTION_TYPES.CONFIRM_EMAIL_VERIFY:
      if (action.payload.status === 200) {
        return {
          uid: state.uid,
          username: state.username,
          email: state.email,
          emailVerified: true,
          dateJoined: state.dateJoined,
          provider: state.provider
        };
      } else {
        return state;
      }
    case ACTION_TYPES.CHANGE_EMAIL:
      if (action.payload.status === 200) {
        return {
          uid: state.uid,
          username: state.username,
          email: action.payload.data.email,
          emailVerified: false,
          dateJoined: state.dateJoined,
          provider: state.provider
        };
      } else {
        return state;
      }
    case ACTION_TYPES.LOGOUT:
      return {};
    case ACTION_TYPES.DEACTIVATE_ACCOUNT:
      if (action.payload.status === 200) {
        return {};
      } else {
        return state;
      }
    case ACTION_TYPES.CLEAR_STATE:
      return null;
    default:
      return state;
  }
}

export default UserInfoReducer;