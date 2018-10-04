import ACTION_TYPES from '../actions/types';

function SortByReducer(state='alphabetical', action) {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_SORT_BY:
      return action.payload;
    case ACTION_TYPES.LOGOUT:
      return 'alphabetical';
    case ACTION_TYPES.DEACTIVATE_ACCOUNT:
      return 'alphabetical';
    case ACTION_TYPES.CLEAR_STATE:
      return 'alphabetical';
    default:
      return state;
  }
}

export default SortByReducer;