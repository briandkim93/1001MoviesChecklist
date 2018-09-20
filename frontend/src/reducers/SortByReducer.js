import ACTION_TYPES from '../actions/types';

function SortByReducer(state='alphabetical', action) {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_SORT_BY:
      return action.payload;
    default:
      return state;
  }
}

export default SortByReducer;