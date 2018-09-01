import { combineReducers } from 'redux';

import ToggleSignupReducer from './ToggleSignupReducer';
import ToggleLoginReducer from './ToggleLoginReducer';
import ToggleResetReducer from './ToggleResetReducer';
import SignupStatusReducer from './SignupStatusReducer';
import LoginStatusReducer from './LoginStatusReducer';
import PasswordLinkStatusReducer from './PasswordLinkStatusReducer';
import PasswordResetStatusReducer from './PasswordResetStatusReducer';
import TokenReducer from './TokenReducer';

const rootReducer = combineReducers({
  displaySignup: ToggleSignupReducer,
  displayLogin: ToggleLoginReducer,
  displayReset: ToggleResetReducer,
  signupStatus: SignupStatusReducer,
  loginStatus: LoginStatusReducer,
  passwordLinkStatus: PasswordLinkStatusReducer,
  passwordResetStatus: PasswordResetStatusReducer,
  token: TokenReducer
});

export default rootReducer;