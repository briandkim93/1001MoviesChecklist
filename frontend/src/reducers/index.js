import { combineReducers } from 'redux';

import ToggleSignupReducer from './ToggleSignupReducer';
import ToggleLoginReducer from './ToggleLoginReducer';

const rootReducer = combineReducers({
  displaySignup: ToggleSignupReducer,
  displayLogin: ToggleLoginReducer
});

export default rootReducer;