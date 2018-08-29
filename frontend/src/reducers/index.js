import { combineReducers } from 'redux';

import ToggleSignupReducer from './ToggleSignupReducer';
import ToggleLoginReducer from './ToggleLoginReducer';
import SignupStatusReducer from './SignupStatusReducer';

const rootReducer = combineReducers({
  displaySignup: ToggleSignupReducer,
  displayLogin: ToggleLoginReducer,
  signupStatus: SignupStatusReducer
});

export default rootReducer;