import { combineReducers } from 'redux';

import ToggleSignupReducer from './ToggleSignupReducer';
import ToggleLoginReducer from './ToggleLoginReducer';
import ToggleResetReducer from './ToggleResetReducer';
import SignupStatusReducer from './SignupStatusReducer';
import LoginStatusReducer from './LoginStatusReducer';
import EmailVerificationStatusReducer from './EmailVerificationStatusReducer';
import PasswordLinkStatusReducer from './PasswordLinkStatusReducer';
import PasswordResetStatusReducer from './PasswordResetStatusReducer';
import TokenReducer from './TokenReducer';
import UserInfoReducer from './UserInfoReducer';

const rootReducer = combineReducers({
  displaySignup: ToggleSignupReducer,
  displayLogin: ToggleLoginReducer,
  displayReset: ToggleResetReducer,
  signupStatus: SignupStatusReducer,
  loginStatus: LoginStatusReducer,
  emailVerificationStatus: EmailVerificationStatusReducer,
  passwordLinkStatus: PasswordLinkStatusReducer,
  passwordResetStatus: PasswordResetStatusReducer,
  token: TokenReducer,
  userInfo: UserInfoReducer
});

export default rootReducer;