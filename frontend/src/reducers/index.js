import { combineReducers } from 'redux';

import ToggleSignupReducer from './ToggleSignupReducer';
import ToggleLoginReducer from './ToggleLoginReducer';
import ToggleResetReducer from './ToggleResetReducer';
import SignupStatusReducer from './SignupStatusReducer';
import LoginStatusReducer from './LoginStatusReducer';
import passwordLinkStatusReducer from './passwordLinkStatusReducer';
import TokenReducer from './TokenReducer';

const rootReducer = combineReducers({
  displaySignup: ToggleSignupReducer,
  displayLogin: ToggleLoginReducer,
  displayReset: ToggleResetReducer,
  signupStatus: SignupStatusReducer,
  loginStatus: LoginStatusReducer,
  passwordLinkStatusReducer: passwordLinkStatusReducer,
  token: TokenReducer
});

export default rootReducer;