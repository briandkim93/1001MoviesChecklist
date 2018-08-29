import { combineReducers } from 'redux';

import ToggleSignupReducer from './ToggleSignupReducer';
import ToggleLoginReducer from './ToggleLoginReducer';
import SignupStatusReducer from './SignupStatusReducer';
import TokenReducer from './TokenReducer';

const rootReducer = combineReducers({
  displaySignup: ToggleSignupReducer,
  displayLogin: ToggleLoginReducer,
  signupStatus: SignupStatusReducer,
  token: TokenReducer
});

export default rootReducer;