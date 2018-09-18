import ACTION_TYPES from '../actions/types';

function MoviesChecklistReducer(state=[], action) {
  switch (action.type) {
    case ACTION_TYPES.FETCH_MOVIES:
      return action.payload.data;
    default:
      return state;
  }
}

export default MoviesChecklistReducer;