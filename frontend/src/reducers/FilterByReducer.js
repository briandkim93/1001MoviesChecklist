import ACTION_TYPES from '../actions/types';

function FilterByReducer(state={}, action) {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_FILTER_BY:
      let updatedState = {genre: state.genre, year: state.year};
      if (action.payload.genre === 'All') {
        updatedState.genre = '';
      } else if (action.payload.genre && action.payload.genre !== updatedState.genre) {
        updatedState.genre = action.payload.genre;
      }
      if (action.payload.year === 'All') {
        updatedState.year = '';
      } else if (action.payload.year && action.payload.year !== updatedState.year) {
        updatedState.year = action.payload.year;
      }
      return updatedState;
    default:
      return state;
  }
}

export default FilterByReducer;