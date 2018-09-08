import { combineReducers } from 'redux';

import ToggleSignupReducer from './ToggleSignupReducer';
import ToggleLoginReducer from './ToggleLoginReducer';
import TogglePasswordResetRequestReducer from './TogglePasswordResetRequestReducer';
import SignupStatusReducer from './SignupStatusReducer';
import LoginStatusReducer from './LoginStatusReducer';
import EmailVerifyStatusReducer from './EmailVerifyStatusReducer';
import EmailVerifyRequestStatusReducer from './EmailVerifyRequestStatusReducer';
import PasswordResetRequestStatusReducer from './PasswordResetRequestStatusReducer';
import PasswordResetStatusReducer from './PasswordResetStatusReducer';
import PasswordChangeStatusReducer from './PasswordChangeStatusReducer';
import EmailChangeStatusReducer from './EmailChangeStatusReducer';
import TokenReducer from './TokenReducer';
import UserInfoReducer from './UserInfoReducer';

const rootReducer = combineReducers({
  displaySignup: ToggleSignupReducer,
  displayLogin: ToggleLoginReducer,
  displayReset: TogglePasswordResetRequestReducer,
  signupStatus: SignupStatusReducer,
  loginStatus: LoginStatusReducer,
  emailVerifyStatus: EmailVerifyStatusReducer,
  emailVerifyRequestStatus: EmailVerifyRequestStatusReducer,
  passwordResetRequestStatus: PasswordResetRequestStatusReducer,
  passwordResetStatus: PasswordResetStatusReducer,
  passwordChangeStatus: PasswordChangeStatusReducer,
  emailChangeStatus: EmailChangeStatusReducer,
  token: TokenReducer,
  userInfo: UserInfoReducer
});

export default rootReducer;