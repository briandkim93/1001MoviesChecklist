import ACTION_TYPES from '../../actions/types'

function SignupStatusReducer(state=null, action) {
  switch (action.type) {
    case ACTION_TYPES.SIGNUP:
      return action.payload;
    default:
      return state;
  }
}

export default SignupStatusReducer;