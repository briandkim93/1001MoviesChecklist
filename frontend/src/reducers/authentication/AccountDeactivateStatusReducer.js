import ACTION_TYPES from '../../actions/types';

function AccountDeactivateStatusReducer(state=null, action) {
  switch (action.type) {
    case ACTION_TYPES.DEACTIVATE_ACCOUNT:
      return action.payload;
    default:
      return state;
  }
}

export default AccountDeactivateStatusReducer;