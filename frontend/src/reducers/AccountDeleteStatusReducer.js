import ACTION_TYPES from '../actions/types';

function AccountDeleteStatusReducer(state=null, action) {
  switch (action.type) {
    case ACTION_TYPES.DELETE_ACCOUNT:
      return action.payload;
    default:
      return state;
  }
}

export default AccountDeleteStatusReducer;